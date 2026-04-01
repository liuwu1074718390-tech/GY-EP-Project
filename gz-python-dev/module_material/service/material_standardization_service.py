from __future__ import annotations

import asyncio
import hashlib
import json
import os
from datetime import datetime
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from typing import Any
from urllib import error as urlerror
from urllib import request as urlrequest

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from config.database import AsyncSessionLocal
from utils.log_util import logger

STANDARD_STATUS_PENDING = 'PENDING'
STANDARD_STATUS_RUNNING = 'RUNNING'
STANDARD_STATUS_SUCCESS = 'SUCCESS'
STANDARD_STATUS_FAILED = 'FAILED'
STANDARD_STATUS_SKIPPED = 'SKIPPED'
STANDARD_STATUS_DELETED = 'DELETED'
STANDARD_STATUS_MANUAL = 'MANUAL'

STANDARD_SOURCE_DIFY = 'DIFY'
STANDARD_SOURCE_FALLBACK = 'FALLBACK'
STANDARD_SOURCE_MANUAL = 'MANUAL'

_STANDARDIZE_CONCURRENCY = 10
_standardize_semaphore = asyncio.Semaphore(_STANDARDIZE_CONCURRENCY)
_background_tasks: set[asyncio.Task] = set()


def _safe_text(value: Any) -> str:
    return str(value or '').strip()


def _to_user_friendly_error(raw_message: str) -> str:
    text_value = _safe_text(raw_message).lower()
    if not text_value:
        return '标准化失败：系统繁忙，请稍后重试。'
    if any(keyword in text_value for keyword in ('unknown column', 'no such column', '1054')):
        return '标准化失败：标准库版本不一致，请刷新后重试。'
    if any(keyword in text_value for keyword in ('timeout', 'timed out', 'read timeout')):
        return '标准化失败：系统繁忙，请稍后重试。'
    if any(keyword in text_value for keyword in ('permission denied', 'forbidden', 'unauthorized', 'access denied')):
        return '标准化失败：当前账号无操作权限，请联系管理员。'
    if any(keyword in text_value for keyword in ('duplicate', 'already exists', 'unique constraint')):
        return '标准化失败：该记录已有标准化任务，请勿重复提交。'
    if any(keyword in text_value for keyword in ('connection refused', 'connection reset', 'name or service not known', 'dns')):
        return '标准化失败：依赖服务异常，请稍后重试。'
    return '标准化失败：系统繁忙，请稍后重试。'


def _to_review_failed_message(resolve_errors: list[str]) -> str:
    if not resolve_errors:
        return '标准化失败：系统繁忙，请稍后重试。'
    joined_text = '；'.join(_safe_text(item).lower() for item in resolve_errors if _safe_text(item))
    if any(keyword in joined_text for keyword in ('标准编码', '编码生成', '锁竞争', 'get_lock')):
        return '标准化失败：标准编码生成失败，请稍后重试。'
    if any(keyword in joined_text for keyword in ('未映射', '未找到可用三级分类', '分类编码')):
        return '标准化失败：分类与标准映射缺失，请联系管理员。'
    if any(keyword in joined_text for keyword in ('名称', '规格', '单位', '工艺段', '换算系数无效')):
        return '标准化失败：材料关键信息不完整，请补全后重试。'
    return '标准化失败：分类与标准映射缺失，请联系管理员。'


def _to_int(value: Any, default: int = 0) -> int:
    try:
        if value is None:
            return default
        return int(value)
    except Exception:
        return default


def _to_decimal(value: Any, default: Decimal | None = None) -> Decimal | None:
    if value is None:
        return default
    raw = _safe_text(value)
    if not raw:
        return default
    try:
        return Decimal(raw)
    except (InvalidOperation, ValueError):
        return default


def _round2(value: Decimal | None) -> Decimal | None:
    if value is None:
        return None
    return value.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)


def _json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))


async def _fetch_all(db: AsyncSession, sql: str, params: dict | None = None) -> list[dict]:
    result = await db.execute(text(sql), params or {})
    return [dict(row) for row in result.mappings().all()]


async def _fetch_one(db: AsyncSession, sql: str, params: dict | None = None) -> dict | None:
    result = await db.execute(text(sql), params or {})
    row = result.mappings().first()
    return dict(row) if row else None


async def _fetch_scalar(db: AsyncSession, sql: str, params: dict | None = None) -> Any:
    result = await db.execute(text(sql), params or {})
    return result.scalar()


async def _acquire_mysql_lock(db: AsyncSession, lock_name: str, timeout_seconds: int = 10) -> None:
    locked = await _fetch_scalar(
        db,
        "SELECT GET_LOCK(:lock_name, :timeout_seconds)",
        {'lock_name': lock_name, 'timeout_seconds': timeout_seconds},
    )
    if _to_int(locked, 0) != 1:
        raise RuntimeError('标准编码生成繁忙，请稍后重试')


async def _release_mysql_lock(db: AsyncSession, lock_name: str) -> None:
    try:
        await _fetch_scalar(db, "SELECT RELEASE_LOCK(:lock_name)", {'lock_name': lock_name})
    except Exception:
        logger.warning('释放MySQL锁失败，lock_name=%s', lock_name)


async def _column_exists(db: AsyncSession, table_name: str, column_name: str) -> bool:
    count = await _fetch_scalar(
        db,
        """
        SELECT COUNT(1)
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = :table_name
          AND COLUMN_NAME = :column_name
        """,
        {'table_name': table_name, 'column_name': column_name},
    )
    return int(count or 0) > 0


async def _ensure_column(db: AsyncSession, table_name: str, column_name: str, ddl: str) -> None:
    if await _column_exists(db, table_name, column_name):
        return
    await db.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {ddl}"))


async def ensure_standardization_tables(db: AsyncSession) -> None:
    await db.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS material_standard_review (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                price_record_id BIGINT NOT NULL,
                material_name VARCHAR(255) NOT NULL,
                specification VARCHAR(255) NOT NULL,
                unit_name VARCHAR(64) NOT NULL,
                remark VARCHAR(500) NULL,
                process_segment_name VARCHAR(255) NULL,
                original_process_segment VARCHAR(255) NULL,
                raw_price_excluding_tax DECIMAL(18, 2) NULL,
                raw_price_including_tax DECIMAL(18, 2) NULL,
                dify_request_json LONGTEXT NULL,
                dify_answer_text LONGTEXT NULL,
                dify_result_json LONGTEXT NULL,
                standard_category_level3_id BIGINT NULL,
                standard_std_name_id BIGINT NULL,
                standard_unit_id BIGINT NULL,
                standard_segment_id BIGINT NULL,
                standard_attr_value_ids_json LONGTEXT NULL,
                standard_code VARCHAR(16) NULL,
                conversion_factor DECIMAL(18, 6) NULL DEFAULT 1.000000,
                normalized_price_excluding_tax DECIMAL(18, 2) NULL,
                normalized_price_including_tax DECIMAL(18, 2) NULL,
                standardization_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                source_type VARCHAR(20) NOT NULL DEFAULT 'DIFY',
                error_message VARCHAR(1000) NULL,
                standardized_at DATETIME NULL,
                del_flag CHAR(1) NOT NULL DEFAULT '0',
                create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                KEY idx_review_price_record_id (price_record_id),
                KEY idx_review_raw_match (material_name, specification, unit_name),
                KEY idx_review_status (standardization_status),
                KEY idx_review_standard_code (standard_code)
            )
            """
        )
    )
    await db.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS material_standard_code_registry (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                signature VARCHAR(255) NOT NULL,
                code_prefix VARCHAR(8) NOT NULL,
                serial_no INT NOT NULL,
                standard_code VARCHAR(16) NOT NULL,
                category_level3_id BIGINT NOT NULL,
                standard_std_name_id BIGINT NULL,
                standard_unit_id BIGINT NULL,
                standard_attr_value_ids_json LONGTEXT NULL,
                create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uk_standard_code_signature (signature),
                UNIQUE KEY uk_standard_code_value (standard_code),
                KEY idx_standard_code_prefix_serial (code_prefix, serial_no)
            )
            """
        )
    )
    await db.execute(
        text(
            """
            CREATE TABLE IF NOT EXISTS material_standard_item (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                standard_code VARCHAR(16) NOT NULL,
                standard_category_level3_id BIGINT NULL,
                standard_std_name_id BIGINT NULL,
                standard_unit_id BIGINT NULL,
                standard_attr_value_ids_json LONGTEXT NULL,
                material_name VARCHAR(255) NOT NULL,
                specification VARCHAR(500) NULL,
                unit_name VARCHAR(64) NULL,
                create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uk_standard_item_code (standard_code)
            )
            """
        )
    )
    await _ensure_column(
        db,
        'material_standard_review',
        'process_segment_name',
        "process_segment_name VARCHAR(255) NULL COMMENT '工艺段（兼容字段）'",
    )
    await _ensure_column(
        db,
        'material_standard_review',
        'original_process_segment',
        "original_process_segment VARCHAR(255) NULL COMMENT '原始工艺段'",
    )
    await _ensure_column(
        db,
        'material_standard_review',
        'standard_item_id',
        "standard_item_id BIGINT NULL COMMENT '标准工料机主表ID'",
    )

    alter_columns = [
        ('standardization_status', "standardization_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '标准化状态'"),
        ('standard_review_id', "standard_review_id BIGINT NULL COMMENT '标准化复核ID'"),
        ('standard_code', "standard_code VARCHAR(16) NULL COMMENT '标准化编码'"),
        ('standard_category_level3_id', "standard_category_level3_id BIGINT NULL COMMENT '标准三级分类ID'"),
        ('standard_std_name_id', "standard_std_name_id BIGINT NULL COMMENT '标准材料名称ID'"),
        ('standard_unit_id', "standard_unit_id BIGINT NULL COMMENT '标准单位ID'"),
        ('standard_segment_id', "standard_segment_id BIGINT NULL COMMENT '标准工艺段ID'"),
        ('standard_attr_value_ids_json', "standard_attr_value_ids_json LONGTEXT NULL COMMENT '标准属性值ID列表'"),
        ('normalized_price_excluding_tax', "normalized_price_excluding_tax DECIMAL(18, 2) NULL COMMENT '标准化不含税价'"),
        ('normalized_price_including_tax', "normalized_price_including_tax DECIMAL(18, 2) NULL COMMENT '标准化含税价'"),
        ('standardization_error', "standardization_error VARCHAR(1000) NULL COMMENT '标准化错误信息'"),
        ('standardized_at', "standardized_at DATETIME NULL COMMENT '标准化时间'"),
    ]
    for column_name, ddl in alter_columns:
        await _ensure_column(db, 'material_price_record', column_name, ddl)


