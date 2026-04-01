#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
基于“标准规格型号_基于Excel物料关系_三级分类映射.md”生成仅更新分类关系的SQL。
只更新 material_std_name.category_level2_id，不改其他字段。
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from pathlib import Path

SECTION_RE = re.compile(r"^##\s*(\d+)\.\s*(.+?)\s*$", re.M)
LINE_RE = re.compile(r"^-\s+([^：\n]+)：\s*(.*)$")
CATEGORY_CODE_RE = re.compile(r"(\d{8})")


def sql_quote(value: str) -> str:
    return value.replace("'", "''")


def parse_mapping(md_text: str) -> tuple[dict[str, str], list[str]]:
    matches = list(SECTION_RE.finditer(md_text))
    mapping: dict[str, str] = {}
    issues: list[str] = []

    for idx, match in enumerate(matches):
        standard_name = match.group(2).strip()
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(md_text)
        block = md_text[start:end]
        category_code = ""

        for raw_line in block.splitlines():
            line = raw_line.strip()
            if not line:
                continue
            mm = LINE_RE.match(line)
            if not mm:
                continue
            key = mm.group(1).strip()
            value = mm.group(2).strip()
            if key != "三级分类":
                continue
            code_match = CATEGORY_CODE_RE.search(value)
            if code_match:
                category_code = code_match.group(1)
            break

        if not standard_name:
            issues.append("存在空标准材料名称标题")
            continue
        if standard_name in mapping:
            issues.append(f"标准材料名称重复: {standard_name}")
            continue
        if not category_code:
            issues.append(f"未解析到三级分类编码: {standard_name}")
            continue
        if not category_code.startswith("26"):
            issues.append(f"分类编码非法(非26开头): {standard_name} -> {category_code}")
            continue
        mapping[standard_name] = category_code

    return mapping, issues


def render_sql(mapping: dict[str, str]) -> str:
    lines: list[str] = []
    lines.append("-- 由脚本自动生成：仅更新标准规格型号分类关系")
    lines.append("-- 只更新 material_std_name.category_level2_id，不改其他信息")
    lines.append("START TRANSACTION;")
    lines.append("")
    lines.append("DROP TEMPORARY TABLE IF EXISTS tmp_spec_category_mapping;")
    lines.append(
        "CREATE TEMPORARY TABLE tmp_spec_category_mapping ("
        "standard_name VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,"
        "level2_code VARCHAR(2) NOT NULL,"
        "PRIMARY KEY (standard_name)"
        ") ENGINE=Memory DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
    )

    for name, code in mapping.items():
        level2_code = code[4:6]
        lines.append(
            "INSERT INTO tmp_spec_category_mapping(standard_name, level2_code) "
            f"VALUES ('{sql_quote(name)}', '{level2_code}');"
        )

    lines.append("")
    lines.append(
        "UPDATE material_std_name sn "
        "JOIN tmp_spec_category_mapping m ON m.standard_name = sn.standard_name "
        "JOIN material_category c2 ON c2.level = 2 AND c2.category_code = m.level2_code "
        "JOIN material_category c1 ON c1.id = c2.parent_id AND c1.level = 1 AND c1.category_code = '02' "
        "SET sn.category_level2_id = c2.id "
        "WHERE sn.del_flag = '0';"
    )
    lines.append("")
    lines.append("-- 验收SQL")
    lines.append("SELECT COUNT(*) AS mapping_count FROM tmp_spec_category_mapping;")
    lines.append("SELECT COUNT(*) AS std_name_count FROM material_std_name WHERE del_flag = '0';")
    lines.append(
        "SELECT COUNT(*) AS mapped_in_db_count "
        "FROM material_std_name sn "
        "JOIN tmp_spec_category_mapping m ON m.standard_name = sn.standard_name "
        "WHERE sn.del_flag = '0';"
    )
    lines.append("COMMIT;")
    return "\n".join(lines) + "\n"


def write_report(path: Path, mapping: dict[str, str], parse_issues: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["type", "name", "detail"])
        for issue in parse_issues:
            writer.writerow(["parse_issue", "", issue])
        for name, code in mapping.items():
            writer.writerow(["mapped", name, code])


def main() -> int:
    parser = argparse.ArgumentParser(description="生成标准规格型号分类重映射SQL（仅更新分类）")
    parser.add_argument("--mapping-md", required=True, help="映射Markdown文件路径")
    parser.add_argument("--sql-out", required=True, help="输出SQL路径")
    parser.add_argument("--report-out", required=True, help="输出报告CSV路径")
    args = parser.parse_args()

    md_text = Path(args.mapping_md).expanduser().read_text(encoding="utf-8")
    mapping, issues = parse_mapping(md_text)
    if issues:
        for issue in issues:
            print(f"[parse_issue] {issue}")

    sql = render_sql(mapping)
    sql_path = Path(args.sql_out).expanduser().resolve()
    sql_path.parent.mkdir(parents=True, exist_ok=True)
    sql_path.write_text(sql, encoding="utf-8")

    report_path = Path(args.report_out).expanduser().resolve()
    write_report(report_path, mapping, issues)

    print(f"mapping_count={len(mapping)}")
    print(f"sql={sql_path}")
    print(f"report={report_path}")
    return 0 if not issues else 1


if __name__ == "__main__":
    sys.exit(main())
