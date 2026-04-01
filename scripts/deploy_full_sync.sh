#!/usr/bin/env bash

# 全量部署脚本：
# 1) 备份线上数据库
# 2) 本地数据库全量导出（表结构+字段+数据+触发器+存储过程+事件）
# 3) 覆盖导入线上数据库
# 4) 校验表字段与逐表行数
# 5) 打包代码给运维

set -euo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${1:-$BASE_DIR/.deploy.env}"
OUT_DIR="$BASE_DIR/runtime/deploy"
TS="$(date +%Y%m%d_%H%M%S)"

log() { printf '[%s] %s\n' "$(date '+%F %T')" "$*"; }
err() { printf '[%s] ERROR: %s\n' "$(date '+%F %T')" "$*" >&2; }

require_cmd() {
  for cmd in "$@"; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      err "缺少命令: $cmd"
      exit 1
    fi
  done
}

mysql_exec() {
  local host="$1" port="$2" user="$3" pass="$4" db="$5" sql="$6"
  MYSQL_PWD="$pass" mysql -h"$host" -P"$port" -u"$user" --default-character-set=utf8mb4 -N -B "$db" -e "$sql"
}

mysql_exec_no_db() {
  local host="$1" port="$2" user="$3" pass="$4" sql="$5"
  MYSQL_PWD="$pass" mysql -h"$host" -P"$port" -u"$user" --default-character-set=utf8mb4 -N -B -e "$sql"
}

dump_db() {
  local host="$1" port="$2" user="$3" pass="$4" db="$5" out_file="$6"
  MYSQL_PWD="$pass" mysqldump \
    -h"$host" -P"$port" -u"$user" \
    --default-character-set=utf8mb4 \
    --single-transaction \
    --triggers --routines --events \
    --hex-blob \
    --set-gtid-purged=OFF \
    --add-drop-table \
    --skip-lock-tables \
    "$db" > "$out_file"
}

schema_snapshot() {
  local host="$1" port="$2" user="$3" pass="$4" db="$5" out_file="$6"
  mysql_exec "$host" "$port" "$user" "$pass" "$db" \
    "SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, IFNULL(COLUMN_DEFAULT,'<NULL>'), EXTRA \
     FROM information_schema.COLUMNS \
     WHERE TABLE_SCHEMA='${db}' \
     ORDER BY TABLE_NAME, ORDINAL_POSITION;" > "$out_file"
}

table_list_snapshot() {
  local host="$1" port="$2" user="$3" pass="$4" db="$5" out_file="$6"
  mysql_exec "$host" "$port" "$user" "$pass" "$db" \
    "SELECT TABLE_NAME \
     FROM information_schema.TABLES \
     WHERE TABLE_SCHEMA='${db}' AND TABLE_TYPE='BASE TABLE' \
     ORDER BY TABLE_NAME;" > "$out_file"
}

row_count_snapshot() {
  local host="$1" port="$2" user="$3" pass="$4" db="$5" out_file="$6"
  : > "$out_file"
  while IFS= read -r table_name; do
    [ -z "$table_name" ] && continue
    count=$(mysql_exec "$host" "$port" "$user" "$pass" "$db" "SELECT COUNT(*) FROM \`${db}\`.\`${table_name}\`;")
    printf '%s\t%s\n' "$table_name" "$count" >> "$out_file"
  done < <(mysql_exec "$host" "$port" "$user" "$pass" "$db" \
    "SELECT TABLE_NAME \
     FROM information_schema.TABLES \
     WHERE TABLE_SCHEMA='${db}' AND TABLE_TYPE='BASE TABLE' \
     ORDER BY TABLE_NAME;")
}

if [ ! -f "$ENV_FILE" ]; then
  err "未找到配置文件: $ENV_FILE"
  err "请先复制 .deploy.env.example 为 .deploy.env 并填写参数"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

require_cmd mysql mysqldump sha256sum diff tar

: "${DEPLOY_CONFIRM:=NO}"
: "${ENABLE_PACKAGE:=1}"
: "${PROD_DB_CHARSET:=utf8mb4}"
: "${PROD_DB_COLLATION:=utf8mb4_general_ci}"

required_vars=(
  LOCAL_DB_HOST LOCAL_DB_PORT LOCAL_DB_USER LOCAL_DB_PASSWORD LOCAL_DB_NAME
  PROD_DB_HOST PROD_DB_PORT PROD_DB_USER PROD_DB_PASSWORD PROD_DB_NAME
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var:-}" ]; then
    err "变量未配置: $var"
    exit 1
  fi
done

if [ "$DEPLOY_CONFIRM" != "YES" ]; then
  err "安全确认未通过：请在配置文件中将 DEPLOY_CONFIRM=YES 后重试"
  exit 1
fi

if [ "$LOCAL_DB_HOST" = "$PROD_DB_HOST" ] && [ "$LOCAL_DB_PORT" = "$PROD_DB_PORT" ] && [ "$LOCAL_DB_NAME" = "$PROD_DB_NAME" ]; then
  err "本地库和线上库指向同一实例同一库，已阻止执行"
  exit 1
fi

mkdir -p "$OUT_DIR"

LOCAL_DUMP="$OUT_DIR/local_full_${LOCAL_DB_NAME}_${TS}.sql"
PROD_BACKUP="$OUT_DIR/prod_backup_${PROD_DB_NAME}_${TS}.sql"
SCHEMA_LOCAL="$OUT_DIR/schema_local_${TS}.tsv"
SCHEMA_PROD="$OUT_DIR/schema_prod_${TS}.tsv"
TABLE_LOCAL="$OUT_DIR/table_local_${TS}.txt"
TABLE_PROD="$OUT_DIR/table_prod_${TS}.txt"
ROWS_LOCAL="$OUT_DIR/rows_local_${TS}.tsv"
ROWS_PROD="$OUT_DIR/rows_prod_${TS}.tsv"
CODE_PKG="$OUT_DIR/GY-EP_Project_${TS}.tar.gz"

