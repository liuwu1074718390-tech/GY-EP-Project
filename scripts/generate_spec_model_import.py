#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从“标准名称规格单位梳理”Markdown生成标准规格型号导入SQL与未匹配清单。
规则：
1) 自动归类 = 关键词词典 + 语义相似度（difflib）
2) 仅接受唯一最高分且过阈值项
3) 未匹配/冲突项输出CSV，不入SQL
"""

from __future__ import annotations

import argparse
import csv
import difflib
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Tuple


SECTION_RE = re.compile(r"^##\s+(.+)$", re.M)
LINE_RE = re.compile(r"^-\s+([^：\n]+)：\s*(.*)$")

RESERVED_KEYS = {
    "记录数",
    "原始名称",
    "建议标准名称",
    "单位",
    "原始规格候选",
    "原始备注候选",
    "结构化提取结果",
}


@dataclass
class SectionData:
    title: str
    standard_name: str = ""
    units: List[str] = field(default_factory=list)
    attrs: Dict[str, List[str]] = field(default_factory=dict)


def split_values(raw: str) -> List[str]:
    parts = re.split(r"[、/；;，,]\s*", raw.strip())
    return [p.strip() for p in parts if p.strip()]


def parse_sections(md_text: str) -> List[SectionData]:
    sections: List[SectionData] = []
    matches = list(SECTION_RE.finditer(md_text))
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(md_text)
        title = m.group(1).strip()
        block = md_text[start:end]
        sec = SectionData(title=title)

        for line in block.splitlines():
            s = line.strip()
            mm = LINE_RE.match(s)
            if not mm:
                continue
            key = mm.group(1).strip()
            val = mm.group(2).strip()
            if key == "建议标准名称":
                sec.standard_name = val
            elif key == "单位":
                sec.units = split_values(val)
            elif key not in RESERVED_KEYS:
                values = split_values(val)
                if values:
                    sec.attrs[key] = list(dict.fromkeys(values))

        if sec.standard_name:
            if not sec.units:
                sec.units = ["台"]
            sections.append(sec)

    return sections


def parse_level2_categories(cat_md_text: str) -> List[Tuple[str, str]]:
    data = {}
    for line in cat_md_text.splitlines():
        m = re.match(r"^-\s*(\d{6})\s+(.+)$", line.strip())
        if m:
            code, name = m.group(1), m.group(2).strip()
            data[name] = code
    return [(name, code) for name, code in data.items()]


def build_keywords() -> Dict[str, List[str]]:
    return {
        "通用设备": ["闸门", "阀", "起重", "葫芦", "发电机", "电源", "柜", "交换机", "模块", "通讯"],
        "分离设备": ["格栅", "沉砂", "刮吸泥", "脱水", "滤池", "过滤", "浓缩", "压滤", "旋流"],
        "搅拌设备": ["搅拌", "絮凝"],
        "空气设备": ["风机", "鼓风", "曝气", "空压", "空气"],
        "泵类设备": ["泵"],
        "药剂设备": ["加药", "药剂", "投加", "PAC", "PAM"],
        "电气、自控及仪表设备": ["仪表", "流量计", "液位", "PLC", "控制", "电控", "自控", "在线", "监控", "信号"],
        "其它设备": ["附件", "配件"],
    }


def classify(sec: SectionData, categories: List[Tuple[str, str]], keywords: Dict[str, List[str]]):
    text = f"{sec.title} {sec.standard_name} {' '.join(sec.attrs.keys())}"
    scores: List[Tuple[float, str, str]] = []

    for cat_name, cat_code in categories:
        score = 0.0
        ratio = difflib.SequenceMatcher(None, sec.standard_name, cat_name).ratio()
        score += ratio * 1.2

        kw = keywords.get(cat_name, [])
        for k in kw:
            if k and k.lower() in text.lower():
                score += 2.0

        # 语义补偿：标题命中也加权
        if cat_name in sec.title:
            score += 1.0

        scores.append((score, cat_name, cat_code))

    scores.sort(key=lambda x: x[0], reverse=True)
    best = scores[0]
    second = scores[1] if len(scores) > 1 else (0.0, "", "")

    if best[0] < 2.0:
        return None, f"score_low:{best[0]:.2f}"
    if best[0] - second[0] < 0.75:
        return None, f"score_close:{best[0]:.2f}/{second[0]:.2f}"

    return best, "ok"


def esc(s: str) -> str:
    return s.replace("'", "''")


def build_sql(records: List[Tuple[SectionData, str, str]]) -> str:
    lines: List[str] = []
    lines.append("-- 由脚本自动生成：标准规格型号导入SQL")
    lines.append("START TRANSACTION;")
    lines.append("DELETE FROM material_std_name_spec_value;")
    lines.append("DELETE FROM material_std_name_spec;")
    lines.append("DELETE FROM material_std_name_unit;")
    lines.append("DELETE FROM material_std_name;")
    lines.append("")

    main_id = 100001
    spec_id = 300001
    unit_id = 200001
    val_id = 400001

    for sec, cat_name, cat_code in records:
        lines.append(
            "INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) "
            f"VALUES ({main_id}, '{esc(sec.standard_name)}', "
            f"(SELECT id FROM material_category WHERE level = 2 AND category_name = '{esc(cat_name)}' LIMIT 1), "
            "'1', '0', NOW(), NOW());"
        )

        unit_sort = 1
        for u in list(dict.fromkeys(sec.units)):
            lines.append(
                "INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) "
                f"VALUES ({unit_id}, {main_id}, '{esc(u)}', {unit_sort}, '1', '0', NOW(), NOW());"
            )
            unit_id += 1
            unit_sort += 1

        spec_sort = 1
        for k, values in sec.attrs.items():
            lines.append(
                "INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) "
                f"VALUES ({spec_id}, {main_id}, '{esc(k)}', {spec_sort}, '1', '0', NOW(), NOW());"
            )
            spec_sort += 1

            value_sort = 1
            for v in values:
                lines.append(
                    "INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) "
                    f"VALUES ({val_id}, {spec_id}, '{esc(v)}', {value_sort}, '1', '0', NOW(), NOW());"
                )
                val_id += 1
                value_sort += 1

            spec_id += 1

        main_id += 1
        lines.append("")

    lines.append("COMMIT;")
    lines.append("SELECT COUNT(*) AS std_name_count FROM material_std_name;")
    lines.append("SELECT COUNT(*) AS std_unit_count FROM material_std_name_unit;")
    lines.append("SELECT COUNT(*) AS std_spec_count FROM material_std_name_spec;")
    lines.append("SELECT COUNT(*) AS std_spec_value_count FROM material_std_name_spec_value;")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--spec-md", required=True)
    parser.add_argument("--category-md", required=True)
    parser.add_argument("--sql-out", required=True)
    parser.add_argument("--unmatched-out", required=True)
    args = parser.parse_args()

    spec_text = Path(args.spec_md).read_text(encoding="utf-8")
    cat_text = Path(args.category_md).read_text(encoding="utf-8")

    sections = parse_sections(spec_text)
    categories = parse_level2_categories(cat_text)
    keywords = build_keywords()

    matched: List[Tuple[SectionData, str, str]] = []
    unmatched: List[Tuple[str, str, str]] = []

    for sec in sections:
      result, reason = classify(sec, categories, keywords)
      if result is None:
          unmatched.append((sec.title, sec.standard_name, reason))
      else:
          _, cat_name, cat_code = result
          matched.append((sec, cat_name, cat_code))

    sql = build_sql(matched)
    Path(args.sql_out).write_text(sql, encoding="utf-8")

    with open(args.unmatched_out, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["section", "standard_name", "reason"])
        writer.writerows(unmatched)

    print(f"sections={len(sections)} matched={len(matched)} unmatched={len(unmatched)}")
    print(f"sql={Path(args.sql_out).resolve()}")
    print(f"unmatched={Path(args.unmatched_out).resolve()}")


if __name__ == "__main__":
    main()
