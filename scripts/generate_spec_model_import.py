#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从“标准规格型号”Markdown生成标准规格型号/标准单位覆盖SQL与异常报告。

规则：
1) 标准材料名称、规格型号、单位仅来自“标准规格型号”文件
2) 分类仅从“标准分类”文件按标准材料名称精确提取
3) 三级分类编码反推二级分类，并写入 material_std_name.category_level2_id
4) 采用全量覆盖方式，重新生成主键与业务编码
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from collections import OrderedDict
from dataclasses import dataclass, field
from pathlib import Path

SECTION_RE = re.compile(r"^##\s*(\d+)\.\s*(.+?)\s*$", re.M)
LINE_RE = re.compile(r"^-\s+([^：\n]+)：\s*(.*)$")
DECLARED_COUNT_RE = re.compile(r"归并后标准材料数：\s*(\d+)")
CATEGORY_COUNT_RE = re.compile(r"标准材料数：\s*(\d+)")
CATEGORY_CODE_RE = re.compile(r"^\d{8}$")
VALUE_SPLIT_RE = re.compile(r"[、/；;，,]\s*")
EMPTY_MARKERS = {"", "（空）", "(空)", "无", "暂无", "-", "—", "--"}
ROOT_LEVEL1_CODE = "02"
UNIT_NORMALIZATION_MAP = {
    "m3": "m³",
    "M3": "m³",
    "m^3": "m³",
    "m2": "m²",
    "M2": "m²",
    "m^2": "m²",
    "个(套)": "个（套）",
}


@dataclass
class Issue:
    severity: str
    issue_type: str
    standard_name: str
    detail: str


@dataclass
class SpecItem:
    key: str
    values: list[str] = field(default_factory=list)


@dataclass
class MaterialRecord:
    index: int
    standard_name: str
    units: list[str] = field(default_factory=list)
    spec_items: list[SpecItem] = field(default_factory=list)
    category_name: str = ""
    category_code: str = ""

    @property
    def level1_code(self) -> str:
        return self.category_code[2:4]

    @property
    def level2_code(self) -> str:
        return self.category_code[4:6]

    @property
    def level3_code(self) -> str:
        return self.category_code[6:8]


def sql_quote(value: str) -> str:
    return value.replace("'", "''")


def split_values(raw: str) -> list[str]:
    raw = (raw or "").strip()
    if raw in EMPTY_MARKERS:
        return []
    result: list[str] = []
    seen: set[str] = set()
    for part in VALUE_SPLIT_RE.split(raw):
        value = part.strip()
        if not value or value in EMPTY_MARKERS or value in seen:
            continue
        seen.add(value)
        result.append(value)
    return result


def normalize_unit(value: str) -> str:
    return UNIT_NORMALIZATION_MAP.get(value, value)


def append_unique(target: list[str], values: list[str]) -> None:
    seen = set(target)
    for value in values:
        if value not in seen:
            target.append(value)
            seen.add(value)


def parse_spec_markdown(md_text: str) -> tuple[list[MaterialRecord], list[Issue]]:
    issues: list[Issue] = []
    declared_count_match = DECLARED_COUNT_RE.search(md_text)
    declared_count = int(declared_count_match.group(1)) if declared_count_match else None

    matches = list(SECTION_RE.finditer(md_text))
    records: list[MaterialRecord] = []
    seen_names: set[str] = set()

    for idx, match in enumerate(matches):
        section_index = int(match.group(1))
        standard_name = match.group(2).strip()
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(md_text)
        block = md_text[start:end]

        if not standard_name:
            issues.append(Issue('error', 'empty_standard_name', f'第{section_index}项', '标题未解析到标准材料名称'))
            continue
        if standard_name in seen_names:
            issues.append(Issue('error', 'duplicate_standard_name', standard_name, '标准规格型号文件中存在重复标准材料名称'))
            continue
        seen_names.add(standard_name)

        spec_map: OrderedDict[str, list[str]] = OrderedDict()
        units: list[str] = []

        for raw_line in block.splitlines():
            line = raw_line.strip()
            if not line:
                continue
            line_match = LINE_RE.match(line)
            if not line_match:
                continue
            key = line_match.group(1).strip()
            value = line_match.group(2).strip()
            if key == '来源':
                continue
            if key == '标准单位':
                append_unique(units, [normalize_unit(unit) for unit in split_values(value)])
                continue
            values = split_values(value)
            if not values:
                continue
            spec_map.setdefault(key, [])
            append_unique(spec_map[key], values)

        if not units:
            issues.append(Issue('warning', 'empty_units', standard_name, '标准规格型号文件中未提取到标准单位'))

        records.append(
            MaterialRecord(
                index=section_index,
                standard_name=standard_name,
                units=units,
                spec_items=[SpecItem(key=key, values=values) for key, values in spec_map.items()],
            )
        )

    if declared_count is not None and declared_count != len(records):
        issues.append(Issue('error', 'spec_count_mismatch', '全部材料', f'文档声明 {declared_count} 条，实际解析 {len(records)} 条'))

    return records, issues


