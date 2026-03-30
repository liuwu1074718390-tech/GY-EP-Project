#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
根据“工艺段分类结构”Markdown文档生成：
1) 前端分类树JS数据文件
2) 材料分类覆盖SQL脚本（并清空material_standard）

默认映射规则（与当前材料标准模块兼容）：
- 顶层固定：02 设备类材料
- 6位编码（2602xx）=> 二级分类，category_code=后2位
- 8位编码（2602xxxx）=> 三级分类，category_code=后2位，父级按前6位关联
- 工艺段仅作为来源，不入分类树
"""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path


L2_PATTERN = re.compile(r"^-\s*(\d{6})\s+(.+)$")
L3_PATTERN = re.compile(r"^-\s*(\d{8})\s+(.+)$")


def parse_md(md_path: Path) -> tuple[dict[str, str], dict[str, dict[str, str]]]:
    """解析Markdown并按编码去重，返回6位与8位分类映射。"""
    level2: dict[str, str] = {}
    level3: dict[str, dict[str, str]] = defaultdict(dict)

    for raw in md_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        m2 = L2_PATTERN.match(line)
        if m2:
            code6, name = m2.group(1), m2.group(2).strip()
            prev = level2.get(code6)
            if prev and prev != name:
                raise ValueError(f"检测到6位编码名称冲突: {code6} -> {prev} / {name}")
            level2[code6] = name
            level3.setdefault(code6, {})
            continue

        m3 = L3_PATTERN.match(line)
        if m3:
            code8, name = m3.group(1), m3.group(2).strip()
            parent6 = code8[:6]
            prev = level3[parent6].get(code8)
            if prev and prev != name:
                raise ValueError(f"检测到8位编码名称冲突: {code8} -> {prev} / {name}")
            level3[parent6][code8] = name

    if not level2:
        raise ValueError("未解析到任何6位分类，请检查Markdown格式。")

    return level2, level3


def build_frontend_tree(
    level2: dict[str, str],
    level3: dict[str, dict[str, str]],
    root_code: str,
    root_name: str,
) -> list[dict]:
    """构建前端使用的三级树（id/categoryCode/categoryName/level/children）。"""
    root = {
        "id": f"c{root_code}",
        "categoryName": root_name,
        "categoryCode": root_code,
        "level": 1,
        "children": [],
    }

    for code6 in sorted(level2):
        l2_code = code6
        l2_node = {
            "id": f"c{root_code}-{l2_code}",
            "categoryName": level2[code6],
            "categoryCode": l2_code,
            "level": 2,
            "children": [],
        }
        for code8 in sorted(level3.get(code6, {})):
            l3_code = code8
            l2_node["children"].append(
                {
                    "id": f"c{root_code}-{l2_code}-{l3_code}",
                    "categoryName": level3[code6][code8],
                    "categoryCode": l3_code,
                    "level": 3,
                }
            )
        root["children"].append(l2_node)

    return [root]


def render_frontend_js(tree: list[dict], md_path: Path) -> str:
    return (
        "// 由脚本自动生成，请勿手工修改\n"
        f"// 数据来源: {md_path}\n\n"
        "export const categoryData = "
        + json.dumps(tree, ensure_ascii=False, indent=4)
        + ";\n"
    )


def build_sql(
    level2: dict[str, str],
    level3: dict[str, dict[str, str]],
    root_code: str,
    root_name: str,
) -> str:
    """生成覆盖material_category并清空material_standard的SQL。"""
    root_id = 2
    root_sql_code = root_code[-2:]
    rows: list[tuple[int, str, str, int, int, int]] = []
    rows.append((root_id, root_sql_code, root_name, 0, 1, 1))

    sort_l2 = 1
    for code6 in sorted(level2):
        code2 = code6[-2:]
        l2_id = int(f"2{code2}")  # 201~208
        rows.append((l2_id, code2, level2[code6], root_id, 2, sort_l2))
        sort_l2 += 1

        sort_l3 = 1
        for code8 in sorted(level3.get(code6, {})):
            code3 = code8[-2:]
            l3_id = int(f"2{code2}{code3}")  # 20101, 20102...
            rows.append((l3_id, code3, level3[code6][code8], l2_id, 3, sort_l3))
            sort_l3 += 1

    value_lines = []
    for row in rows:
        rid, ccode, cname, pid, lvl, sort_order = row
        safe_name = cname.replace("'", "''")
        value_lines.append(
            f"({rid}, '{ccode}', '{safe_name}', {pid}, {lvl}, {sort_order}, '1', NOW(), NOW())"
        )

    sql = [
        "-- 由脚本自动生成，请勿手工修改",
        "-- 覆盖材料分类并清空材料标准数据",
        "START TRANSACTION;",
        "",
        "-- 1) 先清空材料标准（避免历史分类引用）",
        "DELETE FROM material_standard;",
        "",
        "-- 2) 覆盖分类树",
        "DELETE FROM material_category;",
        "",
        "INSERT INTO material_category",
        "(id, category_code, category_name, parent_id, level, sort_order, status, create_time, update_time)",
        "VALUES",
        ",\n".join(value_lines) + ";",
        "",
        "COMMIT;",
        "",
        "-- 验收SQL",
        "SELECT COUNT(*) AS level_1_count FROM material_category WHERE level = 1;",
        "SELECT COUNT(*) AS level_2_count FROM material_category WHERE level = 2;",
        "SELECT COUNT(*) AS level_3_count FROM material_category WHERE level = 3;",
        "SELECT COUNT(*) AS material_standard_count FROM material_standard;",
        "",
    ]
    return "\n".join(sql)


def main() -> None:
    parser = argparse.ArgumentParser(description="生成材料分类前端数据与SQL覆盖脚本")
    parser.add_argument("--input-md", required=True, help="工艺段分类Markdown文件路径")
    parser.add_argument("--frontend-out", required=True, help="前端categoryData输出JS文件路径")
    parser.add_argument("--sql-out", required=True, help="SQL输出文件路径")
    parser.add_argument("--root-code", default="2602", help="顶层分类编码，默认2602")
    parser.add_argument("--root-name", default="设备", help="顶层分类名称，默认设备")
    args = parser.parse_args()

    md_path = Path(args.input_md).expanduser().resolve()
    front_out = Path(args.frontend_out).expanduser().resolve()
    sql_out = Path(args.sql_out).expanduser().resolve()

    level2, level3 = parse_md(md_path)
    tree = build_frontend_tree(level2, level3, args.root_code, args.root_name)
    front_content = render_frontend_js(tree, md_path)
    sql_content = build_sql(level2, level3, args.root_code, args.root_name)

    front_out.parent.mkdir(parents=True, exist_ok=True)
    sql_out.parent.mkdir(parents=True, exist_ok=True)
    front_out.write_text(front_content, encoding="utf-8")
    sql_out.write_text(sql_content, encoding="utf-8")

    level2_count = len(level2)
    level3_count = sum(len(v) for v in level3.values())
    print(f"生成完成: 二级(6位)={level2_count}, 三级(8位)={level3_count}")
    print(f"前端数据: {front_out}")
    print(f"SQL脚本: {sql_out}")


if __name__ == "__main__":
    main()