log "1/7 备份线上数据库: $PROD_DB_NAME"
dump_db "$PROD_DB_HOST" "$PROD_DB_PORT" "$PROD_DB_USER" "$PROD_DB_PASSWORD" "$PROD_DB_NAME" "$PROD_BACKUP"
log "线上备份完成: $PROD_BACKUP"

log "2/7 导出本地数据库(全量): $LOCAL_DB_NAME"
dump_db "$LOCAL_DB_HOST" "$LOCAL_DB_PORT" "$LOCAL_DB_USER" "$LOCAL_DB_PASSWORD" "$LOCAL_DB_NAME" "$LOCAL_DUMP"
log "本地导出完成: $LOCAL_DUMP"

log "3/7 覆盖重建线上数据库: $PROD_DB_NAME"
mysql_exec_no_db "$PROD_DB_HOST" "$PROD_DB_PORT" "$PROD_DB_USER" "$PROD_DB_PASSWORD" \
  "DROP DATABASE IF EXISTS \`${PROD_DB_NAME}\`; CREATE DATABASE \`${PROD_DB_NAME}\` CHARACTER SET ${PROD_DB_CHARSET} COLLATE ${PROD_DB_COLLATION};"
MYSQL_PWD="$PROD_DB_PASSWORD" mysql -h"$PROD_DB_HOST" -P"$PROD_DB_PORT" -u"$PROD_DB_USER" --default-character-set=utf8mb4 "$PROD_DB_NAME" < "$LOCAL_DUMP"
log "线上导入完成"

log "4/7 校验表清单一致性"
table_list_snapshot "$LOCAL_DB_HOST" "$LOCAL_DB_PORT" "$LOCAL_DB_USER" "$LOCAL_DB_PASSWORD" "$LOCAL_DB_NAME" "$TABLE_LOCAL"
table_list_snapshot "$PROD_DB_HOST" "$PROD_DB_PORT" "$PROD_DB_USER" "$PROD_DB_PASSWORD" "$PROD_DB_NAME" "$TABLE_PROD"
if ! diff -u "$TABLE_LOCAL" "$TABLE_PROD" >/dev/null; then
  err "表清单不一致，详情见:"
  err "  本地: $TABLE_LOCAL"
  err "  线上: $TABLE_PROD"
  exit 1
fi
log "表清单一致"

log "5/7 校验字段结构一致性"
schema_snapshot "$LOCAL_DB_HOST" "$LOCAL_DB_PORT" "$LOCAL_DB_USER" "$LOCAL_DB_PASSWORD" "$LOCAL_DB_NAME" "$SCHEMA_LOCAL"
schema_snapshot "$PROD_DB_HOST" "$PROD_DB_PORT" "$PROD_DB_USER" "$PROD_DB_PASSWORD" "$PROD_DB_NAME" "$SCHEMA_PROD"
local_schema_hash=$(sha256sum "$SCHEMA_LOCAL" | awk '{print $1}')
prod_schema_hash=$(sha256sum "$SCHEMA_PROD" | awk '{print $1}')
if [ "$local_schema_hash" != "$prod_schema_hash" ]; then
  err "字段结构不一致，详情见:"
  err "  本地: $SCHEMA_LOCAL"
  err "  线上: $SCHEMA_PROD"
  exit 1
fi
log "字段结构一致 (hash=$local_schema_hash)"

log "6/7 校验逐表行数一致性"
row_count_snapshot "$LOCAL_DB_HOST" "$LOCAL_DB_PORT" "$LOCAL_DB_USER" "$LOCAL_DB_PASSWORD" "$LOCAL_DB_NAME" "$ROWS_LOCAL"
row_count_snapshot "$PROD_DB_HOST" "$PROD_DB_PORT" "$PROD_DB_USER" "$PROD_DB_PASSWORD" "$PROD_DB_NAME" "$ROWS_PROD"
if ! diff -u "$ROWS_LOCAL" "$ROWS_PROD" >/dev/null; then
  err "逐表行数不一致，详情见:"
  err "  本地: $ROWS_LOCAL"
  err "  线上: $ROWS_PROD"
  exit 1
fi
log "逐表行数一致"

log "7/7 打包代码"
if [ "$ENABLE_PACKAGE" = "1" ]; then
  tar -czf "$CODE_PKG" \
    --exclude='.git' \
    --exclude='.agent' \
    --exclude='runtime' \
    --exclude='logs' \
    --exclude='**/.DS_Store' \
    --exclude='**/node_modules' \
    --exclude='**/venv' \
    --exclude='**/__pycache__' \
    --exclude='**/*.pid' \
    -C "$BASE_DIR" \
    gz-python-dev gz-vue-base-dev scripts start_all.sh \
    部署说明-极简版.md
  log "代码包已生成: $CODE_PKG"
else
  log "已跳过代码打包 (ENABLE_PACKAGE=$ENABLE_PACKAGE)"
fi

log "全量部署流程执行成功"
log "产物目录: $OUT_DIR"
log "关键文件:"
log "  线上备份: $PROD_BACKUP"
log "  本地全量SQL: $LOCAL_DUMP"
[ "$ENABLE_PACKAGE" = "1" ] && log "  代码包: $CODE_PKG"