def _normalize_attr_ids(attr_ids: list[Any] | None) -> list[int]:
    values = sorted({_to_int(i, 0) for i in (attr_ids or []) if _to_int(i, 0) > 0})
    return values


def _normalize_attr_codes(attr_list: list[Any] | None) -> list[str]:
    values = sorted({_safe_text(i) for i in (attr_list or []) if _safe_text(i)})
    return values


def _normalize_spec_signature_text(specification: Any) -> str:
    return ' '.join(_safe_text(specification).split())


def _build_spec_signature_basis(attr_json: str, specification: Any) -> str:
    if attr_json and attr_json != '[]':
        return f'ATTR:{attr_json}'
    return 'ATTR:[]'


def _build_standard_code_signature(
    category_level3_id: int | None,
    std_name_id: int | None,
    unit_id: int | None,
    attr_json: str,
    specification: Any = '',
) -> str:
    raw = (
        f'{_to_int(category_level3_id, 0)}|'
        f'{_to_int(std_name_id, 0)}|'
        f'{_to_int(unit_id, 0)}|'
        f'{_build_spec_signature_basis(attr_json, specification)}'
    )
    return hashlib.md5(raw.encode('utf-8')).hexdigest()


def _extract_standard_code_serial(code: Any, prefix: str) -> int:
    code_text = _safe_text(code)
    if not code_text.startswith(prefix):
        return 0
    suffix = code_text[len(prefix) :]
    if len(suffix) != 3 or not suffix.isdigit():
        return 0
    return int(suffix)


async def _get_review_for_standard_item_sync(db: AsyncSession, review_id: int) -> dict | None:
    return await _fetch_one(
        db,
        """
        SELECT id,
               price_record_id AS priceRecordId,
               standard_item_id AS standardItemId,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               standard_code AS standardCode,
               standard_category_level3_id AS standardCategoryLevel3Id,
               standard_std_name_id AS standardStdNameId,
               standard_unit_id AS standardUnitId,
               standard_attr_value_ids_json AS standardAttrValueIdsJson,
               standardization_status AS standardizationStatus,
               del_flag AS delFlag
        FROM material_standard_review
        WHERE id = :id
        LIMIT 1
        """,
        {'id': review_id},
    )


async def _build_standard_item_display_fields(db: AsyncSession, review_row: dict) -> dict:
    material_name = _safe_text(review_row.get('materialName'))
    specification = ''
    unit_name = _safe_text(review_row.get('unitName'))

    std_name_id = _to_int(review_row.get('standardStdNameId'))
    if std_name_id > 0:
        std_name_row = await _fetch_one(
            db,
            """
            SELECT standard_name AS standardName
            FROM material_std_name
            WHERE id = :id AND del_flag = '0'
            LIMIT 1
            """,
            {'id': std_name_id},
        )
        if std_name_row and _safe_text(std_name_row.get('standardName')):
            material_name = _safe_text(std_name_row.get('standardName'))

    unit_id = _to_int(review_row.get('standardUnitId'))
    if unit_id > 0:
        unit_row = await _fetch_one(
            db,
            """
            SELECT unit_name AS unitName
            FROM material_unit
            WHERE id = :id AND status = '1'
            LIMIT 1
            """,
            {'id': unit_id},
        )
        if unit_row and _safe_text(unit_row.get('unitName')):
            unit_name = _safe_text(unit_row.get('unitName'))

    attr_ids = json.loads(review_row.get('standardAttrValueIdsJson') or '[]')
    attr_ids = _normalize_attr_ids(attr_ids)
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
        specification = '；'.join(
            [f"{item.get('specKey') or '规格'}:{item.get('specValue') or '-'}" for item in attr_rows]
        )

    return {
        'materialName': material_name,
        'specification': specification,
        'unitName': unit_name,
    }


async def _update_standard_item_from_review(db: AsyncSession, item_id: int, review_row: dict) -> None:
    display_fields = await _build_standard_item_display_fields(db, review_row)
    await db.execute(
        text(
            """
            UPDATE material_standard_item
            SET standard_code = :standard_code,
                standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                material_name = :material_name,
                specification = :specification,
                unit_name = :unit_name
            WHERE id = :id
            """
        ),
        {
            'id': item_id,
            'standard_code': _safe_text(review_row.get('standardCode')) or None,
            'standard_category_level3_id': _to_int(review_row.get('standardCategoryLevel3Id')) or None,
            'standard_std_name_id': _to_int(review_row.get('standardStdNameId')) or None,
            'standard_unit_id': _to_int(review_row.get('standardUnitId')) or None,
            'standard_attr_value_ids_json': review_row.get('standardAttrValueIdsJson') or '[]',
            'material_name': display_fields['materialName'],
            'specification': display_fields['specification'] or None,
            'unit_name': display_fields['unitName'] or None,
        },
    )


async def _insert_standard_item_from_review(db: AsyncSession, review_row: dict) -> int:
    display_fields = await _build_standard_item_display_fields(db, review_row)
    standard_code = _safe_text(review_row.get('standardCode')) or None
    params = {
        'standard_code': standard_code,
        'standard_category_level3_id': _to_int(review_row.get('standardCategoryLevel3Id')) or None,
        'standard_std_name_id': _to_int(review_row.get('standardStdNameId')) or None,
        'standard_unit_id': _to_int(review_row.get('standardUnitId')) or None,
        'standard_attr_value_ids_json': review_row.get('standardAttrValueIdsJson') or '[]',
        'material_name': display_fields['materialName'],
        'specification': display_fields['specification'] or None,
        'unit_name': display_fields['unitName'] or None,
    }
    # 使用原子 UPSERT 规避并发事务快照导致的“查不到已存在记录 -> 重复键异常”问题。
    # LAST_INSERT_ID(id) 可在插入/命中重复两种情况下都返回目标行 id。
    await db.execute(
        text(
            """
            INSERT INTO material_standard_item(
                standard_code, standard_category_level3_id, standard_std_name_id, standard_unit_id,
                standard_attr_value_ids_json, material_name, specification, unit_name
            ) VALUES(
                :standard_code, :standard_category_level3_id, :standard_std_name_id, :standard_unit_id,
                :standard_attr_value_ids_json, :material_name, :specification, :unit_name
            )
            ON DUPLICATE KEY UPDATE
                id = LAST_INSERT_ID(id),
                standard_category_level3_id = VALUES(standard_category_level3_id),
                standard_std_name_id = VALUES(standard_std_name_id),
                standard_unit_id = VALUES(standard_unit_id),
                standard_attr_value_ids_json = VALUES(standard_attr_value_ids_json),
                material_name = VALUES(material_name),
                specification = VALUES(specification),
                unit_name = VALUES(unit_name)
            """
        ),
        params,
    )
    row = await _fetch_one(db, "SELECT LAST_INSERT_ID() AS id")
    return _to_int(row.get('id')) if row else 0


async def _pick_latest_review_for_item(db: AsyncSession, item_id: int) -> dict | None:
    return await _fetch_one(
        db,
        """
        SELECT id,
               standard_item_id AS standardItemId,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               standard_code AS standardCode,
               standard_category_level3_id AS standardCategoryLevel3Id,
               standard_std_name_id AS standardStdNameId,
               standard_unit_id AS standardUnitId,
               standard_attr_value_ids_json AS standardAttrValueIdsJson
        FROM material_standard_review
        WHERE del_flag = '0'
          AND standard_item_id = :item_id
        ORDER BY COALESCE(update_time, create_time) DESC, id DESC
        LIMIT 1
        """,
        {'item_id': item_id},
    )