def parse_category_markdown(md_text: str) -> tuple[dict[str, tuple[str, str]], list[Issue]]:
    issues: list[Issue] = []
    declared_count_match = CATEGORY_COUNT_RE.search(md_text)
    declared_count = int(declared_count_match.group(1)) if declared_count_match else None

    matches = list(SECTION_RE.finditer(md_text))
    mapping: dict[str, tuple[str, str]] = {}
    duplicate_names: set[str] = set()

    for idx, match in enumerate(matches):
        standard_name = match.group(2).strip()
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(md_text)
        block = md_text[start:end]

        category_name = ''
        category_code = ''
        for raw_line in block.splitlines():
            line = raw_line.strip()
            if not line:
                continue
            line_match = LINE_RE.match(line)
            if not line_match:
                continue
            key = line_match.group(1).strip()
            value = line_match.group(2).strip()
            if key == '三级分类':
                category_name = value
            elif key == '分类编码':
                category_code = ''.join(ch for ch in value if ch.isdigit())

        if not standard_name:
            issues.append(Issue('error', 'empty_category_standard_name', f'第{idx + 1}项', '标准分类文件中存在空标题'))
            continue
        if standard_name in mapping:
            duplicate_names.add(standard_name)
            continue
        if not category_name:
            issues.append(Issue('error', 'missing_category_name', standard_name, '标准分类文件缺少三级分类'))
            continue
        if not CATEGORY_CODE_RE.match(category_code):
            issues.append(Issue('error', 'invalid_category_code', standard_name, f'分类编码无效：{category_code or value}'))
            continue
        mapping[standard_name] = (category_name, category_code)

    for name in sorted(duplicate_names):
        issues.append(Issue('error', 'duplicate_category_mapping', name, '标准分类文件中存在重复标准材料名称映射'))
        mapping.pop(name, None)

    if declared_count is not None and declared_count != len(mapping):
        issues.append(Issue('error', 'category_count_mismatch', '全部材料', f'分类文档声明 {declared_count} 条，实际解析 {len(mapping)} 条'))

    return mapping, issues


def merge_records(records: list[MaterialRecord], category_map: dict[str, tuple[str, str]]) -> list[Issue]:
    issues: list[Issue] = []
    for record in records:
        matched = category_map.get(record.standard_name)
        if not matched:
            issues.append(Issue('error', 'missing_category_mapping', record.standard_name, '标准分类文件中未找到对应分类映射'))
            continue
        category_name, category_code = matched
        if not category_code.startswith('26'):
            issues.append(Issue('error', 'unexpected_category_prefix', record.standard_name, f'分类编码不是 26 开头：{category_code}'))
            continue
        record.category_name = category_name
        record.category_code = category_code
    return issues


def extract_units(records: list[MaterialRecord]) -> list[str]:
    result: list[str] = []
    seen: set[str] = set()
    for record in records:
        if not record.category_code:
            continue
        for unit in record.units:
            if unit in seen:
                continue
            seen.add(unit)
            result.append(unit)
    return result


def write_report(path: Path, issues: list[Issue]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['severity', 'issue_type', 'standard_name', 'detail'])
        for issue in issues:
            writer.writerow([issue.severity, issue.issue_type, issue.standard_name, issue.detail])


