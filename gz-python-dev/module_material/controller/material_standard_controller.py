from __future__ import annotations

import csv
import json
import os
from pathlib import Path
from urllib import parse, request as urlrequest

from typing import Any, Annotated

from fastapi import APIRouter, Body, Depends, Request
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from config.get_db import get_db
from module_admin.service.login_service import LoginService
from module_material.service.material_standardization_service import (
    apply_review_result,
    clear_review_result,
    ensure_standardization_tables,
)
from utils.log_util import logger
from utils.response_util import ResponseUtil

material_standard_controller = APIRouter(
    prefix='/material/standard', dependencies=[Depends(LoginService.get_current_user)]
)
material_knowledge_controller = APIRouter(
    prefix='/material/standard/knowledge', dependencies=[Depends(LoginService.get_current_user)]
)

MATERIAL_SPLITTER = "\n\n<<<MATERIAL_SEGMENT_SPLITTER>>>\n\n"
PROCESS_SPLITTER = "\n\n<<<PROCESS_SEGMENT_SPLITTER>>>\n\n"
CATEGORY_SPLITTER = "\n\n<<<CATEGORY_SEGMENT_SPLITTER>>>\n\n"
MATERIAL_DOCUMENT_TYPE = 'material'
PROCESS_DOCUMENT_TYPE = 'process'
CATEGORY_DOCUMENT_TYPE = 'category'


def _to_int(value: Any, default: int) -> int:
    try:
        if value is None:
            return default
        return int(value)
    except Exception:
        return default


async def _fetch_all(db: AsyncSession, sql: str, params: dict | None = None) -> list[dict]:
    res = await db.execute(text(sql), params or {})
    return [dict(row) for row in res.mappings().all()]


async def _fetch_one(db: AsyncSession, sql: str, params: dict | None = None) -> dict | None:
    res = await db.execute(text(sql), params or {})
    row = res.mappings().first()
    return dict(row) if row else None


async def _fetch_scalar(db: AsyncSession, sql: str, params: dict | None = None) -> Any:
    res = await db.execute(text(sql), params or {})
    return res.scalar()


def _safe_text(value: Any) -> str:
    return str(value or '').strip()


def _normalize_level3_merged_code(value: Any) -> str:
    digits = ''.join(ch for ch in str(value or '').strip() if ch.isdigit())
    if not digits:
        return ''
    if len(digits) == 6:
        return f'26{digits}'
    if len(digits) >= 8:
        return digits[:8]
    return ''


def _project_root_dir() -> Path:
    return Path(__file__).resolve().parents[3]


def _candidate_std_name_category_map_files() -> list[Path]:
    env_path = _safe_text(os.getenv('MATERIAL_KNOWLEDGE_STD_NAME_CATEGORY_MAP_FILE'))
    candidates: list[Path] = []
    if env_path:
        candidates.append(Path(env_path))
    root = _project_root_dir()
    candidates.extend(
        [
            root / 'gz-python-dev' / 'sql' / 'spec_model_category_relink_report.csv',
            root / 'runtime' / 'spec_model_category_relink_report.csv',
        ]
    )
    return candidates