async def _cleanup_or_refresh_standard_item(db: AsyncSession, item_id: int | None) -> None:
    item_id = _to_int(item_id)
    if item_id <= 0:
        return
    linked_count = await _fetch_scalar(
        db,
        """
        SELECT COUNT(1)
        FROM material_standard_review
        WHERE del_flag = '0'
          AND standard_item_id = :item_id
        """,
        {'item_id': item_id},
    ) or 0
    if int(linked_count) <= 0:
        await db.execute(text("DELETE FROM material_standard_item WHERE id = :id"), {'id': item_id})
        return
    latest_review = await _pick_latest_review_for_item(db, item_id)
    if latest_review:
        await _update_standard_item_from_review(db, item_id, latest_review)


async def sync_standard_item_for_review(
    db: AsyncSession,
    review_id: int,
    *,
    previous_item_id: int | None = None,
) -> int | None:
    review_row = await _get_review_for_standard_item_sync(db, review_id)
    if not review_row:
        await _cleanup_or_refresh_standard_item(db, previous_item_id)
        return None

    previous_item_id = _to_int(previous_item_id or review_row.get('standardItemId'))
    current_code = _safe_text(review_row.get('standardCode'))
    active = review_row.get('delFlag') == '0' and current_code and _safe_text(review_row.get('standardizationStatus')) in (
        STANDARD_STATUS_SUCCESS,
        STANDARD_STATUS_SKIPPED,
        STANDARD_STATUS_MANUAL,
    )

    target_item_id = 0
    if active:
        existing_item = await _fetch_one(
            db,
            """
            SELECT id
            FROM material_standard_item
            WHERE standard_code = :standard_code
            LIMIT 1
            """,
            {'standard_code': current_code},
        )
        if existing_item:
            target_item_id = _to_int(existing_item.get('id'))
            await _update_standard_item_from_review(db, target_item_id, review_row)
        else:
            reusable_item_id = 0
            if previous_item_id > 0:
                other_count = await _fetch_scalar(
                    db,
                    """
                    SELECT COUNT(1)
                    FROM material_standard_review
                    WHERE del_flag = '0'
                      AND standard_item_id = :item_id
                      AND id <> :review_id
                    """,
                    {'item_id': previous_item_id, 'review_id': review_id},
                ) or 0
                if int(other_count) <= 0:
                    reusable_item_id = previous_item_id
            if reusable_item_id > 0:
                target_item_id = reusable_item_id
                await _update_standard_item_from_review(db, target_item_id, review_row)
            else:
                target_item_id = await _insert_standard_item_from_review(db, review_row)
        await db.execute(
            text("UPDATE material_standard_review SET standard_item_id = :item_id WHERE id = :id"),
            {'item_id': target_item_id or None, 'id': review_id},
        )
    else:
        await db.execute(
            text("UPDATE material_standard_review SET standard_item_id = NULL WHERE id = :id"),
            {'id': review_id},
        )

    if previous_item_id > 0 and previous_item_id != target_item_id:
        await _cleanup_or_refresh_standard_item(db, previous_item_id)
    if target_item_id > 0:
        await _cleanup_or_refresh_standard_item(db, target_item_id)
    return target_item_id or None


async def rebuild_standard_items(db: AsyncSession) -> None:
    await db.execute(text("UPDATE material_standard_review SET standard_item_id = NULL"))
    await db.execute(text("DELETE FROM material_standard_item"))
    rows = await _fetch_all(
        db,
        """
        SELECT id
        FROM material_standard_review
        WHERE del_flag = '0'
          AND COALESCE(standard_code, '') <> ''
          AND standardization_status IN ('SUCCESS', 'SKIPPED', 'MANUAL')
        ORDER BY id ASC
        """,
    )
    for row in rows:
        await sync_standard_item_for_review(db, _to_int(row.get('id')))


async def create_review_task_for_price(db: AsyncSession, price_record_id: int) -> int | None:
    process_segment_expr = "'' AS processSegmentName"
    if await _column_exists(db, 'material_price_record', 'process_segment_name'):
        process_segment_expr = 'process_segment_name AS processSegmentName'
    elif await _column_exists(db, 'material_price_record', 'original_process_segment'):
        process_segment_expr = 'original_process_segment AS processSegmentName'
    row = await _fetch_one(
        db,
        f"""
        SELECT id,
               material_name AS materialName,
               specification,
               {process_segment_expr},
               unit_name AS unitName,
               remark,
               price_excluding_tax AS priceExcludingTax,
               price_including_tax AS priceIncludingTax
        FROM material_price_record
        WHERE id = :id AND del_flag = '0'
        LIMIT 1
        """,
        {'id': price_record_id},
    )
    if not row:
        return None

    existing_by_raw = await _fetch_one(
        db,
        """
        SELECT id,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               standardization_status AS standardizationStatus,
               standard_category_level3_id AS standardCategoryLevel3Id,
               standard_std_name_id AS standardStdNameId,
               standard_unit_id AS standardUnitId,
               standard_segment_id AS standardSegmentId,
               standard_attr_value_ids_json AS standardAttrValueIdsJson,
               standard_code AS standardCode,
               conversion_factor AS conversionFactor,
               normalized_price_excluding_tax AS normalizedPriceExcludingTax,
               normalized_price_including_tax AS normalizedPriceIncludingTax,
               error_message AS errorMessage
        FROM material_standard_review
        WHERE del_flag = '0'
          AND material_name = :material_name
          AND specification = :specification
          AND unit_name = :unit_name
        ORDER BY id DESC
        LIMIT 1
        """,
        {
            'material_name': row['materialName'],
            'specification': row['specification'],
            'unit_name': row['unitName'],
        },
    )
    if existing_by_raw:
        result = _review_to_result(existing_by_raw)
        status = _safe_text(existing_by_raw.get('standardizationStatus')) or STANDARD_STATUS_PENDING
        error_message = _safe_text(existing_by_raw.get('errorMessage'))
        await _sync_related_price_records(
            db,
            review_id=_to_int(existing_by_raw['id']),
            material_name=row['materialName'],
            specification=row['specification'],
            unit_name=row['unitName'],
            result=result,
            status=status,
            error_message=error_message,
        )
        await _cleanup_unreferenced_review_rows(
            db,
            price_record_id=price_record_id,
            keep_review_id=_to_int(existing_by_raw['id']),
        )
        return _to_int(existing_by_raw['id'])

    review = await _fetch_one(
        db,
        """
        SELECT id
        FROM material_standard_review
        WHERE price_record_id = :price_record_id AND del_flag = '0'
        ORDER BY id DESC
        LIMIT 1
        """,
        {'price_record_id': price_record_id},
    )
    if review:
        await db.execute(
            text(
                """
                UPDATE material_standard_review
                SET material_name = :material_name,
                    specification = :specification,
                    unit_name = :unit_name,
                    remark = :remark,
                    process_segment_name = :process_segment_name,
                    original_process_segment = :original_process_segment,
                    raw_price_excluding_tax = :raw_price_excluding_tax,
                    raw_price_including_tax = :raw_price_including_tax,
                    standardization_status = :status,
                    error_message = NULL,
                    del_flag = '0'
                WHERE id = :id
                """
            ),
            {
                'id': review['id'],
                'material_name': row['materialName'],
                'specification': row['specification'],
                'unit_name': row['unitName'],
                'remark': row.get('remark'),
                'process_segment_name': row.get('processSegmentName') or '',
                'original_process_segment': row.get('processSegmentName') or '',
                'raw_price_excluding_tax': row.get('priceExcludingTax'),
                'raw_price_including_tax': row.get('priceIncludingTax'),
                'status': STANDARD_STATUS_PENDING,
            },
        )
        review_id = int(review['id'])
    else:
        await db.execute(
            text(
                """
                INSERT INTO material_standard_review(
                    price_record_id, material_name, specification, unit_name, remark,
                    process_segment_name, original_process_segment, raw_price_excluding_tax, raw_price_including_tax,
                    standardization_status, source_type, del_flag
                ) VALUES(
                    :price_record_id, :material_name, :specification, :unit_name, :remark,
                    :process_segment_name, :original_process_segment, :raw_price_excluding_tax, :raw_price_including_tax,
                    :status, :source_type, '0'
                )
                """
            ),
            {
                'price_record_id': price_record_id,
                'material_name': row['materialName'],
                'specification': row['specification'],
                'unit_name': row['unitName'],
                'remark': row.get('remark'),
                'process_segment_name': row.get('processSegmentName') or '',
                'original_process_segment': row.get('processSegmentName') or '',
                'raw_price_excluding_tax': row.get('priceExcludingTax'),
                'raw_price_including_tax': row.get('priceIncludingTax'),
                'status': STANDARD_STATUS_PENDING,
                'source_type': STANDARD_SOURCE_DIFY,
            },
        )
        review_id = int(await _fetch_scalar(db, "SELECT LAST_INSERT_ID()") or 0)

    await db.execute(
        text(
            """
            UPDATE material_price_record
            SET standardization_status = :status,
                standard_review_id = :review_id,
                standardization_error = NULL
            WHERE id = :id
            """
        ),
        {'status': STANDARD_STATUS_PENDING, 'review_id': review_id, 'id': price_record_id},
    )
    await _cleanup_unreferenced_review_rows(db, price_record_id=price_record_id, keep_review_id=review_id)
    return review_id


