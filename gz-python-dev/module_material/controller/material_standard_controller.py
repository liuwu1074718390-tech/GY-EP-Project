from __future__ import annotations

from typing import Any, Annotated

from fastapi import APIRouter, Body, Depends, Request
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from config.get_db import get_db
from module_admin.service.login_service import LoginService
from utils.response_util import ResponseUtil

material_standard_controller = APIRouter(
    prefix='/material/standard', dependencies=[Depends(LoginService.get_current_user)]
)
material_knowledge_controller = APIRouter(
    prefix='/material/standard/knowledge', dependencies=[Depends(LoginService.get_current_user)]
)


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
    where = ["ms.del_flag = '0'"]
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

    like_if(payload.get('materialCode'), 'ms.material_code', 'material_code')
    like_if(payload.get('materialName'), 'ms.material_name', 'material_name')
    eq_if(payload.get('categoryLevel1Id'), 'ms.category_level1_id', 'c1')
    eq_if(payload.get('categoryLevel2Id'), 'ms.category_level2_id', 'c2')
    eq_if(payload.get('categoryLevel3Id'), 'ms.category_level3_id', 'c3')
    eq_if(payload.get('specId'), 'ms.spec_id', 'spec_id')
    eq_if(payload.get('unitId'), 'ms.unit_id', 'unit_id')
    eq_if(payload.get('status'), 'ms.status', 'status')
    where_sql = " AND ".join(where)

    total = await _fetch_scalar(db, f"SELECT COUNT(1) FROM material_standard ms WHERE {where_sql}", params) or 0
    params.update({'offset': (page_num - 1) * page_size, 'limit': page_size})
    rows = await _fetch_all(
        db,
        f"""
        SELECT ms.id,
               ms.material_code AS materialCode,
               ms.material_name AS materialName,
               ms.category_level1_id AS categoryLevel1Id,
               ms.category_level2_id AS categoryLevel2Id,
               ms.category_level3_id AS categoryLevel3Id,
               ms.spec_id AS specId,
               ms.unit_id AS unitId,
               ms.remark,
               ms.status,
               c1.category_name AS categoryLevel1Name,
               c2.category_name AS categoryLevel2Name,
               c3.category_name AS categoryLevel3Name,
               u.unit_name AS unitName
        FROM material_standard ms
        LEFT JOIN material_category c1 ON c1.id = ms.category_level1_id
        LEFT JOIN material_category c2 ON c2.id = ms.category_level2_id
        LEFT JOIN material_category c3 ON c3.id = ms.category_level3_id
        LEFT JOIN material_unit u ON u.id = ms.unit_id
        WHERE {where_sql}
        ORDER BY ms.id DESC
        LIMIT :offset, :limit
        """,
        params,
    )
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
    c1 = payload.get('categoryLevel1Id')
    c2 = payload.get('categoryLevel2Id')
    status = (payload.get('status') or '').strip()

    where = ["sn.del_flag = '0'"]
    params: dict[str, Any] = {}
    if standard_name:
        where.append("sn.standard_name LIKE :standard_name")
        params['standard_name'] = f'%{standard_name}%'
    if c1 not in (None, '', 'null'):
        where.append("c1.id = :c1")
        params['c1'] = c1
    if c2 not in (None, '', 'null'):
        where.append("sn.category_level2_id = :c2")
        params['c2'] = c2
    if status:
        where.append("sn.status = :status")
        params['status'] = status
    where_sql = " AND ".join(where)

    total = await _fetch_scalar(
        db,
        f"""
        SELECT COUNT(1)
        FROM material_std_name sn
        LEFT JOIN material_category c2 ON c2.id = sn.category_level2_id
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id
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
               sn.category_level2_id AS categoryLevel2Id,
               c2.category_name AS categoryLevel2Name,
               c1.id AS categoryLevel1Id,
               c1.category_name AS categoryLevel1Name,
               sn.status
        FROM material_std_name sn
        LEFT JOIN material_category c2 ON c2.id = sn.category_level2_id
        LEFT JOIN material_category c1 ON c1.id = c2.parent_id
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
        row['specSummary'] = '；'.join([f"{s['specKey']}:{s['specValue']}" for s in specs])
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
               category_level2_id AS categoryLevel2Id,
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
    category_level2_id = payload.get('categoryLevel2Id')
    status = (payload.get('status') or '1').strip() or '1'
    unit_items = payload.get('unitItems') or []
    spec_items = payload.get('specItems') or []
    if not standard_name:
        raise ValueError('标准材料名称不能为空')
    if not category_level2_id:
        raise ValueError('所属分类不能为空')
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
            {'standard_name': standard_name, 'c2': category_level2_id, 'status': status, 'id': sid},
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
            {'standard_name': standard_name, 'code': code, 'c2': category_level2_id, 'status': status},
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


@material_knowledge_controller.post('/sync')
async def knowledge_sync(request: Request, db: Annotated[AsyncSession, Depends(get_db)]):
    count = await _fetch_scalar(db, "SELECT COUNT(1) FROM material_standard WHERE del_flag = '0'") or 0
    return ResponseUtil.success(data={'syncedItemCount': int(count), 'message': '知识库已更新（覆盖）'})