def _load_std_name_category_code_map() -> dict[str, str]:
    for file_path in _candidate_std_name_category_map_files():
        if not file_path.exists() or not file_path.is_file():
            continue
        try:
            mapping: dict[str, str] = {}
            with file_path.open('r', encoding='utf-8-sig', newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    row_type = _safe_text(row.get('type'))
                    if row_type and row_type != 'mapped':
                        continue
                    std_name = _safe_text(row.get('name'))
                    merged_code = _normalize_level3_merged_code(row.get('detail'))
                    if not std_name or not merged_code:
                        continue
                    mapping[std_name] = merged_code
            if mapping:
                return mapping
        except Exception as e:
            logger.warning(f'读取标准分类映射文件失败: {file_path}, {e}')
    return {}


async def _next_unit_code(db: AsyncSession) -> str:
    max_code = await _fetch_scalar(
        db,
        """
        SELECT MAX(CASE WHEN unit_code REGEXP '^[0-9]+$' THEN CAST(unit_code AS UNSIGNED) ELSE 0 END)
        FROM material_unit
        """,
    )
    next_code = (max_code or 0) + 1
    if next_code > 99:
        raise ValueError('单位编码已用尽，请先清理无效单位')
    return f'{next_code:02d}'


async def _next_segment_biz_id(db: AsyncSession) -> str:
    max_no = await _fetch_scalar(
        db,
        """
        SELECT MAX(CASE WHEN segment_biz_id REGEXP '^P[0-9]{3}$'
                        THEN CAST(SUBSTRING(segment_biz_id, 2) AS UNSIGNED)
                        ELSE 0 END)
        FROM material_process_segment
        """,
    )
    next_no = (max_no or 0) + 1
    if next_no > 999:
        raise ValueError('工艺段业务ID已用尽，请先清理无效数据')
    return f'P{next_no:03d}'


async def _next_std_name_code(db: AsyncSession) -> str:
    max_no = await _fetch_scalar(
        db,
        """
        SELECT MAX(CASE WHEN std_name_code REGEXP '^M[0-9]{5}$'
                        THEN CAST(SUBSTRING(std_name_code, 2) AS UNSIGNED)
                        ELSE 0 END)
        FROM material_std_name
        """,
    )
    next_no = (max_no or 0) + 1
    return f'M{next_no:05d}'


async def _next_spec_key_code(db: AsyncSession) -> str:
    max_no = await _fetch_scalar(
        db,
        """
        SELECT MAX(CASE WHEN spec_key_code REGEXP '^A[0-9]{4}$'
                        THEN CAST(SUBSTRING(spec_key_code, 2) AS UNSIGNED)
                        ELSE 0 END)
        FROM material_std_name_spec
        """,
    )
    next_no = (max_no or 0) + 1
    return f'A{next_no:04d}'


async def _next_spec_value_code(db: AsyncSession) -> str:
    max_no = await _fetch_scalar(
        db,
        """
        SELECT MAX(CASE WHEN spec_value_code REGEXP '^V[0-9]{6}$'
                        THEN CAST(SUBSTRING(spec_value_code, 2) AS UNSIGNED)
                        ELSE 0 END)
        FROM material_std_name_spec_value
        """,
    )
    next_no = (max_no or 0) + 1
    return f'V{next_no:06d}'


def _build_tree(nodes: list[dict]) -> list[dict]:
    id_map = {}
    for n in nodes:
        node = {
            'id': n['id'],
            'categoryCode': n['category_code'],
            'categoryName': n['category_name'],
            'parentId': n['parent_id'],
            'level': n['level'],
            'sortOrder': n['sort_order'],
            'status': n['status'],
            'children': [],
        }
        id_map[node['id']] = node

    roots = []
    for n in id_map.values():
        pid = n['parentId'] or 0
        if pid == 0 or pid not in id_map:
            roots.append(n)
        else:
            id_map[pid]['children'].append(n)

    def sort_tree(items: list[dict]) -> None:
        items.sort(key=lambda x: (x.get('level', 0), x.get('sortOrder', 0), x.get('id', 0)))
        for item in items:
            if item['children']:
                sort_tree(item['children'])
            else:
                item.pop('children', None)

    sort_tree(roots)
    return roots


async def _generate_material_code(db: AsyncSession, payload: dict) -> str:
    c1 = await _fetch_one(db, 'SELECT category_code FROM material_category WHERE id = :id', {'id': payload['categoryLevel1Id']})
    c2 = await _fetch_one(db, 'SELECT category_code FROM material_category WHERE id = :id', {'id': payload['categoryLevel2Id']})
    c3 = await _fetch_one(db, 'SELECT category_code FROM material_category WHERE id = :id', {'id': payload['categoryLevel3Id']})
    spec = await _fetch_one(db, 'SELECT spec_code FROM material_specification WHERE id = :id', {'id': payload['specId']})
    unit = await _fetch_one(db, 'SELECT unit_code FROM material_unit WHERE id = :id', {'id': payload['unitId']})
    if not (c1 and c2 and c3 and spec and unit):
        raise ValueError('分类、规格或单位信息不完整，无法生成编码')
    return f"{str(c1['category_code']).zfill(2)}{str(c2['category_code']).zfill(2)}{str(c3['category_code']).zfill(2)}{str(spec['spec_code']).zfill(3)}{str(unit['unit_code']).zfill(2)}"


@material_standard_controller.post('/categoryTree')
async def category_tree(request: Request, db: Annotated[AsyncSession, Depends(get_db)]):
    rows = await _fetch_all(
        db,
        """
        SELECT id, category_code, category_name, parent_id, level, sort_order, status
        FROM material_category
        WHERE status = '1'
        ORDER BY level ASC, sort_order ASC, id ASC
        """,
    )
    return ResponseUtil.success(data=_build_tree(rows))


@material_standard_controller.post('/specList')
async def spec_list(request: Request, db: Annotated[AsyncSession, Depends(get_db)]):
    rows = await _fetch_all(
        db,
        """
        SELECT id,
               spec_code AS specCode,
               spec_name AS specName,
               description,
               status
        FROM material_specification
        WHERE status = '1'
        ORDER BY spec_code ASC
        """,
    )
    return ResponseUtil.success(data=rows)


@material_standard_controller.post('/unitList')
async def unit_list(request: Request, db: Annotated[AsyncSession, Depends(get_db)]):
    rows = await _fetch_all(
        db,
        """
        SELECT id,
               unit_code AS unitCode,
               unit_biz_id AS unitBizId,
               unit_name AS unitName,
               unit_symbol AS unitSymbol,
               status
        FROM material_unit
        WHERE status = '1'
        ORDER BY unit_code ASC
        """,
    )
    return ResponseUtil.success(data=rows)


@material_standard_controller.post('/unit/page')
async def unit_page(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    page_num = _to_int(payload.get('pageNum'), 1)
    page_size = _to_int(payload.get('pageSize'), 20)
    unit_name = (payload.get('unitName') or '').strip()
    status = (payload.get('status') or '').strip()
    where = ["1=1"]
    params: dict[str, Any] = {}
    if unit_name:
        where.append("unit_name LIKE :unit_name")
        params['unit_name'] = f'%{unit_name}%'
    if status:
        where.append("status = :status")
        params['status'] = status
    where_sql = " AND ".join(where)
    total = await _fetch_scalar(db, f"SELECT COUNT(1) FROM material_unit WHERE {where_sql}", params) or 0
    params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
    rows = await _fetch_all(
        db,
        f"""
        SELECT id,
               unit_code AS unitCode,
               unit_biz_id AS unitBizId,
               unit_name AS unitName,
               unit_symbol AS unitSymbol,
               status
        FROM material_unit
        WHERE {where_sql}
        ORDER BY unit_code ASC
        LIMIT :offset, :limit
        """,
        params,
    )
    return ResponseUtil.success(data={'records': rows, 'total': int(total)})


@material_standard_controller.post('/unit/save')
async def unit_save(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    unit_name = (payload.get('unitName') or '').strip()
    if not unit_name:
        return ResponseUtil.failure(msg='单位名称不能为空')
    dup = await _fetch_scalar(db, "SELECT COUNT(1) FROM material_unit WHERE unit_name = :n", {'n': unit_name})
    if dup:
        return ResponseUtil.failure(msg='单位名称已存在')
    unit_code = await _next_unit_code(db)
    status = (payload.get('status') or '1').strip() or '1'
    unit_symbol = (payload.get('unitSymbol') or '').strip() or None
    await db.execute(
        text(
            """
            INSERT INTO material_unit(unit_code, unit_name, unit_symbol, status)
            VALUES(:unit_code, :unit_name, :unit_symbol, :status)
            """
        ),
        {'unit_code': unit_code, 'unit_name': unit_name, 'unit_symbol': unit_symbol, 'status': status},
    )
    new_id = await _fetch_scalar(db, "SELECT LAST_INSERT_ID()")
    await db.execute(
        text("UPDATE material_unit SET unit_biz_id = :biz WHERE id = :id"),
        {'biz': f'U{int(new_id):04d}', 'id': int(new_id)},
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/unit/update')
async def unit_update(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    unit_id = payload.get('id')
    unit_name = (payload.get('unitName') or '').strip()
    if not unit_id:
        return ResponseUtil.failure(msg='单位ID不能为空')
    if not unit_name:
        return ResponseUtil.failure(msg='单位名称不能为空')
    exists = await _fetch_one(db, "SELECT * FROM material_unit WHERE id = :id", {'id': unit_id})
    if not exists:
        return ResponseUtil.failure(msg='单位不存在')
    dup = await _fetch_scalar(
        db, "SELECT COUNT(1) FROM material_unit WHERE unit_name = :n AND id <> :id", {'n': unit_name, 'id': unit_id}
    )
    if dup:
        return ResponseUtil.failure(msg='单位名称已存在')
    unit_symbol = (payload.get('unitSymbol') or '').strip() or None
    status = (payload.get('status') or exists.get('status') or '1').strip() or '1'
    biz_id = exists.get('unit_biz_id') or f"U{int(unit_id):04d}"
    await db.execute(
        text(
            """
            UPDATE material_unit
            SET unit_name = :unit_name,
                unit_symbol = :unit_symbol,
                status = :status,
                unit_biz_id = :biz_id
            WHERE id = :id
            """
        ),
        {
            'unit_name': unit_name,
            'unit_symbol': unit_symbol,
            'status': status,
            'biz_id': biz_id,
            'id': unit_id,
        },
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/unit/delete')
async def unit_delete(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    unit_id = payload.get('id')
    if not unit_id:
        return ResponseUtil.failure(msg='ID不能为空')
    used = await _fetch_scalar(db, "SELECT COUNT(1) FROM material_standard WHERE unit_id = :id", {'id': unit_id}) or 0
    if used > 0:
        return ResponseUtil.failure(msg='该单位已被材料标准引用，不能删除')
    await db.execute(text("DELETE FROM material_unit WHERE id = :id"), {'id': unit_id})
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/processSegment/page')
async def process_segment_page(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    page_num = _to_int(payload.get('pageNum'), 1)
    page_size = _to_int(payload.get('pageSize'), 20)
    segment_name = (payload.get('segmentName') or '').strip()
    status = (payload.get('status') or '').strip()
    where = ["1=1"]
    params: dict[str, Any] = {}
    if segment_name:
        where.append("segment_name LIKE :segment_name")
        params['segment_name'] = f'%{segment_name}%'
    if status:
        where.append("status = :status")
        params['status'] = status
    where_sql = " AND ".join(where)
    total = await _fetch_scalar(db, f"SELECT COUNT(1) FROM material_process_segment WHERE {where_sql}", params) or 0
    params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
    rows = await _fetch_all(
        db,
        f"""
        SELECT id,
               segment_biz_id AS segmentBizId,
               segment_name AS segmentName,
               status
        FROM material_process_segment
        WHERE {where_sql}
        ORDER BY segment_biz_id ASC
        LIMIT :offset, :limit
        """,
        params,
    )
    return ResponseUtil.success(data={'records': rows, 'total': int(total)})


@material_standard_controller.post('/processSegment/save')
async def process_segment_save(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    segment_name = (payload.get('segmentName') or '').strip()
    if not segment_name:
        return ResponseUtil.failure(msg='工艺段名称不能为空')
    dup = await _fetch_scalar(
        db, "SELECT COUNT(1) FROM material_process_segment WHERE segment_name = :n", {'n': segment_name}
    )
    if dup:
        return ResponseUtil.failure(msg='工艺段名称已存在')
    biz_id = await _next_segment_biz_id(db)
    status = (payload.get('status') or '1').strip() or '1'
    await db.execute(
        text(
            """
            INSERT INTO material_process_segment(segment_biz_id, segment_name, status)
            VALUES(:biz_id, :segment_name, :status)
            """
        ),
        {'biz_id': biz_id, 'segment_name': segment_name, 'status': status},
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/processSegment/update')
async def process_segment_update(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    seg_id = payload.get('id')
    segment_name = (payload.get('segmentName') or '').strip()
    if not seg_id:
        return ResponseUtil.failure(msg='工艺段ID不能为空')
    if not segment_name:
        return ResponseUtil.failure(msg='工艺段名称不能为空')
    exists = await _fetch_one(db, "SELECT * FROM material_process_segment WHERE id = :id", {'id': seg_id})
    if not exists:
        return ResponseUtil.failure(msg='工艺段不存在')
    dup = await _fetch_scalar(
        db,
        "SELECT COUNT(1) FROM material_process_segment WHERE segment_name = :n AND id <> :id",
        {'n': segment_name, 'id': seg_id},
    )
    if dup:
        return ResponseUtil.failure(msg='工艺段名称已存在')
    status = (payload.get('status') or exists.get('status') or '1').strip() or '1'
    await db.execute(
        text(
            """
            UPDATE material_process_segment
            SET segment_name = :segment_name, status = :status
            WHERE id = :id
            """
        ),
        {'segment_name': segment_name, 'status': status, 'id': seg_id},
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/processSegment/delete')
async def process_segment_delete(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    seg_id = payload.get('id')
    if not seg_id:
        return ResponseUtil.failure(msg='ID不能为空')
    await db.execute(text("DELETE FROM material_process_segment WHERE id = :id"), {'id': seg_id})
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/page')
async def material_page(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    page_num = _to_int(payload.get('pageNum'), 1)
    page_size = _to_int(payload.get('pageSize'), 20)
    where = ["si.id IS NOT NULL"]
    params: dict[str, Any] = {}

    def like_if(v: Any, field: str, key: str) -> None:
        s = (v or '').strip()
        if s:
            where.append(f"{field} LIKE :{key}")
            params[key] = f'%{s}%'

    def eq_if(v: Any, field: str, key: str) -> None:
        if v not in (None, '', 'null'):
            where.append(f"{field} = :{key}")
            params[key] = v

    like_if(payload.get('materialCode'), 'si.standard_code', 'material_code')
    like_if(payload.get('materialName'), 'si.material_name', 'material_name')
    like_if(payload.get('specification'), 'si.specification', 'specification')
    eq_if(payload.get('unitId'), 'si.standard_unit_id', 'unit_id')

    category_level3_id = _to_int(payload.get('categoryLevel3Id'), 0)
    category_level2_id = _to_int(payload.get('categoryLevel2Id'), 0)
    category_level1_id = _to_int(payload.get('categoryLevel1Id'), 0)
    if category_level3_id > 0:
        where.append("si.standard_category_level3_id = :category_level3_id")
        params['category_level3_id'] = category_level3_id
    elif category_level2_id > 0:
        where.append(
            """
            EXISTS (
              SELECT 1
              FROM material_category c3f
              WHERE c3f.id = si.standard_category_level3_id
                AND c3f.parent_id = :category_level2_id
            )
            """
        )
        params['category_level2_id'] = category_level2_id
    elif category_level1_id > 0:
        where.append(
            """
            EXISTS (
              SELECT 1
              FROM material_category c3f
              LEFT JOIN material_category c2f ON c2f.id = c3f.parent_id
              WHERE c3f.id = si.standard_category_level3_id
                AND c2f.parent_id = :category_level1_id
            )
            """
        )
        params['category_level1_id'] = category_level1_id

    where_sql = " AND ".join(where)

    total = await _fetch_scalar(
        db,
        f"""
        SELECT COUNT(1)
        FROM material_standard_item si
        LEFT JOIN material_category c3 ON c3.id = si.standard_category_level3_id
        LEFT JOIN material_category c2 ON c2.id = c3.parent_id
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id
        LEFT JOIN material_std_name sn ON sn.id = si.standard_std_name_id
        LEFT JOIN material_unit su ON su.id = si.standard_unit_id
        WHERE {where_sql}
        """,
        params,
    ) or 0
    params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
    rows = await _fetch_all(
        db,
        f"""
        SELECT si.id,
               si.standard_code AS materialCode,
               si.material_name AS materialName,
               si.standard_category_level3_id AS categoryLevel3Id,
               c2.id AS categoryLevel2Id,
               c1.id AS categoryLevel1Id,
               si.standard_unit_id AS unitId,
               NULL AS remark,
               '1' AS status,
               si.specification,
               si.standard_attr_value_ids_json AS standardAttrValueIdsJson,
               c1.category_name AS categoryLevel1Name,
               c2.category_name AS categoryLevel2Name,
               c3.category_name AS categoryLevel3Name,
               su.unit_name AS unitName,
               (
                   SELECT COUNT(1)
                   FROM material_standard_review rr
                   WHERE rr.del_flag = '0'
                     AND rr.standard_item_id = si.id
               ) AS linkedReviewCount
        FROM material_standard_item si
        LEFT JOIN material_category c3 ON c3.id = si.standard_category_level3_id
        LEFT JOIN material_category c2 ON c2.id = c3.parent_id
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id
        LEFT JOIN material_unit su ON su.id = si.standard_unit_id
        WHERE {where_sql}
        ORDER BY si.update_time DESC, si.id DESC
        LIMIT :offset, :limit
        """,
        params,
    )

    for row in rows:
        attr_ids = json.loads(row.get('standardAttrValueIdsJson') or '[]')
        if attr_ids:
            placeholders = ','.join([f':attr_{idx}' for idx in range(len(attr_ids))])
            attr_rows = await _fetch_all(
                db,
                f"""
                SELECT s.spec_key AS specKey, v.spec_value AS specValue
                FROM material_std_name_spec_value v
                LEFT JOIN material_std_name_spec s ON s.id = v.spec_id
                WHERE v.id IN ({placeholders}) AND v.del_flag = '0'
                ORDER BY v.id ASC
                """,
                {f'attr_{idx}': attr_id for idx, attr_id in enumerate(attr_ids)},
            )
            row['specification'] = '；'.join(
                [f"{item.get('specKey') or '规格'}:{item.get('specValue') or '-'}" for item in attr_rows]
            ) or row.get('specification') or ''
        row['categoryPath'] = '/'.join(
            [v for v in [row.get('categoryLevel1Name'), row.get('categoryLevel2Name'), row.get('categoryLevel3Name')] if v]
        )
        row.pop('standardAttrValueIdsJson', None)

    return ResponseUtil.success(data={'records': rows, 'total': int(total)})


@material_standard_controller.post('/getById')
async def material_get_by_id(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    row = await _fetch_one(
        db,
        """
        SELECT id,
               material_code AS materialCode,
               material_name AS materialName,
               category_level1_id AS categoryLevel1Id,
               category_level2_id AS categoryLevel2Id,
               category_level3_id AS categoryLevel3Id,
               spec_id AS specId,
               unit_id AS unitId,
               remark,
               status
        FROM material_standard
        WHERE id = :id AND del_flag = '0'
        """,
        {'id': payload.get('id')},
    )
    return ResponseUtil.success(data=row)


@material_standard_controller.post('/save')
async def material_save(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    material_name = (payload.get('materialName') or '').strip()
    if not material_name:
        return ResponseUtil.failure(msg='材料名称不能为空')
    material_code = await _generate_material_code(db, payload)
    await db.execute(
        text(
            """
            INSERT INTO material_standard(
                material_code, material_name, category_level1_id, category_level2_id, category_level3_id,
                spec_id, unit_id, remark, status, del_flag
            ) VALUES(
                :material_code, :material_name, :c1, :c2, :c3, :spec_id, :unit_id, :remark, :status, '0'
            )
            """
        ),
        {
            'material_code': material_code,
            'material_name': material_name,
            'c1': payload.get('categoryLevel1Id'),
            'c2': payload.get('categoryLevel2Id'),
            'c3': payload.get('categoryLevel3Id'),
            'spec_id': payload.get('specId'),
            'unit_id': payload.get('unitId'),
            'remark': (payload.get('remark') or '').strip() or None,
            'status': (payload.get('status') or '1').strip() or '1',
        },
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/update')
async def material_update(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    material_id = payload.get('id')
    if not material_id:
        return ResponseUtil.failure(msg='材料ID不能为空')
    exists = await _fetch_one(db, "SELECT id FROM material_standard WHERE id = :id", {'id': material_id})
    if not exists:
        return ResponseUtil.failure(msg='材料不存在')
    material_code = await _generate_material_code(db, payload)
    await db.execute(
        text(
            """
            UPDATE material_standard
            SET material_code = :material_code,
                material_name = :material_name,
                category_level1_id = :c1,
                category_level2_id = :c2,
                category_level3_id = :c3,
                spec_id = :spec_id,
                unit_id = :unit_id,
                remark = :remark,
                status = :status
            WHERE id = :id
            """
        ),
        {
            'id': material_id,
            'material_code': material_code,
            'material_name': (payload.get('materialName') or '').strip(),
            'c1': payload.get('categoryLevel1Id'),
            'c2': payload.get('categoryLevel2Id'),
            'c3': payload.get('categoryLevel3Id'),
            'spec_id': payload.get('specId'),
            'unit_id': payload.get('unitId'),
            'remark': (payload.get('remark') or '').strip() or None,
            'status': (payload.get('status') or '1').strip() or '1',
        },
    )
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/delete')
async def material_delete(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    material_id = payload.get('id')
    if not material_id:
        return ResponseUtil.failure(msg='ID不能为空')
    await db.execute(text("UPDATE material_standard SET del_flag = '1' WHERE id = :id"), {'id': material_id})
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/specModel/page')
async def spec_model_page(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    page_num = _to_int(payload.get('pageNum'), 1)
    page_size = _to_int(payload.get('pageSize'), 20)
    standard_name = (payload.get('standardName') or '').strip()
    spec_keyword = (payload.get('specKeyword') or '').strip()
    c1 = payload.get('categoryLevel1Id')
    c2 = payload.get('categoryLevel2Id')
    c3 = payload.get('categoryLevel3Id')
    status = (payload.get('status') or '').strip()

    where = ["sn.del_flag = '0'"]
    params: dict[str, Any] = {}
    if standard_name:
        where.append("sn.standard_name LIKE :standard_name")
        params['standard_name'] = f'%{standard_name}%'
    if spec_keyword:
        where.append(
            """
            EXISTS (
                SELECT 1
                FROM material_std_name_spec s
                JOIN material_std_name_spec_value v ON v.spec_id = s.id AND v.del_flag = '0'
                WHERE s.std_name_id = sn.id
                  AND s.del_flag = '0'
                  AND (s.spec_key LIKE :spec_keyword OR v.spec_value LIKE :spec_keyword)
            )
            """
        )
        params['spec_keyword'] = f'%{spec_keyword}%'
    if c1 not in (None, '', 'null'):
        where.append("c1.id = :c1")
        params['c1'] = c1
    if c2 not in (None, '', 'null'):
        where.append("c2.id = :c2")
        params['c2'] = c2
    if c3 not in (None, '', 'null'):
        where.append("c3.id = :c3")
        params['c3'] = c3
    if status:
        where.append("sn.status = :status")
        params['status'] = status
    where_sql = " AND ".join(where)

    total = await _fetch_scalar(
        db,
        f"""
        SELECT COUNT(1)
        FROM material_std_name sn
        LEFT JOIN material_category clink ON clink.id = sn.category_level2_id
        LEFT JOIN material_category c3 ON c3.id = CASE WHEN clink.level = 3 THEN clink.id ELSE NULL END
        LEFT JOIN material_category c2 ON c2.id = CASE
            WHEN clink.level = 3 THEN clink.parent_id
            WHEN clink.level = 2 THEN clink.id
            ELSE NULL
        END
        LEFT JOIN material_category c1 ON c1.id = CASE
            WHEN clink.level = 1 THEN clink.id
            WHEN clink.level = 2 THEN clink.parent_id
            WHEN clink.level = 3 THEN c2.parent_id
            ELSE NULL
        END
        WHERE {where_sql}
        """,
        params,
    ) or 0

    params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
    rows = await _fetch_all(
        db,
        f"""
        SELECT sn.id,
               sn.std_name_code AS stdNameCode,
               sn.standard_name AS standardName,
               sn.category_level2_id AS linkedCategoryId,
               c2.category_name AS categoryLevel2Name,
               c3.id AS categoryLevel3Id,
               c3.category_name AS categoryLevel3Name,
               c1.id AS categoryLevel1Id,
               c1.category_name AS categoryLevel1Name,
               sn.status
        FROM material_std_name sn
        LEFT JOIN material_category clink ON clink.id = sn.category_level2_id
        LEFT JOIN material_category c3 ON c3.id = CASE WHEN clink.level = 3 THEN clink.id ELSE NULL END
        LEFT JOIN material_category c2 ON c2.id = CASE
            WHEN clink.level = 3 THEN clink.parent_id
            WHEN clink.level = 2 THEN clink.id
            ELSE NULL
        END
        LEFT JOIN material_category c1 ON c1.id = CASE
            WHEN clink.level = 1 THEN clink.id
            WHEN clink.level = 2 THEN clink.parent_id
            WHEN clink.level = 3 THEN c2.parent_id
            ELSE NULL
        END
        WHERE {where_sql}
        ORDER BY sn.id DESC
        LIMIT :offset, :limit
        """,
        params,
    )

    for row in rows:
        units = await _fetch_all(
            db,
            """
            SELECT unit_name AS unitName
            FROM material_std_name_unit
            WHERE std_name_id = :sid AND del_flag = '0'
            ORDER BY sort_order ASC, id ASC
            """,
            {'sid': row['id']},
        )
        row['units'] = [u['unitName'] for u in units]
        specs = await _fetch_all(
            db,
            """
            SELECT s.spec_key AS specKey, v.spec_value AS specValue
            FROM material_std_name_spec s
            JOIN material_std_name_spec_value v ON v.spec_id = s.id
            WHERE s.std_name_id = :sid AND s.del_flag = '0' AND v.del_flag = '0'
            ORDER BY s.sort_order ASC, s.id ASC, v.sort_order ASC, v.id ASC
            """,
            {'sid': row['id']},
        )
        grouped_spec_values: dict[str, list[str]] = {}
        spec_key_order: list[str] = []
        for item in specs:
            spec_key = _safe_text(item.get('specKey')) or '规格'
            spec_value = _safe_text(item.get('specValue'))
            if not spec_value:
                continue
            if spec_key not in grouped_spec_values:
                grouped_spec_values[spec_key] = []
                spec_key_order.append(spec_key)
            if spec_value not in grouped_spec_values[spec_key]:
                grouped_spec_values[spec_key].append(spec_value)
        row['specSummary'] = '；'.join(
            [f"{spec_key}:{','.join(grouped_spec_values[spec_key])}" for spec_key in spec_key_order]
        )
    return ResponseUtil.success(data={'records': rows, 'total': int(total)})


@material_standard_controller.post('/specModel/getById')
async def spec_model_get_by_id(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    sid = payload.get('id')
    row = await _fetch_one(
        db,
        """
        SELECT id,
               standard_name AS standardName,
               std_name_code AS stdNameCode,
               category_level2_id AS linkedCategoryId,
               status
        FROM material_std_name
        WHERE id = :id AND del_flag = '0'
        """,
        {'id': sid},
    )
    if not row:
        return ResponseUtil.success(data=None)
    unit_items = await _fetch_all(
        db,
        """
        SELECT id, unit_id AS unitId, unit_name AS unitName
        FROM material_std_name_unit
        WHERE std_name_id = :id AND del_flag = '0'
        ORDER BY sort_order ASC, id ASC
        """,
        {'id': sid},
    )
    spec_rows = await _fetch_all(
        db,
        """
        SELECT s.id AS specId, s.spec_key AS specKey, v.id AS specValueId, v.spec_value AS specValue
        FROM material_std_name_spec s
        LEFT JOIN material_std_name_spec_value v ON v.spec_id = s.id AND v.del_flag = '0'
        WHERE s.std_name_id = :id AND s.del_flag = '0'
        ORDER BY s.sort_order ASC, s.id ASC, v.sort_order ASC, v.id ASC
        """,
        {'id': sid},
    )
    grouped: dict[int, dict] = {}
    for r in spec_rows:
        spid = r['specId']
        if spid not in grouped:
            grouped[spid] = {'specId': spid, 'specKey': r['specKey'], 'specValueItems': []}
        if r.get('specValue') is not None:
            grouped[spid]['specValueItems'].append({'specValueId': r['specValueId'], 'specValue': r['specValue']})
    row['unitItems'] = unit_items
    row['specItems'] = list(grouped.values())
    row['units'] = [u['unitName'] for u in unit_items]
    return ResponseUtil.success(data=row)


async def _save_spec_model(db: AsyncSession, payload: dict, is_update: bool) -> None:
    sid = payload.get('id')
    standard_name = (payload.get('standardName') or '').strip()
    linked_category_id = payload.get('linkedCategoryId')
    status = (payload.get('status') or '1').strip() or '1'
    unit_items = payload.get('unitItems') or []
    spec_items = payload.get('specItems') or []
    if not standard_name:
        raise ValueError('标准材料名称不能为空')
    if not linked_category_id:
        raise ValueError('所属分类不能为空')
    linked_category = await _fetch_one(
        db,
        """
        SELECT id, level, status
        FROM material_category
        WHERE id = :id
        LIMIT 1
        """,
        {'id': linked_category_id},
    )
    if not linked_category:
        raise ValueError('所属分类不存在')
    if str(linked_category.get('status') or '0') != '1':
        raise ValueError('所属分类已停用')
    if _to_int(linked_category.get('level'), 0) not in (1, 2, 3):
        raise ValueError('所属分类层级非法')
    dup_sql = "SELECT COUNT(1) FROM material_std_name WHERE standard_name = :name AND del_flag = '0'"
    dup_params = {'name': standard_name}
    if is_update:
        dup_sql += " AND id <> :id"
        dup_params['id'] = sid
    dup = await _fetch_scalar(db, dup_sql, dup_params) or 0
    if dup > 0:
        raise ValueError('标准材料名称已存在')

    if is_update:
        await db.execute(
            text(
                """
                UPDATE material_std_name
                SET standard_name = :standard_name,
                    category_level2_id = :c2,
                    status = :status
                WHERE id = :id
                """
            ),
            {'standard_name': standard_name, 'c2': linked_category_id, 'status': status, 'id': sid},
        )
        await db.execute(text("UPDATE material_std_name_unit SET del_flag = '1' WHERE std_name_id = :id"), {'id': sid})
        await db.execute(text("UPDATE material_std_name_spec SET del_flag = '1' WHERE std_name_id = :id"), {'id': sid})
    else:
        code = await _next_std_name_code(db)
        await db.execute(
            text(
                """
                INSERT INTO material_std_name(standard_name, std_name_code, category_level2_id, status, del_flag)
                VALUES(:standard_name, :code, :c2, :status, '0')
                """
            ),
            {'standard_name': standard_name, 'code': code, 'c2': linked_category_id, 'status': status},
        )
        sid = await _fetch_scalar(db, "SELECT LAST_INSERT_ID()")

    sort_idx = 0
    for unit_item in unit_items:
        unit_id = unit_item.get('unitId')
        unit_name = None
        if unit_id:
            u = await _fetch_one(db, "SELECT unit_name FROM material_unit WHERE id = :id", {'id': unit_id})
            unit_name = u['unit_name'] if u else None
        if not unit_name:
            continue
        sort_idx += 1
        await db.execute(
            text(
                """
                INSERT INTO material_std_name_unit(std_name_id, unit_id, unit_name, sort_order, status, del_flag)
                VALUES(:sid, :unit_id, :unit_name, :sort_order, '1', '0')
                """
            ),
            {'sid': sid, 'unit_id': unit_id, 'unit_name': unit_name, 'sort_order': sort_idx},
        )

    spec_sort = 0
    for spec_item in spec_items:
        spec_key = (spec_item.get('specKey') or '').strip()
        if not spec_key:
            continue
        spec_sort += 1
        spec_key_code = await _next_spec_key_code(db)
        await db.execute(
            text(
                """
                INSERT INTO material_std_name_spec(std_name_id, spec_key, spec_key_code, sort_order, status, del_flag)
                VALUES(:sid, :spec_key, :spec_key_code, :sort_order, '1', '0')
                """
            ),
            {'sid': sid, 'spec_key': spec_key, 'spec_key_code': spec_key_code, 'sort_order': spec_sort},
        )
        new_spec_id = await _fetch_scalar(db, "SELECT LAST_INSERT_ID()")
        value_sort = 0
        for value_item in (spec_item.get('specValueItems') or []):
            spec_value = (value_item.get('specValue') or '').strip()
            if not spec_value:
                continue
            value_sort += 1
            await db.execute(
                text(
                    """
                    INSERT INTO material_std_name_spec_value(spec_id, spec_value, spec_value_code, sort_order, status, del_flag)
                    VALUES(:spec_id, :spec_value, :code, :sort_order, '1', '0')
                    """
                ),
                {
                    'spec_id': new_spec_id,
                    'spec_value': spec_value,
                    'code': await _next_spec_value_code(db),
                    'sort_order': value_sort,
                },
            )


@material_standard_controller.post('/specModel/save')
async def spec_model_save(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    try:
        await _save_spec_model(db, payload, is_update=False)
        await db.commit()
        return ResponseUtil.success()
    except Exception as e:
        await db.rollback()
        return ResponseUtil.failure(msg=str(e))


@material_standard_controller.post('/specModel/update')
async def spec_model_update(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    if not payload.get('id'):
        return ResponseUtil.failure(msg='ID不能为空')
    try:
        await _save_spec_model(db, payload, is_update=True)
        await db.commit()
        return ResponseUtil.success()
    except Exception as e:
        await db.rollback()
        return ResponseUtil.failure(msg=str(e))


@material_standard_controller.post('/specModel/delete')
async def spec_model_delete(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    sid = payload.get('id')
    if not sid:
        return ResponseUtil.failure(msg='ID不能为空')
    await db.execute(text("UPDATE material_std_name SET del_flag = '1' WHERE id = :id"), {'id': sid})
    await db.execute(text("UPDATE material_std_name_unit SET del_flag = '1' WHERE std_name_id = :id"), {'id': sid})
    await db.execute(text("UPDATE material_std_name_spec SET del_flag = '1' WHERE std_name_id = :id"), {'id': sid})
    await db.commit()
    return ResponseUtil.success()


@material_standard_controller.post('/review/page')
async def standard_review_page(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    try:
        await ensure_standardization_tables(db)
        page_num = _to_int(payload.get('pageNum'), 1)
        page_size = _to_int(payload.get('pageSize'), 20)
        where = ["r.del_flag = '0'"]
        params: dict[str, Any] = {}

        def like_if(value: Any, field: str, key: str) -> None:
            text_value = _safe_text(value)
            if text_value:
                where.append(f"{field} LIKE :{key}")
                params[key] = f'%{text_value}%'

        material_name = _safe_text(payload.get('materialName'))
        if material_name:
            where.append(
                """
                (
                    r.material_name LIKE :material_name
                    OR sn.standard_name LIKE :material_name
                )
                """
            )
            params['material_name'] = f'%{material_name}%'

        specification = _safe_text(payload.get('specification'))
        if specification:
            where.append(
                """
                (
                    r.specification LIKE :specification
                    OR EXISTS (
                        SELECT 1
                        FROM material_std_name_spec_value v
                        LEFT JOIN material_std_name_spec s ON s.id = v.spec_id
                        WHERE v.del_flag = '0'
                          AND JSON_CONTAINS(
                              IF(
                                  JSON_VALID(r.standard_attr_value_ids_json),
                                  r.standard_attr_value_ids_json,
                                  JSON_ARRAY()
                              ),
                              CAST(v.id AS JSON),
                              '$'
                          )
                          AND (
                              v.spec_value LIKE :specification
                              OR v.spec_value_code LIKE :specification
                              OR s.spec_key LIKE :specification
                          )
                    )
                )
                """
            )
            params['specification'] = f'%{specification}%'

        status_value = _safe_text(payload.get('status'))
        if status_value:
            if status_value == 'SUCCESS':
                where.append("r.standardization_status IN ('SUCCESS', 'SKIPPED')")
            else:
                where.append("r.standardization_status = :status")
                params['status'] = status_value
        like_if(payload.get('standardCode'), 'r.standard_code', 'standard_code')
        process_segment = _safe_text(payload.get('processSegment'))
        if process_segment:
            where.append(
                """
                (
                    r.original_process_segment LIKE :process_segment
                    OR r.process_segment_name LIKE :process_segment
                    OR ps.segment_name LIKE :process_segment
                )
                """
            )
            params['process_segment'] = f'%{process_segment}%'

        category_level3_id = _to_int(payload.get('categoryLevel3Id'), 0)
        category_level2_id = _to_int(payload.get('categoryLevel2Id'), 0)
        category_level1_id = _to_int(payload.get('categoryLevel1Id'), 0)
        if category_level3_id > 0:
            where.append("r.standard_category_level3_id = :category_level3_id")
            params['category_level3_id'] = category_level3_id
        elif category_level2_id > 0:
            where.append(
                """
                EXISTS (
                  SELECT 1
                  FROM material_category c3f
                  WHERE c3f.id = r.standard_category_level3_id
                    AND c3f.parent_id = :category_level2_id
                )
                """
            )
            params['category_level2_id'] = category_level2_id
        elif category_level1_id > 0:
            where.append(
                """
                EXISTS (
                  SELECT 1
                  FROM material_category c3f
                  LEFT JOIN material_category c2f ON c2f.id = c3f.parent_id
                  WHERE c3f.id = r.standard_category_level3_id
                    AND c2f.parent_id = :category_level1_id
                )
                """
            )
            params['category_level1_id'] = category_level1_id

        where_sql = ' AND '.join(where)
        dedupe_from_sql = """
            FROM material_standard_review r
            JOIN (
                SELECT MAX(id) AS id
                FROM material_standard_review
                WHERE del_flag = '0'
                GROUP BY material_name, specification, unit_name
            ) latest ON latest.id = r.id
            LEFT JOIN material_category c3 ON c3.id = r.standard_category_level3_id
            LEFT JOIN material_std_name sn ON sn.id = r.standard_std_name_id
            LEFT JOIN material_unit u ON u.id = r.standard_unit_id
            LEFT JOIN material_process_segment ps ON ps.id = r.standard_segment_id
        """
        total = await _fetch_scalar(db, f"SELECT COUNT(1) {dedupe_from_sql} WHERE {where_sql}", params) or 0
        params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
        rows = await _fetch_all(
            db,
            f"""
            SELECT
                r.id,
                r.price_record_id AS priceRecordId,
                r.material_name AS materialName,
                r.specification,
                r.unit_name AS unitName,
                r.remark,
                r.update_time AS updateTime,
                r.original_process_segment AS originalProcessSegment,
                r.raw_price_excluding_tax AS rawPriceExcludingTax,
                r.raw_price_including_tax AS rawPriceIncludingTax,
                r.standardization_status AS standardizationStatus,
                r.source_type AS sourceType,
                r.standard_code AS standardCode,
                r.conversion_factor AS conversionFactor,
                r.normalized_price_excluding_tax AS normalizedPriceExcludingTax,
                r.normalized_price_including_tax AS normalizedPriceIncludingTax,
                r.error_message AS errorMessage,
                r.standardized_at AS standardizedAt,
                r.standard_category_level3_id AS standardCategoryLevel3Id,
                c3.category_name AS standardCategoryLevel3Name,
                r.standard_std_name_id AS standardStdNameId,
                sn.standard_name AS standardStdName,
                sn.std_name_code AS standardStdNameCode,
                r.standard_unit_id AS standardUnitId,
                u.unit_name AS standardUnitName,
                u.unit_biz_id AS standardUnitBizId,
                r.standard_segment_id AS standardSegmentId,
                ps.segment_name AS standardSegmentName,
                ps.segment_biz_id AS standardSegmentBizId,
                r.standard_attr_value_ids_json AS standardAttrValueIdsJson
            {dedupe_from_sql}
            WHERE {where_sql}
            ORDER BY COALESCE(r.update_time, r.create_time) DESC, r.id DESC
            LIMIT :offset, :limit
            """,
            params,
        )
        for row in rows:
            attr_ids = json.loads(row.get('standardAttrValueIdsJson') or '[]')
            row['standardAttrValueIds'] = attr_ids
            if attr_ids:
                placeholders = ','.join([f':attr_{idx}' for idx in range(len(attr_ids))])
                attr_rows = await _fetch_all(
                    db,
                    f"""
                    SELECT v.id,
                           v.spec_value AS specValue,
                           v.spec_value_code AS specValueCode,
                           s.spec_key AS specKey
                    FROM material_std_name_spec_value v
                    LEFT JOIN material_std_name_spec s ON s.id = v.spec_id
                    WHERE v.id IN ({placeholders}) AND v.del_flag = '0'
                    ORDER BY v.id ASC
                    """,
                    {f'attr_{idx}': attr_id for idx, attr_id in enumerate(attr_ids)},
                )
                row['standardAttrValues'] = attr_rows
            else:
                row['standardAttrValues'] = []
        return ResponseUtil.success(data={'records': rows, 'total': int(total)})
    except Exception:
        logger.exception('标准化复核分页查询失败')
        return ResponseUtil.failure(msg='标准化失败：标准库版本不一致，请刷新后重试。')


@material_standard_controller.post('/review/getById')
async def standard_review_get_by_id(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await ensure_standardization_tables(db)
    review_id = _to_int(payload.get('id'), 0)
    if review_id <= 0:
        return ResponseUtil.failure(msg='ID不能为空')
    row = await _fetch_one(
        db,
        """
        SELECT
            r.id,
            r.price_record_id AS priceRecordId,
            r.material_name AS materialName,
            r.specification,
            r.unit_name AS unitName,
            r.remark,
            r.original_process_segment AS originalProcessSegment,
            r.raw_price_excluding_tax AS rawPriceExcludingTax,
            r.raw_price_including_tax AS rawPriceIncludingTax,
            r.dify_request_json AS difyRequestJson,
            r.dify_answer_text AS difyAnswerText,
            r.dify_result_json AS difyResultJson,
            r.standard_category_level3_id AS standardCategoryLevel3Id,
            r.standard_std_name_id AS standardStdNameId,
            r.standard_unit_id AS standardUnitId,
            r.standard_segment_id AS standardSegmentId,
            r.standard_attr_value_ids_json AS standardAttrValueIdsJson,
            r.standard_code AS standardCode,
            r.conversion_factor AS conversionFactor,
            r.normalized_price_excluding_tax AS normalizedPriceExcludingTax,
            r.normalized_price_including_tax AS normalizedPriceIncludingTax,
            r.standardization_status AS standardizationStatus,
            r.source_type AS sourceType,
            r.error_message AS errorMessage
        FROM material_standard_review r
        WHERE r.id = :id AND r.del_flag = '0'
        LIMIT 1
        """,
        {'id': review_id},
    )
    if not row:
        return ResponseUtil.failure(msg='标准化复核记录不存在')
    row['standardAttrValueIds'] = json.loads(row.get('standardAttrValueIdsJson') or '[]')
    return ResponseUtil.success(data=row)


@material_standard_controller.post('/review/update')
async def standard_review_update(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await ensure_standardization_tables(db)
    review_id = _to_int(payload.get('id'), 0)
    if review_id <= 0:
        return ResponseUtil.failure(msg='ID不能为空')
    try:
        result = await apply_review_result(
            db,
            review_id,
            category_level3_id=payload.get('standardCategoryLevel3Id'),
            standard_std_name_id=payload.get('standardStdNameId'),
            standard_unit_id=payload.get('standardUnitId'),
            standard_segment_id=payload.get('standardSegmentId'),
            standard_attr_value_ids=payload.get('standardAttrValueIds') or [],
            conversion_factor=payload.get('conversionFactor'),
        )
        await db.commit()
        return ResponseUtil.success(data=result)
    except Exception as exc:
        await db.rollback()
        return ResponseUtil.failure(msg=str(exc))


@material_standard_controller.post('/review/delete')
async def standard_review_delete(
    request: Request,
    payload: Annotated[dict, Body()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await ensure_standardization_tables(db)
    review_id = _to_int(payload.get('id'), 0)
    if review_id <= 0:
        return ResponseUtil.failure(msg='ID不能为空')
    try:
        await clear_review_result(db, review_id)
        await db.commit()
        return ResponseUtil.success(msg='删除成功')
    except Exception as exc:
        await db.rollback()
        return ResponseUtil.failure(msg=str(exc))


def _load_dify_config() -> dict:
    base_url = (os.getenv('MATERIAL_KNOWLEDGE_DIFY_BASE_URL') or 'http://192.168.1.42/v1').strip()
    dataset_id = (
        os.getenv('MATERIAL_KNOWLEDGE_DIFY_DATASET_ID') or 'dec7d6fa-d456-4caf-9839-e45d78cdcf11'
    ).strip()
    api_key = (os.getenv('MATERIAL_KNOWLEDGE_DIFY_API_KEY') or 'dataset-SnUHLSdZbq0x7bU5samwUcwB').strip()
    material_doc_name = (os.getenv('MATERIAL_KNOWLEDGE_DIFY_MATERIAL_DOCUMENT_NAME') or '标准材料数据').strip()
    process_doc_name = (os.getenv('MATERIAL_KNOWLEDGE_DIFY_PROCESS_DOCUMENT_NAME') or '标准工艺段').strip()
    category_doc_name = (os.getenv('MATERIAL_KNOWLEDGE_DIFY_CATEGORY_DOCUMENT_NAME') or '标准分类').strip()
    if not base_url or not dataset_id or not api_key:
        raise ValueError('Dify 配置缺失，请检查 base_url/dataset_id/api_key')
    return {
        'base_url': base_url.rstrip('/'),
        'dataset_id': dataset_id,
        'api_key': api_key,
        'material_doc_name': material_doc_name,
        'process_doc_name': process_doc_name,
        'category_doc_name': category_doc_name,
    }


def _build_process_rule(splitter: str) -> dict:
    return {
        'mode': 'custom',
        'rules': {
            'segmentation': {'separator': splitter.strip(), 'max_tokens': 4000},
            'pre_processing_rules': [
                {'id': 'remove_extra_spaces', 'enabled': True},
                {'id': 'remove_urls_emails', 'enabled': False},
            ],
        },
    }


def _dify_request(cfg: dict, method: str, path: str, body: dict | None = None, query: dict | None = None) -> dict:
    query_string = ''
    if query:
        query_string = '?' + parse.urlencode({k: v for k, v in query.items() if v is not None})
    url = f"{cfg['base_url']}{path}{query_string}"
    data = None
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode('utf-8')
    req = urlrequest.Request(url=url, data=data, method=method.upper())
    req.add_header('Authorization', f"Bearer {cfg['api_key']}")
    req.add_header('Content-Type', 'application/json; charset=UTF-8')
    req.add_header('Accept', 'application/json')
    try:
        with urlrequest.urlopen(req, timeout=30) as resp:
            txt = resp.read().decode('utf-8') if resp else ''
            return json.loads(txt) if txt else {}
    except Exception as e:
        raise ValueError(f'Dify 接口请求失败: {e}')


def _extract_document_array(response: dict) -> list[dict]:
    if not response:
        return []
    data = response.get('data')
    if isinstance(data, list):
        return [i for i in data if isinstance(i, dict)]
    if isinstance(data, dict):
        nested = data.get('data')
        if isinstance(nested, list):
            return [i for i in nested if isinstance(i, dict)]
    return []


def _extract_has_more(response: dict) -> bool:
    if not response:
        return False
    has_more = response.get('has_more')
    if isinstance(has_more, bool):
        return has_more
    data = response.get('data')
    if isinstance(data, dict):
        nested = data.get('has_more')
        return bool(nested)
    return False


def _extract_created_document_id(response: dict) -> str:
    if not response:
        return ''
    if isinstance(response.get('id'), str):
        return response.get('id')
    doc = response.get('document')
    if isinstance(doc, dict) and isinstance(doc.get('id'), str):
        return doc.get('id')
    data = response.get('data')
    if isinstance(data, dict):
        if isinstance(data.get('id'), str):
            return data.get('id')
        nested = data.get('document')
        if isinstance(nested, dict) and isinstance(nested.get('id'), str):
            return nested.get('id')
    return ''


def _list_same_name_doc_ids(cfg: dict, doc_name: str) -> list[str]:
    return [item.get('id') for item in _list_same_name_docs(cfg, doc_name) if item.get('id')]


def _list_same_name_docs(cfg: dict, doc_name: str) -> list[dict]:
    docs: list[dict] = []
    page = 1
    while True:
        resp = _dify_request(
            cfg,
            'GET',
            f"/datasets/{cfg['dataset_id']}/documents",
            query={'page': page, 'limit': 100},
        )
        data = _extract_document_array(resp)
        if not data:
            break
        for item in data:
            if item.get('name') == doc_name and item.get('id'):
                docs.append(item)
        if not _extract_has_more(resp):
            break
        page += 1
        if page > 200:
            break
    uniq: list[dict] = []
    ids: list[str] = []
    for d in docs:
        did = str(d.get('id'))
        if did in ids:
            continue
        ids.append(did)
        uniq.append(d)
    return uniq


def _delete_document(cfg: dict, doc_id: str) -> None:
    _dify_request(cfg, 'DELETE', f"/datasets/{cfg['dataset_id']}/documents/{doc_id}")


def _create_document(cfg: dict, doc_name: str, doc_type: str, splitter: str, content: str) -> str:
    body = {
        'name': doc_name,
        'text': content,
        'indexing_technique': 'high_quality',
        'process_rule': _build_process_rule(splitter),
        'metadata': {'type': doc_type},
    }
    try:
        resp = _dify_request(cfg, 'POST', f"/datasets/{cfg['dataset_id']}/document/create-by-text", body=body)
    except Exception:
        resp = _dify_request(cfg, 'POST', f"/datasets/{cfg['dataset_id']}/documents", body=body)
    return _extract_created_document_id(resp)


def _update_document_by_text(cfg: dict, doc_id: str, doc_name: str, splitter: str, content: str) -> str:
    body = {
        'name': doc_name,
        'text': content,
        'indexing_technique': 'high_quality',
        'process_rule': _build_process_rule(splitter),
    }
    resp = _dify_request(
        cfg, 'POST', f"/datasets/{cfg['dataset_id']}/documents/{doc_id}/update-by-text", body=body
    )
    return _extract_created_document_id(resp) or doc_id


def _upsert_document(cfg: dict, doc_name: str, doc_type: str, splitter: str, content: str) -> tuple[str, int]:
    docs = _list_same_name_docs(cfg, doc_name)
    if not docs:
        return _create_document(cfg, doc_name, doc_type, splitter, content), 0
    keep_doc_id = str(docs[0].get('id'))
    updated_id = _update_document_by_text(cfg, keep_doc_id, doc_name, splitter, content)
    return updated_id, 0


async def _resolve_category_path(db: AsyncSession, linked_category_id: Any) -> tuple[str, str, str]:
    if not linked_category_id:
        return '', '', ''
    linked = await _fetch_one(
        db,
        "SELECT id, parent_id, level, category_name FROM material_category WHERE id = :id AND status = '1' LIMIT 1",
        {'id': linked_category_id},
    )
    if not linked:
        return '', '', ''
    level = _to_int(linked.get('level'), 0)
    if level == 1:
        return linked.get('category_name') or '', '', ''
    if level == 2:
        c1 = await _fetch_one(
            db, "SELECT id, parent_id, category_name FROM material_category WHERE id = :id AND status = '1' LIMIT 1",
            {'id': linked.get('parent_id')},
        )
        return c1.get('category_name') if c1 else '', linked.get('category_name') or '', ''
    if level == 3:
        c2 = await _fetch_one(
            db,
            "SELECT id, parent_id, category_name FROM material_category WHERE id = :id AND status = '1' LIMIT 1",
            {'id': linked.get('parent_id')},
        )
        c1 = await _fetch_one(
            db,
            "SELECT category_name FROM material_category WHERE id = :id AND status = '1' LIMIT 1",
            {'id': c2.get('parent_id') if c2 else None},
        )
        return (
            c1.get('category_name') if c1 else '',
            c2.get('category_name') if c2 else '',
            linked.get('category_name') or '',
        )
    return '', linked.get('category_name') or '', ''


async def _build_material_document_blocks(db: AsyncSession) -> list[str]:
    std_name_category_code_map = _load_std_name_category_code_map()
    category_rows = await _fetch_all(
        db,
        """
        SELECT
          c3.category_name AS level3Name,
          c3.category_code AS level3Code,
          c2.category_name AS level2Name,
          c2.category_code AS level2Code,
          c1.category_name AS level1Name,
          c1.category_code AS level1Code
        FROM material_category c3
        LEFT JOIN material_category c2 ON c2.id = c3.parent_id AND c2.status = '1'
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id AND c1.status = '1'
        WHERE c3.level = 3 AND c3.status = '1'
        """,
    )
    category_path_by_merged_code: dict[str, tuple[str, str, str]] = {}
    for c_row in category_rows:
        merged_code = _merge_category_code(c_row.get('level1Code'), c_row.get('level2Code'), c_row.get('level3Code'))
        if not merged_code:
            continue
        category_path_by_merged_code[merged_code] = (
            c_row.get('level1Name') or '',
            c_row.get('level2Name') or '',
            c_row.get('level3Name') or '',
        )

    rows = await _fetch_all(
        db,
        """
        SELECT id, std_name_code AS stdNameCode, standard_name AS standardName, category_level2_id AS linkedCategoryId
        FROM material_std_name
        WHERE status = '1' AND del_flag = '0'
        ORDER BY id ASC
        """,
    )
    blocks: list[str] = []
    for row in rows:
        c1_name, c2_name, c3_name = await _resolve_category_path(db, row.get('linkedCategoryId'))
        if not c3_name:
            std_name = _safe_text(row.get('standardName'))
            mapped_code = std_name_category_code_map.get(std_name)
            if mapped_code:
                mapped_path = category_path_by_merged_code.get(mapped_code)
                if mapped_path:
                    c1_name, c2_name, c3_name = mapped_path
        units = await _fetch_all(
            db,
            """
            SELECT su.id AS relId,
                   su.unit_name AS unitName,
                   u.unit_biz_id AS unitBizId
            FROM material_std_name_unit su
            LEFT JOIN material_unit u ON u.id = su.unit_id
            WHERE su.std_name_id = :sid AND su.del_flag = '0'
            ORDER BY su.sort_order ASC, su.id ASC
            """,
            {'sid': row.get('id')},
        )
        unit_payload = []
        for u in units:
            unit_payload.append(
                {
                    '单位ID': u.get('unitBizId') or f"U{int(u.get('relId') or 0):04d}",
                    '单位名称': u.get('unitName') or '',
                }
            )
        specs = await _fetch_all(
            db,
            """
            SELECT s.id AS specId,
                   s.spec_key AS specKey,
                   v.id AS specValueId,
                   v.spec_value AS specValue,
                   v.spec_value_code AS specValueCode
            FROM material_std_name_spec s
            LEFT JOIN material_std_name_spec_value v ON v.spec_id = s.id AND v.del_flag = '0'
            WHERE s.std_name_id = :sid AND s.del_flag = '0'
            ORDER BY s.sort_order ASC, s.id ASC, v.sort_order ASC, v.id ASC
            """,
            {'sid': row.get('id')},
        )
        spec_payload: dict[str, list[dict]] = {}
        for s in specs:
            spec_key = (s.get('specKey') or '').strip()
            spec_value = (s.get('specValue') or '').strip()
            if not spec_key or not spec_value:
                continue
            if spec_key not in spec_payload:
                spec_payload[spec_key] = []
            spec_payload[spec_key].append(
                {'属性值ID': s.get('specValueCode') or f"V{int(s.get('specValueId') or 0):06d}", '属性值': spec_value}
            )
        payload = {
            '标准材料ID': row.get('stdNameCode') or f"M{int(row.get('id') or 0):05d}",
            '标准材料名称': row.get('standardName') or '',
            '所属分类': {'一级分类': c1_name, '二级分类': c2_name, '三级分类': c3_name},
            '标准单位': unit_payload,
            '标准规格属性': spec_payload,
        }
        blocks.append(json.dumps(payload, ensure_ascii=False, indent=2))
    return blocks


async def _build_process_document_blocks(db: AsyncSession) -> list[str]:
    rows = await _fetch_all(
        db,
        """
        SELECT id, segment_biz_id AS segmentBizId, segment_name AS segmentName
        FROM material_process_segment
        WHERE status = '1'
        ORDER BY segment_biz_id ASC, id ASC
        """,
    )
    blocks: list[str] = []
    for row in rows:
        payload = {
            '标准工艺段名称': row.get('segmentName') or '',
            '标准工艺段ID': row.get('segmentBizId') or f"P{int(row.get('id') or 0):04d}",
        }
        blocks.append(json.dumps(payload, ensure_ascii=False, indent=2))
    return blocks


def _normalize_category_code_part(value: Any) -> str:
    raw = ''.join(ch for ch in str(value or '').strip() if ch.isdigit())
    if not raw:
        return ''
    if len(raw) == 1:
        return f'0{raw}'
    if len(raw) == 2:
        return raw
    return raw[-2:]


def _merge_category_code(level1_code: Any, level2_code: Any, level3_code: Any) -> str:
    merged = (
        _normalize_category_code_part(level1_code)
        + _normalize_category_code_part(level2_code)
        + _normalize_category_code_part(level3_code)
    )
    if not merged:
        return ''
    return merged if merged.startswith('26') else f'26{merged}'


async def _build_category_document_blocks(db: AsyncSession) -> list[str]:
    rows = await _fetch_all(
        db,
        """
        SELECT
          c3.id AS level3Id,
          c3.category_name AS level3Name,
          c3.category_code AS level3Code,
          c2.category_name AS level2Name,
          c2.category_code AS level2Code,
          c1.category_name AS level1Name,
          c1.category_code AS level1Code
        FROM material_category c3
        LEFT JOIN material_category c2 ON c2.id = c3.parent_id AND c2.status = '1'
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id AND c1.status = '1'
        WHERE c3.level = 3 AND c3.status = '1'
        """,
    )
    rows.sort(
        key=lambda row: (
            _merge_category_code(row.get('level1Code'), row.get('level2Code'), row.get('level3Code')),
            _to_int(row.get('level3Id'), 0),
        )
    )
    blocks: list[str] = []
    for row in rows:
        payload = {
            '一级分类': row.get('level1Name') or '',
            '二级分类': row.get('level2Name') or '',
            '三级分类': row.get('level3Name') or '',
            '三级分类编码': _merge_category_code(row.get('level1Code'), row.get('level2Code'), row.get('level3Code')),
        }
        blocks.append(json.dumps(payload, ensure_ascii=False, indent=2))
    return blocks


@material_knowledge_controller.post('/sync')
async def knowledge_sync(request: Request, db: Annotated[AsyncSession, Depends(get_db)]):
    try:
        cfg = _load_dify_config()
        material_blocks = await _build_material_document_blocks(db)
        process_blocks = await _build_process_document_blocks(db)
        category_blocks = await _build_category_document_blocks(db)

        material_doc_id, material_deleted_count = _upsert_document(
            cfg, cfg['material_doc_name'], MATERIAL_DOCUMENT_TYPE, MATERIAL_SPLITTER, MATERIAL_SPLITTER.join(material_blocks)
        )

        process_doc_id, process_deleted_count = _upsert_document(
            cfg, cfg['process_doc_name'], PROCESS_DOCUMENT_TYPE, PROCESS_SPLITTER, PROCESS_SPLITTER.join(process_blocks)
        )
        category_doc_id, category_deleted_count = _upsert_document(
            cfg, cfg['category_doc_name'], CATEGORY_DOCUMENT_TYPE, CATEGORY_SPLITTER, CATEGORY_SPLITTER.join(category_blocks)
        )

        return ResponseUtil.success(
            data={
                'syncedItemCount': len(material_blocks) + len(process_blocks) + len(category_blocks),
                'materialCount': len(material_blocks),
                'processCount': len(process_blocks),
                'categoryCount': len(category_blocks),
                'deletedCount': int(material_deleted_count + process_deleted_count + category_deleted_count),
                'materialDocumentId': material_doc_id,
                'processDocumentId': process_doc_id,
                'categoryDocumentId': category_doc_id,
                'message': '知识库已更新（覆盖：标准材料数据 + 标准工艺段 + 标准分类）',
            }
        )
    except Exception as e:
        return ResponseUtil.failure(msg=f'知识库同步失败：{e}')