def enqueue_standardization(price_record_ids: list[int]) -> None:
    for record_id in price_record_ids:
        if record_id <= 0:
            continue
        task = asyncio.create_task(_run_background_standardization(record_id))
        _background_tasks.add(task)
        task.add_done_callback(_background_tasks.discard)


async def _run_background_standardization(price_record_id: int) -> None:
    async with _standardize_semaphore:
        async with AsyncSessionLocal() as db:
            try:
                await ensure_standardization_tables(db)
                await process_standardization(db, price_record_id)
                await db.commit()
            except Exception as exc:
                await db.rollback()
                logger.exception('材价标准化任务失败，price_record_id=%s', price_record_id)
                try:
                    await _mark_failed(db, price_record_id, str(exc))
                    await db.commit()
                except Exception:
                    await db.rollback()


async def _mark_failed(db: AsyncSession, price_record_id: int, error_message: str) -> None:
    friendly_error = _to_user_friendly_error(error_message)
    review = await _fetch_one(
        db,
        """
        SELECT id,
               material_name AS materialName,
               specification,
               unit_name AS unitName
        FROM material_standard_review
        WHERE price_record_id = :price_record_id AND del_flag = '0'
        ORDER BY id DESC
        LIMIT 1
        """,
        {'price_record_id': price_record_id},
    )
    if review:
        await db.execute(
            text(
                """
                UPDATE material_standard_review
                SET standardization_status = :status,
                    error_message = :error_message
                WHERE id = :id
                """
            ),
            {'status': STANDARD_STATUS_FAILED, 'error_message': friendly_error[:1000], 'id': review['id']},
        )
        await _sync_related_price_records(
            db,
            review_id=_to_int(review['id']),
            material_name=review['materialName'],
            specification=review['specification'],
            unit_name=review['unitName'],
            result={
                'standardCategoryLevel3Id': None,
                'standardStdNameId': None,
                'standardUnitId': None,
                'standardSegmentId': None,
                'standardAttrValueIds': [],
                'standardCode': '',
                'normalizedPriceExcludingTax': None,
                'normalizedPriceIncludingTax': None,
            },
            status=STANDARD_STATUS_FAILED,
            error_message=friendly_error,
        )
        return
    await db.execute(
        text(
            """
            UPDATE material_price_record
            SET standardization_status = :status,
                standardization_error = :error_message
            WHERE id = :id
            """
        ),
        {'status': STANDARD_STATUS_FAILED, 'error_message': friendly_error[:1000], 'id': price_record_id},
    )


def _load_dify_workflow_config() -> dict[str, str]:
    base_url = (_safe_text(os.getenv('MATERIAL_STANDARDIZE_DIFY_BASE_URL')) or 'http://192.168.1.42/v1').rstrip('/')
    api_key = _safe_text(os.getenv('MATERIAL_STANDARDIZE_DIFY_API_KEY')) or 'app-YQKXxR3EfOqHDZzLWnWlxqff'
    workflow_id = _safe_text(os.getenv('MATERIAL_STANDARDIZE_DIFY_WORKFLOW_ID')) or 'e7eccb3e-b1eb-410f-8421-1f78046d1d41'
    app_mode = (_safe_text(os.getenv('MATERIAL_STANDARDIZE_DIFY_APP_MODE')) or 'auto').lower()
    return {'base_url': base_url, 'api_key': api_key, 'workflow_id': workflow_id, 'app_mode': app_mode}


def _extract_dify_answer(payload: dict) -> str:
    candidates = [
        payload.get('data', {}).get('outputs', {}).get('answer'),
        payload.get('data', {}).get('answer'),
        payload.get('answer'),
        payload.get('outputs', {}).get('answer'),
    ]
    for item in candidates:
        if isinstance(item, str) and item.strip():
            return item.strip()
    return ''


def _request_dify(endpoint: str, body: dict, *, cfg: dict[str, str]) -> dict:
    req = urlrequest.Request(
        f"{cfg['base_url']}{endpoint}",
        data=json.dumps(body).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {cfg['api_key']}",
        },
        method='POST',
    )
    try:
        with urlrequest.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode('utf-8') or '{}')
    except urlerror.HTTPError as exc:
        detail = exc.read().decode('utf-8', errors='ignore')
        raise ValueError(f'HTTP {exc.code}，响应：{detail[:500]}') from exc
    except urlerror.URLError as exc:
        raise ValueError(f'连接失败：{exc.reason}') from exc


def _build_dify_request_candidates(query_payload: dict, user_tag: str, cfg: dict[str, str]) -> list[tuple[str, str, dict]]:
    query_text = _json_dumps(query_payload)
    candidates: list[tuple[str, str, dict]] = []
    if cfg.get('app_mode') in ('auto', 'chat', 'advanced-chat'):
        candidates.append(
            (
                'chat-messages',
                '/chat-messages',
                {
                    'inputs': {},
                    'query': query_text,
                    'response_mode': 'blocking',
                    'user': user_tag,
                },
            )
        )
    if cfg.get('app_mode') in ('auto', 'workflow'):
        candidates.append(
            (
                'workflow',
                '/workflows/run',
                {
                    'workflow_id': cfg['workflow_id'],
                    'inputs': {'sys.query': query_text},
                    'response_mode': 'blocking',
                    'user': user_tag,
                },
            )
        )
    if cfg.get('app_mode') in ('auto', 'completion'):
        candidates.append(
            (
                'completion-messages',
                '/completion-messages',
                {
                    'inputs': {},
                    'query': query_text,
                    'response_mode': 'blocking',
                    'user': user_tag,
                },
            )
        )
    return candidates


def _call_dify_workflow(query_payload: dict, user_tag: str) -> tuple[dict, str]:
    cfg = _load_dify_workflow_config()
    errors: list[str] = []
    for mode_name, endpoint, body in _build_dify_request_candidates(query_payload, user_tag, cfg):
        try:
            payload = _request_dify(endpoint, body, cfg=cfg)
            return payload, _extract_dify_answer(payload)
        except ValueError as exc:
            errors.append(f'{mode_name}: {exc}')
            continue
    raise ValueError(f"Dify 请求失败，已尝试模式：{' | '.join(errors)}")


def _parse_answer_json(answer_text: str) -> dict:
    if not answer_text:
        return {}
    text_value = answer_text.strip()
    try:
        parsed = json.loads(text_value)
        if isinstance(parsed, str):
            parsed = json.loads(parsed)
        return parsed if isinstance(parsed, dict) else {}
    except Exception as exc:
        raise ValueError(f'Dify answer 解析失败：{exc}') from exc


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


async def _resolve_level3_by_parent_level2(db: AsyncSession, level2_id: int | None) -> dict | None:
    if not level2_id:
        return None
    return await _fetch_one(
        db,
        """
        SELECT id,
               category_name AS categoryName,
               category_code AS categoryCode,
               parent_id AS parentId
        FROM material_category
        WHERE parent_id = :parent_id AND level = 3 AND status = '1'
        ORDER BY sort_order ASC, id ASC
        LIMIT 1
        """,
        {'parent_id': level2_id},
    )


async def _resolve_level3_by_linked_category(db: AsyncSession, linked_category_id: int | None) -> dict | None:
    linked_id = _to_int(linked_category_id)
    if linked_id <= 0:
        return None
    linked = await _fetch_one(
        db,
        """
        SELECT id,
               level,
               parent_id AS parentId
        FROM material_category
        WHERE id = :id AND status = '1'
        LIMIT 1
        """,
        {'id': linked_id},
    )
    if not linked:
        return None
    level = _to_int(linked.get('level'))
    if level == 3:
        return await _fetch_one(
            db,
            """
            SELECT id,
                   category_name AS categoryName,
                   category_code AS categoryCode,
                   parent_id AS parentId
            FROM material_category
            WHERE id = :id AND status = '1'
            LIMIT 1
            """,
            {'id': linked_id},
        )
    if level == 2:
        return await _resolve_level3_by_parent_level2(db, linked_id)
    if level == 1:
        level2 = await _fetch_one(
            db,
            """
            SELECT id
            FROM material_category
            WHERE parent_id = :parent_id AND level = 2 AND status = '1'
            ORDER BY sort_order ASC, id ASC
            LIMIT 1
            """,
            {'parent_id': linked_id},
        )
        return await _resolve_level3_by_parent_level2(db, _to_int(level2.get('id')) if level2 else None)
    return None