def build_sql(records: list[MaterialRecord], units: list[str]) -> str:
    active_records = [record for record in records if record.category_code]
    lines: list[str] = []

    lines.append('-- 由脚本自动生成：标准规格型号/标准单位覆盖SQL')
    lines.append('-- 规则：标准材料/规格/单位来自标准规格型号.md，分类来自标准分类.md')
    lines.append('START TRANSACTION;')
    lines.append('')
    lines.append('-- 1) 覆盖标准规格型号相关数据')
    lines.append('DELETE FROM material_std_name_spec_value;')
    lines.append('DELETE FROM material_std_name_spec;')
    lines.append('DELETE FROM material_std_name_unit;')
    lines.append('DELETE FROM material_std_name;')
    lines.append('ALTER TABLE material_std_name AUTO_INCREMENT = 1;')
    lines.append('ALTER TABLE material_std_name_unit AUTO_INCREMENT = 1;')
    lines.append('ALTER TABLE material_std_name_spec AUTO_INCREMENT = 1;')
    lines.append('ALTER TABLE material_std_name_spec_value AUTO_INCREMENT = 1;')
    lines.append('')
    lines.append('-- 2) 覆盖标准单位数据')
    lines.append('DELETE FROM material_unit;')
    lines.append('ALTER TABLE material_unit AUTO_INCREMENT = 1;')

    for index, unit in enumerate(units, start=1):
        unit_escaped = sql_quote(unit)
        lines.append(
            "INSERT INTO material_unit(unit_code, unit_biz_id, unit_name, unit_symbol, status) "
            f"VALUES ('{index:02d}', 'U{index:04d}', '{unit_escaped}', '{unit_escaped}', '1');"
        )

    lines.append('')
    lines.append('-- 3) 重建标准规格型号主数据与关联')
    spec_key_counter = 1
    spec_value_counter = 1
    for record_index, record in enumerate(active_records, start=1):
        name = sql_quote(record.standard_name)
        lines.append(f"INSERT INTO material_std_name(standard_name, std_name_code, category_level2_id, status, del_flag) VALUES (")
        lines.append(
            f"  '{name}', 'M{record_index:05d}', (SELECT c2.id FROM material_category c2 "
            f"JOIN material_category c1 ON c1.id = c2.parent_id "
            f"WHERE c1.level = 1 AND c1.category_code = '{ROOT_LEVEL1_CODE}' "
            f"AND c2.level = 2 AND c2.category_code = '{record.level2_code}' LIMIT 1), '1', '0');"
        )

        for unit_sort, unit in enumerate(record.units, start=1):
            unit_escaped = sql_quote(unit)
            lines.append(
                "INSERT INTO material_std_name_unit(std_name_id, unit_id, unit_name, sort_order, status, del_flag) VALUES ("
                f"(SELECT id FROM material_std_name WHERE std_name_code = 'M{record_index:05d}' LIMIT 1), "
                f"(SELECT id FROM material_unit WHERE unit_name = '{unit_escaped}' LIMIT 1), '{unit_escaped}', {unit_sort}, '1', '0');"
            )

        for spec_sort, spec_item in enumerate(record.spec_items, start=1):
            spec_key = sql_quote(spec_item.key)
            spec_key_code = f'A{spec_key_counter:04d}'
            spec_key_counter += 1
            lines.append(
                "INSERT INTO material_std_name_spec(std_name_id, spec_key, spec_key_code, sort_order, status, del_flag) VALUES ("
                f"(SELECT id FROM material_std_name WHERE std_name_code = 'M{record_index:05d}' LIMIT 1), '{spec_key}', '{spec_key_code}', {spec_sort}, '1', '0');"
            )
            for value_sort, value in enumerate(spec_item.values, start=1):
                spec_value = sql_quote(value)
                spec_value_code = f'V{spec_value_counter:06d}'
                spec_value_counter += 1
                lines.append(
                    "INSERT INTO material_std_name_spec_value(spec_id, spec_value, spec_value_code, sort_order, status, del_flag) VALUES ("
                    f"(SELECT id FROM material_std_name_spec WHERE std_name_id = (SELECT id FROM material_std_name WHERE std_name_code = 'M{record_index:05d}' LIMIT 1) "
                    f"AND spec_key_code = '{spec_key_code}' LIMIT 1), '{spec_value}', '{spec_value_code}', {value_sort}, '1', '0');"
                )
        lines.append('')

    lines.append('COMMIT;')
    lines.append('')
    lines.append('-- 验收SQL')
    lines.append("SELECT COUNT(*) AS unit_count FROM material_unit WHERE status = '1';")
    lines.append("SELECT COUNT(*) AS std_name_count FROM material_std_name WHERE status = '1' AND del_flag = '0';")
    lines.append("SELECT COUNT(*) AS std_name_unit_count FROM material_std_name_unit WHERE del_flag = '0';")
    lines.append("SELECT COUNT(*) AS std_name_spec_count FROM material_std_name_spec WHERE del_flag = '0';")
    lines.append("SELECT COUNT(*) AS std_name_spec_value_count FROM material_std_name_spec_value WHERE del_flag = '0';")
    return '\n'.join(lines) + '\n'


def main() -> int:
    parser = argparse.ArgumentParser(description='生成标准规格型号/标准单位覆盖SQL')
    parser.add_argument('--spec-md', required=True, help='标准规格型号 Markdown 文件路径')
    parser.add_argument('--category-md', required=True, help='标准分类 Markdown 文件路径')
    parser.add_argument('--sql-out', required=True, help='覆盖 SQL 输出路径')
    parser.add_argument('--report-out', '--unmatched-out', dest='report_out', required=True, help='异常报告 CSV 输出路径')
    args = parser.parse_args()

    spec_text = Path(args.spec_md).expanduser().read_text(encoding='utf-8')
    category_text = Path(args.category_md).expanduser().read_text(encoding='utf-8')

    records, spec_issues = parse_spec_markdown(spec_text)
    category_map, category_issues = parse_category_markdown(category_text)
    merge_issues = merge_records(records, category_map)
    issues = [*spec_issues, *category_issues, *merge_issues]

    report_path = Path(args.report_out).expanduser().resolve()
    write_report(report_path, issues)

    errors = [issue for issue in issues if issue.severity == 'error']
    warnings = [issue for issue in issues if issue.severity == 'warning']
    units = extract_units(records)
    active_records = [record for record in records if record.category_code]

    if errors:
        print(f'errors={len(errors)} warnings={len(warnings)} parsed={len(records)} matched={len(active_records)}')
        print(f'report={report_path}')
        return 1

    sql = build_sql(records, units)
    sql_path = Path(args.sql_out).expanduser().resolve()
    sql_path.parent.mkdir(parents=True, exist_ok=True)
    sql_path.write_text(sql, encoding='utf-8')

    print(f'records={len(records)} matched={len(active_records)} units={len(units)} warnings={len(warnings)}')
    print(f'sql={sql_path}')
    print(f'report={report_path}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