async def _resolve_category_by_level3_code(db: AsyncSession, level3_code: str) -> dict | None:
    if not level3_code:
        return None
    raw = ''.join(ch for ch in level3_code if ch.isdigit())
    if len(raw) < 8:
        return None
    code = raw[-8:]
    return await _fetch_one(
        db,
        """
        SELECT
            c3.id,
            c3.category_name AS categoryLevel3Name,
            c3.category_code AS level3Code,
            c2.id AS categoryLevel2Id,
            c2.category_code AS level2Code,
            c1.id AS categoryLevel1Id,
            c1.category_code AS level1Code
        FROM material_category c3
        JOIN material_category c2 ON c2.id = c3.parent_id
        JOIN material_category c1 ON c1.id = c2.parent_id
        WHERE c3.level = 3
          AND c3.status = '1'
          AND CONCAT(
                CASE WHEN c1.category_code REGEXP '^[0-9]+$' THEN LPAD(c1.category_code, 2, '0') ELSE RIGHT(c1.category_code, 2) END,
                CASE WHEN c2.category_code REGEXP '^[0-9]+$' THEN LPAD(c2.category_code, 2, '0') ELSE RIGHT(c2.category_code, 2) END,
                CASE WHEN c3.category_code REGEXP '^[0-9]+$' THEN LPAD(c3.category_code, 2, '0') ELSE RIGHT(c3.category_code, 2) END
              ) = :code_suffix
        LIMIT 1
        """,
        {'code_suffix': code[-6:]},
    )


async def _resolve_review_result(db: AsyncSession, parsed_answer: dict, price_row: dict) -> tuple[dict, list[str]]:
    errors: list[str] = []
    result = {
        'standardCategoryLevel3Id': None,
        'standardStdNameId': None,
        'standardUnitId': None,
        'standardSegmentId': None,
        'standardAttrValueIds': [],
        'standardCode': '',
        'conversionFactor': Decimal('1'),
        'normalizedPriceExcludingTax': None,
        'normalizedPriceIncludingTax': None,
        'sourceType': STANDARD_SOURCE_DIFY,
    }

    std_material_code = _safe_text(parsed_answer.get('标准材料ID'))
    category_code = _safe_text(parsed_answer.get('三级分类编码'))
    unit_match = parsed_answer.get('单位匹配') if isinstance(parsed_answer.get('单位匹配'), dict) else {}
    unit_biz_id = _safe_text(unit_match.get('单位ID'))
    segment_biz_id = _safe_text(parsed_answer.get('标准工艺段ID'))
    attr_list = parsed_answer.get('属性匹配') if isinstance(parsed_answer.get('属性匹配'), list) else []
    attr_codes = [_safe_text(item.get('属性值ID')) for item in attr_list if isinstance(item, dict)]

    factor = _to_decimal(unit_match.get('换算系数'), Decimal('1')) or Decimal('1')
    if factor <= Decimal('0'):
        factor = Decimal('1')
        errors.append('换算系数无效，已按1处理')
    result['conversionFactor'] = factor

    if std_material_code:
        std_name = await _fetch_one(
            db,
            """
            SELECT id,
                   category_level2_id AS linkedCategoryId
            FROM material_std_name
            WHERE std_name_code = :code AND del_flag = '0'
            LIMIT 1
            """,
            {'code': std_material_code},
        )
        if std_name:
            result['standardStdNameId'] = std_name['id']
            level3 = await _resolve_level3_by_linked_category(db, _to_int(std_name.get('linkedCategoryId')))
            if level3:
                result['standardCategoryLevel3Id'] = level3['id']
            else:
                errors.append(f'标准材料ID {std_material_code} 未找到可用三级分类')
        else:
            errors.append(f'标准材料ID {std_material_code} 未映射到标准材料名称')

    if not result['standardCategoryLevel3Id'] and category_code:
        category = await _resolve_category_by_level3_code(db, category_code)
        if category:
            result['standardCategoryLevel3Id'] = category['id']
        else:
            errors.append(f'三级分类编码 {category_code} 未映射到分类')

    if unit_biz_id:
        unit = await _fetch_one(
            db,
            """
            SELECT id
            FROM material_unit
            WHERE unit_biz_id = :biz_id
            LIMIT 1
            """,
            {'biz_id': unit_biz_id},
        )
        if unit:
            result['standardUnitId'] = unit['id']
        else:
            errors.append(f'单位ID {unit_biz_id} 未映射到单位')

    if segment_biz_id:
        segment = await _fetch_one(
            db,
            """
            SELECT id
            FROM material_process_segment
            WHERE segment_biz_id = :biz_id
            LIMIT 1
            """,
            {'biz_id': segment_biz_id},
        )
        if segment:
            result['standardSegmentId'] = segment['id']
        else:
            errors.append(f'标准工艺段ID {segment_biz_id} 未映射到工艺段')

    if attr_codes:
        attr_rows = await _fetch_all(
            db,
            """
            SELECT id, spec_value_code AS specValueCode
            FROM material_std_name_spec_value
            WHERE spec_value_code IN :codes AND del_flag = '0'
            """.replace("IN :codes", "IN (" + ",".join([f":code_{idx}" for idx in range(len(attr_codes))]) + ")"),
            {f'code_{idx}': code for idx, code in enumerate(attr_codes)},
        )
        attr_map = {row['specValueCode']: row['id'] for row in attr_rows}
        attr_ids: list[int] = []
        for code in attr_codes:
            attr_id = _to_int(attr_map.get(code))
            if attr_id > 0:
                attr_ids.append(attr_id)
            else:
                errors.append(f'属性值ID {code} 未映射到标准规格属性')
        result['standardAttrValueIds'] = _normalize_attr_ids(attr_ids)

    price_excl = _to_decimal(price_row.get('priceExcludingTax'))
    price_incl = _to_decimal(price_row.get('priceIncludingTax'))
    if price_excl is not None:
        result['normalizedPriceExcludingTax'] = _round2(price_excl / factor)
    if price_incl is not None:
        result['normalizedPriceIncludingTax'] = _round2(price_incl / factor)

    try:
        result['standardCode'] = await resolve_or_generate_standard_code(
            db,
            result['standardCategoryLevel3Id'],
            result['standardStdNameId'],
            result['standardUnitId'],
            result['standardAttrValueIds'],
            price_row.get('specification'),
        )
    except RuntimeError as exc:
        errors.append(_safe_text(exc) or '标准编码生成失败')
        result['standardCode'] = ''

    if not result['standardCode']:
        errors.append('标准编码为空')
    return result, errors


async def resolve_or_generate_standard_code(
    db: AsyncSession,
    category_level3_id: int | None,
    std_name_id: int | None,
    unit_id: int | None,
    attr_value_ids: list[int] | None,
    specification: Any = '',
) -> str:
    if not category_level3_id:
        return ''
    attr_ids = _normalize_attr_ids(attr_value_ids)
    attr_json = _json_dumps(attr_ids)
    signature = _build_standard_code_signature(category_level3_id, std_name_id, unit_id, attr_json, specification)

    category_row = await _fetch_one(
        db,
        """
        SELECT
            c1.category_code AS level1Code,
            c2.category_code AS level2Code,
            c3.category_code AS level3Code
        FROM material_category c3
        JOIN material_category c2 ON c2.id = c3.parent_id
        JOIN material_category c1 ON c1.id = c2.parent_id
        WHERE c3.id = :id
        LIMIT 1
        """,
        {'id': category_level3_id},
    )
    if not category_row:
        return ''
    prefix = _merge_category_code(category_row.get('level1Code'), category_row.get('level2Code'), category_row.get('level3Code'))
    if not prefix:
        return ''

    # 按分类前缀做数据库互斥，避免并发任务同时 MAX+1 导致重复流水号
    # 锁竞争是高并发下的正常现象，避免因短时竞争导致整条标准化任务失败。
    lock_name = f'material_std_code_{prefix}'
    lock_acquired = False
    async with AsyncSessionLocal() as alloc_db:
        conn = await alloc_db.connection()
        for attempt in range(3):
            try:
                locked = await conn.scalar(
                    text("SELECT GET_LOCK(:lock_name, :timeout_seconds)"),
                    {'lock_name': lock_name, 'timeout_seconds': 10},
                )
                if _to_int(locked, 0) != 1:
                    raise RuntimeError('标准编码生成失败：锁竞争超时，请稍后重试')
                lock_acquired = True
                break
            except RuntimeError:
                # 渐进退避，给并发任务释放锁时间。
                if attempt < 2:
                    await asyncio.sleep(0.35 * (attempt + 1))
                    continue
                logger.warning('标准编码锁竞争超时，编码生成失败，lock_name=%s', lock_name)
                raise RuntimeError('标准编码生成失败：锁竞争超时，请稍后重试')
        try:
            registry_result = await conn.execute(
                text(
                    """
                    SELECT standard_code AS standardCode
                    FROM material_standard_code_registry
                    WHERE signature = :signature
                    LIMIT 1
                    """
                ),
                {'signature': signature},
            )
            registry_row = registry_result.mappings().first()
            if registry_row and _safe_text(registry_row.get('standardCode')):
                return registry_row['standardCode']

            review_result = await conn.execute(
                text(
                    """
                    SELECT standard_code AS standardCode
                    FROM material_standard_review
                    WHERE del_flag = '0'
                      AND standard_code IS NOT NULL
                      AND standard_code <> ''
                      AND standard_category_level3_id = :category_level3_id
                      AND COALESCE(standard_std_name_id, 0) = :std_name_id
                      AND COALESCE(standard_unit_id, 0) = :unit_id
                      AND COALESCE(standard_attr_value_ids_json, '[]') = :attr_json
                    ORDER BY id DESC
                    LIMIT 1
                    """
                ),
                {
                    'category_level3_id': category_level3_id,
                    'std_name_id': _to_int(std_name_id),
                    'unit_id': _to_int(unit_id),
                    'attr_json': attr_json,
                },
            )
            review_row = review_result.mappings().first()
            existing_code = _safe_text(review_row.get('standardCode')) if review_row else ''
            if existing_code:
                await conn.execute(
                    text(
                        """
                        INSERT INTO material_standard_code_registry(
                            signature, code_prefix, serial_no, standard_code,
                            category_level3_id, standard_std_name_id, standard_unit_id, standard_attr_value_ids_json
                        ) VALUES(
                            :signature, :code_prefix, :serial_no, :standard_code,
                            :category_level3_id, :standard_std_name_id, :standard_unit_id, :standard_attr_value_ids_json
                        )
                        ON DUPLICATE KEY UPDATE
                            standard_code = VALUES(standard_code),
                            code_prefix = VALUES(code_prefix),
                            serial_no = VALUES(serial_no),
                            category_level3_id = VALUES(category_level3_id),
                            standard_std_name_id = VALUES(standard_std_name_id),
                            standard_unit_id = VALUES(standard_unit_id),
                            standard_attr_value_ids_json = VALUES(standard_attr_value_ids_json)
                        """
                    ),
                    {
                        'signature': signature,
                        'code_prefix': prefix,
                        'serial_no': _extract_standard_code_serial(existing_code, prefix),
                        'standard_code': existing_code,
                        'category_level3_id': _to_int(category_level3_id),
                        'standard_std_name_id': _to_int(std_name_id) or None,
                        'standard_unit_id': _to_int(unit_id) or None,
                        'standard_attr_value_ids_json': attr_json,
                    },
                )
                await conn.commit()
                return existing_code

            registry_max_no = await conn.scalar(
                text(
                    """
                    SELECT MAX(serial_no)
                    FROM material_standard_code_registry
                    WHERE code_prefix = :code_prefix
                    """
                ),
                {'code_prefix': prefix},
            )
            review_max_no = await conn.scalar(
                text(
                    """
                    SELECT MAX(CASE WHEN standard_code REGEXP '^[0-9]{11}$'
                                    THEN CAST(RIGHT(standard_code, 3) AS UNSIGNED)
                                    ELSE 0 END)
                    FROM material_standard_review
                    WHERE del_flag = '0'
                      AND standard_code LIKE :code_prefix
                    """
                ),
                {'code_prefix': f'{prefix}%'},
            )
            next_no = max(_to_int(registry_max_no) or 0, _to_int(review_max_no) or 0) + 1
            standard_code = f'{prefix}{next_no:03d}'
            await conn.execute(
                text(
                    """
                    INSERT INTO material_standard_code_registry(
                        signature, code_prefix, serial_no, standard_code,
                        category_level3_id, standard_std_name_id, standard_unit_id, standard_attr_value_ids_json
                    ) VALUES(
                        :signature, :code_prefix, :serial_no, :standard_code,
                        :category_level3_id, :standard_std_name_id, :standard_unit_id, :standard_attr_value_ids_json
                    )
                    """
                ),
                {
                    'signature': signature,
                    'code_prefix': prefix,
                    'serial_no': next_no,
                    'standard_code': standard_code,
                    'category_level3_id': _to_int(category_level3_id),
                    'standard_std_name_id': _to_int(std_name_id) or None,
                    'standard_unit_id': _to_int(unit_id) or None,
                    'standard_attr_value_ids_json': attr_json,
                },
            )
            await conn.commit()
            return standard_code
        except Exception:
            await conn.rollback()
            raise
        finally:
            if lock_acquired:
                try:
                    await conn.scalar(text("SELECT RELEASE_LOCK(:lock_name)"), {'lock_name': lock_name})
                except Exception:
                    logger.warning('释放MySQL锁失败，lock_name=%s', lock_name)


async def _copy_review_result_to_price(
    db: AsyncSession,
    price_record_id: int,
    review_id: int,
    result: dict,
    status: str,
    error_message: str = '',
) -> None:
    await db.execute(
        text(
            """
            UPDATE material_price_record
            SET standardization_status = :status,
                standard_review_id = :review_id,
                standard_code = :standard_code,
                standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_segment_id = :standard_segment_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                normalized_price_excluding_tax = :normalized_price_excluding_tax,
                normalized_price_including_tax = :normalized_price_including_tax,
                standardization_error = :standardization_error,
                standardized_at = :standardized_at
            WHERE id = :id
            """
        ),
        {
            'id': price_record_id,
            'status': status,
            'review_id': review_id,
            'standard_code': result.get('standardCode') or None,
            'standard_category_level3_id': result.get('standardCategoryLevel3Id'),
            'standard_std_name_id': result.get('standardStdNameId'),
            'standard_unit_id': result.get('standardUnitId'),
            'standard_segment_id': result.get('standardSegmentId'),
            'standard_attr_value_ids_json': _json_dumps(_normalize_attr_ids(result.get('standardAttrValueIds'))),
            'normalized_price_excluding_tax': str(result['normalizedPriceExcludingTax']) if result.get('normalizedPriceExcludingTax') is not None else None,
            'normalized_price_including_tax': str(result['normalizedPriceIncludingTax']) if result.get('normalizedPriceIncludingTax') is not None else None,
            'standardization_error': error_message[:1000] or None,
            'standardized_at': datetime.now(),
        },
    )


def _review_to_result(review_row: dict) -> dict:
    return {
        'standardCategoryLevel3Id': review_row.get('standardCategoryLevel3Id'),
        'standardStdNameId': review_row.get('standardStdNameId'),
        'standardUnitId': review_row.get('standardUnitId'),
        'standardSegmentId': review_row.get('standardSegmentId'),
        'standardAttrValueIds': json.loads(review_row.get('standardAttrValueIdsJson') or '[]'),
        'standardCode': review_row.get('standardCode') or '',
        'conversionFactor': _to_decimal(review_row.get('conversionFactor'), Decimal('1')) or Decimal('1'),
        'normalizedPriceExcludingTax': _to_decimal(review_row.get('normalizedPriceExcludingTax')),
        'normalizedPriceIncludingTax': _to_decimal(review_row.get('normalizedPriceIncludingTax')),
    }


async def _sync_related_price_records(
    db: AsyncSession,
    *,
    review_id: int,
    material_name: str,
    specification: str,
    unit_name: str,
    result: dict,
    status: str,
    error_message: str = '',
) -> None:
    factor = _to_decimal(result.get('conversionFactor'))
    use_factor = factor is not None and factor > Decimal('0')
    await db.execute(
        text(
            """
            UPDATE material_price_record
            SET standardization_status = :status,
                standard_review_id = :review_id,
                standard_code = :standard_code,
                standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_segment_id = :standard_segment_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                normalized_price_excluding_tax = CASE
                    WHEN :use_factor = 1 THEN CASE WHEN price_excluding_tax IS NULL THEN NULL ELSE ROUND(price_excluding_tax / :conversion_factor, 2) END
                    ELSE :normalized_price_excluding_tax
                END,
                normalized_price_including_tax = CASE
                    WHEN :use_factor = 1 THEN CASE WHEN price_including_tax IS NULL THEN NULL ELSE ROUND(price_including_tax / :conversion_factor, 2) END
                    ELSE :normalized_price_including_tax
                END,
                standardization_error = :standardization_error,
                standardized_at = :standardized_at
            WHERE del_flag = '0'
              AND material_name = :material_name
              AND specification = :specification
              AND unit_name = :unit_name
            """
        ),
        {
            'status': status,
            'review_id': review_id,
            'standard_code': result.get('standardCode') or None,
            'standard_category_level3_id': result.get('standardCategoryLevel3Id'),
            'standard_std_name_id': result.get('standardStdNameId'),
            'standard_unit_id': result.get('standardUnitId'),
            'standard_segment_id': result.get('standardSegmentId'),
            'standard_attr_value_ids_json': _json_dumps(_normalize_attr_ids(result.get('standardAttrValueIds'))),
            'use_factor': 1 if use_factor else 0,
            'conversion_factor': str(factor) if use_factor else None,
            'normalized_price_excluding_tax': str(result['normalizedPriceExcludingTax']) if result.get('normalizedPriceExcludingTax') is not None else None,
            'normalized_price_including_tax': str(result['normalizedPriceIncludingTax']) if result.get('normalizedPriceIncludingTax') is not None else None,
            'standardization_error': error_message[:1000] or None,
            'standardized_at': datetime.now(),
            'material_name': material_name,
            'specification': specification,
            'unit_name': unit_name,
        },
    )


async def _cleanup_unreferenced_review_rows(
    db: AsyncSession,
    *,
    price_record_id: int,
    keep_review_id: int | None = None,
) -> None:
    reviews = await _fetch_all(
        db,
        """
        SELECT id, standard_item_id AS standardItemId
        FROM material_standard_review
        WHERE price_record_id = :price_record_id
          AND del_flag = '0'
          AND (:keep_review_id IS NULL OR id <> :keep_review_id)
        """,
        {'price_record_id': price_record_id, 'keep_review_id': keep_review_id},
    )
    for review in reviews:
        linked = await _fetch_scalar(
            db,
            """
            SELECT COUNT(1)
            FROM material_price_record
            WHERE del_flag = '0'
              AND standard_review_id = :review_id
            """,
            {'review_id': review['id']},
        ) or 0
        if int(linked) > 0:
            continue
        await db.execute(
            text(
                """
                UPDATE material_standard_review
                SET del_flag = '1',
                    standard_item_id = NULL,
                    standardization_status = :status,
                    error_message = NULL
                WHERE id = :id
                """
            ),
            {'id': review['id'], 'status': STANDARD_STATUS_DELETED},
        )
        await _cleanup_or_refresh_standard_item(db, _to_int(review.get('standardItemId')))


async def _apply_existing_review_result(db: AsyncSession, review_id: int, existing_review: dict) -> None:
    result = {
        'standardCategoryLevel3Id': existing_review.get('standardCategoryLevel3Id'),
        'standardStdNameId': existing_review.get('standardStdNameId'),
        'standardUnitId': existing_review.get('standardUnitId'),
        'standardSegmentId': existing_review.get('standardSegmentId'),
        'standardAttrValueIds': json.loads(existing_review.get('standardAttrValueIdsJson') or '[]'),
        'standardCode': existing_review.get('standardCode') or '',
        'normalizedPriceExcludingTax': _to_decimal(existing_review.get('normalizedPriceExcludingTax')),
        'normalizedPriceIncludingTax': _to_decimal(existing_review.get('normalizedPriceIncludingTax')),
    }
    await db.execute(
        text(
            """
            UPDATE material_standard_review
            SET dify_request_json = :dify_request_json,
                dify_answer_text = :dify_answer_text,
                dify_result_json = :dify_result_json,
                standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_segment_id = :standard_segment_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                standard_code = :standard_code,
                conversion_factor = :conversion_factor,
                normalized_price_excluding_tax = :normalized_price_excluding_tax,
                normalized_price_including_tax = :normalized_price_including_tax,
                standardization_status = :status,
                source_type = :source_type,
                error_message = NULL,
                standardized_at = :standardized_at
            WHERE id = :id
            """
        ),
        {
            'id': review_id,
            'dify_request_json': existing_review.get('difyRequestJson'),
            'dify_answer_text': existing_review.get('difyAnswerText'),
            'dify_result_json': existing_review.get('difyResultJson'),
            'standard_category_level3_id': existing_review.get('standardCategoryLevel3Id'),
            'standard_std_name_id': existing_review.get('standardStdNameId'),
            'standard_unit_id': existing_review.get('standardUnitId'),
            'standard_segment_id': existing_review.get('standardSegmentId'),
            'standard_attr_value_ids_json': existing_review.get('standardAttrValueIdsJson') or '[]',
            'standard_code': existing_review.get('standardCode'),
            'conversion_factor': existing_review.get('conversionFactor') or 1,
            'normalized_price_excluding_tax': existing_review.get('normalizedPriceExcludingTax'),
            'normalized_price_including_tax': existing_review.get('normalizedPriceIncludingTax'),
            'status': STANDARD_STATUS_SKIPPED,
            'source_type': STANDARD_SOURCE_FALLBACK,
            'standardized_at': datetime.now(),
        },
    )
    await _copy_review_result_to_price(
        db,
        _to_int(existing_review.get('priceRecordId')),
        review_id,
        result,
        STANDARD_STATUS_SKIPPED,
    )


async def process_standardization(db: AsyncSession, price_record_id: int) -> None:
    review = await _fetch_one(
        db,
        """
        SELECT id,
               price_record_id AS priceRecordId,
               standard_item_id AS standardItemId,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               remark,
               original_process_segment AS originalProcessSegment
        FROM material_standard_review
        WHERE price_record_id = :price_record_id AND del_flag = '0'
        ORDER BY id DESC
        LIMIT 1
        """,
        {'price_record_id': price_record_id},
    )
    if not review:
        return
    previous_item_id = _to_int(review.get('standardItemId'))

    price_row = await _fetch_one(
        db,
        """
        SELECT id,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               remark,
               price_excluding_tax AS priceExcludingTax,
               price_including_tax AS priceIncludingTax
        FROM material_price_record
        WHERE id = :id AND del_flag = '0'
        LIMIT 1
        """,
        {'id': price_record_id},
    )
    if not price_row:
        return

    await db.execute(
        text("UPDATE material_standard_review SET standardization_status = :status, error_message = NULL WHERE id = :id"),
        {'status': STANDARD_STATUS_RUNNING, 'id': review['id']},
    )
    await db.execute(
        text("UPDATE material_price_record SET standardization_status = :status, standardization_error = NULL WHERE id = :id"),
        {'status': STANDARD_STATUS_RUNNING, 'id': price_record_id},
    )

    existing_review = await _fetch_one(
        db,
        """
        SELECT id,
               price_record_id AS priceRecordId,
               dify_request_json AS difyRequestJson,
               dify_answer_text AS difyAnswerText,
               dify_result_json AS difyResultJson,
               standard_category_level3_id AS standardCategoryLevel3Id,
               standard_std_name_id AS standardStdNameId,
               standard_unit_id AS standardUnitId,
               standard_segment_id AS standardSegmentId,
               standard_attr_value_ids_json AS standardAttrValueIdsJson,
               standard_code AS standardCode,
               conversion_factor AS conversionFactor,
               normalized_price_excluding_tax AS normalizedPriceExcludingTax,
               normalized_price_including_tax AS normalizedPriceIncludingTax
        FROM material_standard_review
        WHERE del_flag = '0'
          AND id <> :id
          AND material_name = :material_name
          AND specification = :specification
          AND unit_name = :unit_name
          AND COALESCE(standard_code, '') <> ''
          AND standardization_status IN ('SUCCESS', 'SKIPPED', 'MANUAL')
        ORDER BY id DESC
        LIMIT 1
        """,
        {
            'id': review['id'],
            'material_name': review['materialName'],
            'specification': review['specification'],
            'unit_name': review['unitName'],
        },
    )
    if existing_review:
        await db.execute(
            text(
                """
                UPDATE material_standard_review
                SET dify_request_json = :dify_request_json,
                    dify_answer_text = :dify_answer_text,
                    dify_result_json = :dify_result_json,
                    standard_category_level3_id = :standard_category_level3_id,
                    standard_std_name_id = :standard_std_name_id,
                    standard_unit_id = :standard_unit_id,
                    standard_segment_id = :standard_segment_id,
                    standard_attr_value_ids_json = :standard_attr_value_ids_json,
                    standard_code = :standard_code,
                    conversion_factor = :conversion_factor,
                    normalized_price_excluding_tax = :normalized_price_excluding_tax,
                    normalized_price_including_tax = :normalized_price_including_tax,
                    standardization_status = :status,
                    source_type = :source_type,
                    error_message = NULL,
                    standardized_at = :standardized_at
                WHERE id = :id
                """
            ),
            {
                'id': review['id'],
                'dify_request_json': existing_review.get('difyRequestJson'),
                'dify_answer_text': existing_review.get('difyAnswerText'),
                'dify_result_json': existing_review.get('difyResultJson'),
                'standard_category_level3_id': existing_review.get('standardCategoryLevel3Id'),
                'standard_std_name_id': existing_review.get('standardStdNameId'),
                'standard_unit_id': existing_review.get('standardUnitId'),
                'standard_segment_id': existing_review.get('standardSegmentId'),
                'standard_attr_value_ids_json': existing_review.get('standardAttrValueIdsJson') or '[]',
                'standard_code': existing_review.get('standardCode') or '',
                'conversion_factor': existing_review.get('conversionFactor') or 1,
                'normalized_price_excluding_tax': existing_review.get('normalizedPriceExcludingTax'),
                'normalized_price_including_tax': existing_review.get('normalizedPriceIncludingTax'),
                'status': STANDARD_STATUS_SKIPPED,
                'source_type': STANDARD_SOURCE_FALLBACK,
                'standardized_at': datetime.now(),
            },
        )
        await _sync_related_price_records(
            db,
            review_id=_to_int(review['id']),
            material_name=review['materialName'],
            specification=review['specification'],
            unit_name=review['unitName'],
            result=_review_to_result(existing_review),
            status=STANDARD_STATUS_SKIPPED,
        )
        await sync_standard_item_for_review(db, _to_int(review['id']), previous_item_id=previous_item_id)
        return

    query_payload = {
        '名称': review['materialName'],
        '规格': review['specification'],
        '单位': review['unitName'],
        '备注': _safe_text(review.get('remark')),
        '工艺段': _safe_text(review.get('originalProcessSegment')),
    }
    raw_response, answer_text = await asyncio.to_thread(
        _call_dify_workflow, query_payload, f'material-price-{price_record_id}'
    )
    parsed_answer = _parse_answer_json(answer_text)
    result, resolve_errors = await _resolve_review_result(db, parsed_answer, price_row)
    status = STANDARD_STATUS_SUCCESS if result.get('standardCode') else STANDARD_STATUS_FAILED
    error_message = None
    if status == STANDARD_STATUS_FAILED:
        error_message = _to_review_failed_message(resolve_errors)

    await db.execute(
        text(
            """
            UPDATE material_standard_review
            SET dify_request_json = :dify_request_json,
                dify_answer_text = :dify_answer_text,
                dify_result_json = :dify_result_json,
                standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_segment_id = :standard_segment_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                standard_code = :standard_code,
                conversion_factor = :conversion_factor,
                normalized_price_excluding_tax = :normalized_price_excluding_tax,
                normalized_price_including_tax = :normalized_price_including_tax,
                standardization_status = :status,
                source_type = :source_type,
                error_message = :error_message,
                standardized_at = :standardized_at
            WHERE id = :id
            """
        ),
        {
            'id': review['id'],
            'dify_request_json': _json_dumps(query_payload),
            'dify_answer_text': answer_text,
            'dify_result_json': _json_dumps(parsed_answer),
            'standard_category_level3_id': result.get('standardCategoryLevel3Id'),
            'standard_std_name_id': result.get('standardStdNameId'),
            'standard_unit_id': result.get('standardUnitId'),
            'standard_segment_id': result.get('standardSegmentId'),
            'standard_attr_value_ids_json': _json_dumps(_normalize_attr_ids(result.get('standardAttrValueIds'))),
            'standard_code': result.get('standardCode') or None,
            'conversion_factor': str(result.get('conversionFactor') or Decimal('1')),
            'normalized_price_excluding_tax': str(result['normalizedPriceExcludingTax']) if result.get('normalizedPriceExcludingTax') is not None else None,
            'normalized_price_including_tax': str(result['normalizedPriceIncludingTax']) if result.get('normalizedPriceIncludingTax') is not None else None,
            'status': status,
            'source_type': STANDARD_SOURCE_DIFY,
            'error_message': _safe_text(error_message)[:1000] or None,
            'standardized_at': datetime.now(),
        },
    )
    await _sync_related_price_records(
        db,
        review_id=_to_int(review['id']),
        material_name=review['materialName'],
        specification=review['specification'],
        unit_name=review['unitName'],
        result=result,
        status=status,
        error_message=_safe_text(error_message),
    )
    await sync_standard_item_for_review(db, _to_int(review['id']), previous_item_id=previous_item_id)


async def apply_review_result(
    db: AsyncSession,
    review_id: int,
    *,
    category_level3_id: int | None,
    standard_std_name_id: int | None,
    standard_unit_id: int | None,
    standard_segment_id: int | None,
    standard_attr_value_ids: list[int] | None,
    conversion_factor: Any,
    source_type: str = STANDARD_SOURCE_MANUAL,
) -> dict:
    review = await _fetch_one(
        db,
        """
        SELECT id,
               price_record_id AS priceRecordId,
               standard_item_id AS standardItemId,
               material_name AS materialName,
               specification,
               unit_name AS unitName,
               raw_price_excluding_tax AS rawPriceExcludingTax,
               raw_price_including_tax AS rawPriceIncludingTax
        FROM material_standard_review
        WHERE id = :id AND del_flag = '0'
        LIMIT 1
        """,
        {'id': review_id},
    )
    if not review:
        raise ValueError('标准化复核记录不存在')
    previous_item_id = _to_int(review.get('standardItemId'))

    factor = _to_decimal(conversion_factor, Decimal('1')) or Decimal('1')
    if factor <= 0:
        factor = Decimal('1')
    raw_price_excl = _to_decimal(review.get('rawPriceExcludingTax'))
    raw_price_incl = _to_decimal(review.get('rawPriceIncludingTax'))
    normalized_price_excl = _round2(raw_price_excl / factor) if raw_price_excl is not None else None
    normalized_price_incl = _round2(raw_price_incl / factor) if raw_price_incl is not None else None
    attr_ids = _normalize_attr_ids(standard_attr_value_ids)
    standard_code = await resolve_or_generate_standard_code(
        db,
        _to_int(category_level3_id),
        _to_int(standard_std_name_id),
        _to_int(standard_unit_id),
        attr_ids,
        review.get('specification'),
    )
    if not standard_code:
        raise ValueError('标准编码生成失败，请稍后重试')
    result = {
        'standardCategoryLevel3Id': _to_int(category_level3_id) or None,
        'standardStdNameId': _to_int(standard_std_name_id) or None,
        'standardUnitId': _to_int(standard_unit_id) or None,
        'standardSegmentId': _to_int(standard_segment_id) or None,
        'standardAttrValueIds': attr_ids,
        'standardCode': standard_code,
        'conversionFactor': factor,
        'normalizedPriceExcludingTax': normalized_price_excl,
        'normalizedPriceIncludingTax': normalized_price_incl,
    }
    await db.execute(
        text(
            """
            UPDATE material_standard_review
            SET standard_category_level3_id = :standard_category_level3_id,
                standard_std_name_id = :standard_std_name_id,
                standard_unit_id = :standard_unit_id,
                standard_segment_id = :standard_segment_id,
                standard_attr_value_ids_json = :standard_attr_value_ids_json,
                standard_code = :standard_code,
                conversion_factor = :conversion_factor,
                normalized_price_excluding_tax = :normalized_price_excluding_tax,
                normalized_price_including_tax = :normalized_price_including_tax,
                standardization_status = :status,
                source_type = :source_type,
                error_message = NULL,
                standardized_at = :standardized_at
            WHERE id = :id
            """
        ),
        {
            'id': review_id,
            'standard_category_level3_id': result['standardCategoryLevel3Id'],
            'standard_std_name_id': result['standardStdNameId'],
            'standard_unit_id': result['standardUnitId'],
            'standard_segment_id': result['standardSegmentId'],
            'standard_attr_value_ids_json': _json_dumps(attr_ids),
            'standard_code': standard_code or None,
            'conversion_factor': str(factor),
            'normalized_price_excluding_tax': str(normalized_price_excl) if normalized_price_excl is not None else None,
            'normalized_price_including_tax': str(normalized_price_incl) if normalized_price_incl is not None else None,
            'status': STANDARD_STATUS_MANUAL,
            'source_type': source_type,
            'standardized_at': datetime.now(),
        },
    )
    await _sync_related_price_records(
        db,
        review_id=review_id,
        material_name=review['materialName'],
        specification=review['specification'],
        unit_name=review['unitName'],
        result=result,
        status=STANDARD_STATUS_MANUAL,
    )
    await sync_standard_item_for_review(db, review_id, previous_item_id=previous_item_id)
    return result


async def clear_review_result(db: AsyncSession, review_id: int) -> None:
    review = await _fetch_one(
        db,
        """
        SELECT id, price_record_id AS priceRecordId, standard_item_id AS standardItemId
        FROM material_standard_review
        WHERE id = :id AND del_flag = '0'
        LIMIT 1
        """,
        {'id': review_id},
    )
    if not review:
        raise ValueError('标准化复核记录不存在')

    await db.execute(
        text(
            """
            UPDATE material_standard_review
            SET del_flag = '1',
                standard_item_id = NULL,
                standardization_status = :status,
                error_message = NULL
            WHERE id = :id
            """
        ),
        {'status': STANDARD_STATUS_DELETED, 'id': review_id},
    )
    await db.execute(
        text(
            """
            UPDATE material_price_record
            SET standardization_status = :status,
                standard_review_id = NULL,
                standard_code = NULL,
                standard_category_level3_id = NULL,
                standard_std_name_id = NULL,
                standard_unit_id = NULL,
                standard_segment_id = NULL,
                standard_attr_value_ids_json = NULL,
                normalized_price_excluding_tax = NULL,
                normalized_price_including_tax = NULL,
                standardization_error = NULL,
                standardized_at = NULL
            WHERE id = :id
            """
        ),
        {'status': STANDARD_STATUS_DELETED, 'id': review['priceRecordId']},
    )
    await _cleanup_or_refresh_standard_item(db, _to_int(review.get('standardItemId')))
