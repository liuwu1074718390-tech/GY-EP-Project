#!/bin/bash

# =================================================================
# 项目统一启动脚本 (MacOS/Linux)
# 功能：清理端口占用并启动 Python后端、Vue前端（统一Python后端）
# =================================================================

set -e

# 配置端口
PYTHON_PORT=9099
VUE_PORT=9999

# 本地数据库配置（用于启动前最小化结构自检）
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=mysqlroot
DB_NAME=GY-EP_local

# 配置路径 (基于脚本所在目录)
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_DIR="$BASE_DIR/gz-python-dev"
VUE_DIR="$BASE_DIR/gz-vue-base-dev"
MATERIAL_STD_INIT_SQL="$BASE_DIR/gz-springboot-base-dev/sql/material_standard_init.sql"
MATERIAL_PROCESS_SEGMENT_SQL="$BASE_DIR/gz-springboot-base-dev/sql/material_process_segment_upgrade_20260330.sql"
PYTHON_BIN=""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始执行启动流程...${NC}"

if ! command -v lsof >/dev/null 2>&1; then
    echo -e "${RED}未找到 lsof 命令，请先安装后再执行。${NC}"
    exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
    echo -e "${RED}未找到 pnpm 命令，请先安装后再执行。${NC}"
    exit 1
fi

if ! command -v mysql >/dev/null 2>&1; then
    echo -e "${RED}未找到 mysql 客户端命令，请先安装后再执行。${NC}"
    exit 1
fi

if [ ! -d "$PYTHON_DIR" ] || [ ! -d "$VUE_DIR" ]; then
    echo -e "${RED}目录不存在，请在项目根目录运行脚本。${NC}"
    exit 1
fi

# 解析Python解释器：优先项目venv，其次python3.11，再次python3
if [ -x "$PYTHON_DIR/venv/bin/python" ]; then
    PYTHON_BIN="$PYTHON_DIR/venv/bin/python"
elif command -v python3.11 >/dev/null 2>&1; then
    PYTHON_BIN="$(command -v python3.11)"
elif command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="$(command -v python3)"
else
    echo -e "${RED}未找到可用的Python解释器，请先安装python3.11+。${NC}"
    exit 1
fi

# 1. 清理端口函数
kill_port() {
    local port=$1
    local name=$2
    local pids
    pids=$(lsof -tiTCP:$port -sTCP:LISTEN -n -P 2>/dev/null || true)

    if [ -n "$pids" ]; then
        echo -e "${YELLOW}检测到端口 $port ($name) 被监听，占用进程: $pids${NC}"
        echo -e "${YELLOW}先尝试优雅停止...${NC}"
        kill $pids 2>/dev/null || true
        sleep 1

        local remain
        remain=$(lsof -tiTCP:$port -sTCP:LISTEN -n -P 2>/dev/null || true)
        if [ -n "$remain" ]; then
            echo -e "${YELLOW}端口 $port 仍被占用，强制终止: $remain${NC}"
            kill -9 $remain 2>/dev/null || true
            sleep 1
        fi

        if lsof -tiTCP:$port -sTCP:LISTEN -n -P >/dev/null 2>&1; then
            echo -e "${RED}端口 $port 清理失败，请手动处理后重试。${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}端口 $port ($name) 未被占用。${NC}"
    fi
}

echo -e "${GREEN}正在检查并清理端口占用...${NC}"
kill_port $PYTHON_PORT "Python/FastAPI"
kill_port $VUE_PORT "Vue/Vite"

# 1.1 数据库字段自检（避免登录时报 Unknown column: sys_menu.route_name）
echo -e "${GREEN}正在检查数据库关键字段...${NC}"
route_name_exists=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -N -B -D "$DB_NAME" -e \
"SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='${DB_NAME}' AND TABLE_NAME='sys_menu' AND COLUMN_NAME='route_name';" 2>/dev/null || echo "0")
if [ "$route_name_exists" = "0" ]; then
    echo -e "${YELLOW}检测到缺失字段 sys_menu.route_name，正在自动补齐...${NC}"
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -e \
    "ALTER TABLE sys_menu ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' AFTER query;"
    echo -e "${GREEN}字段补齐完成：sys_menu.route_name${NC}"
else
    echo -e "${GREEN}数据库字段检查通过。${NC}"
fi

# 1.2 材价标准表自检（避免查询时报 material_category 不存在）
material_std_table_count=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -N -B -D "$DB_NAME" -e \
"SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA='${DB_NAME}' AND TABLE_NAME IN ('material_category','material_specification','material_unit','material_standard');" 2>/dev/null || echo "0")
if [ "$material_std_table_count" = "0" ]; then
    if [ -f "$MATERIAL_STD_INIT_SQL" ]; then
        echo -e "${YELLOW}检测到材价标准表缺失，正在初始化材价基础表...${NC}"
        cat "$MATERIAL_STD_INIT_SQL" | mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -D "$DB_NAME"
        echo -e "${GREEN}材价基础表初始化完成。${NC}"
    else
        echo -e "${RED}缺少初始化脚本：$MATERIAL_STD_INIT_SQL${NC}"
        exit 1
    fi
elif [ "$material_std_table_count" -lt "4" ]; then
    echo -e "${RED}检测到材价标准表仅部分存在（${material_std_table_count}/4），为避免误删数据，已停止自动初始化。${NC}"
    echo -e "${RED}请先备份后人工执行补表。${NC}"
    exit 1
fi

# 1.3 标准工艺段表自检（避免查询时报 material_process_segment 不存在）
process_segment_exists=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -N -B -D "$DB_NAME" -e \
"SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA='${DB_NAME}' AND TABLE_NAME='material_process_segment';" 2>/dev/null || echo "0")
if [ "$process_segment_exists" = "0" ]; then
    if [ -f "$MATERIAL_PROCESS_SEGMENT_SQL" ]; then
        echo -e "${YELLOW}检测到缺失表 material_process_segment，正在初始化标准工艺段...${NC}"
        cat "$MATERIAL_PROCESS_SEGMENT_SQL" | mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -D "$DB_NAME"
        echo -e "${GREEN}标准工艺段初始化完成。${NC}"
    else
        echo -e "${RED}缺少初始化脚本：$MATERIAL_PROCESS_SEGMENT_SQL${NC}"
        exit 1
    fi
fi

# 2. 启动 Python 后端
echo -e "${GREEN}正在后台启动 Python 后端 (端口 $PYTHON_PORT)...${NC}"
cd "$PYTHON_DIR"
APP_RELOAD=false nohup "$PYTHON_BIN" app.py > python_server.log 2>&1 &
echo -e "${GREEN}Python 后端已启动，日志查看: $PYTHON_DIR/python_server.log${NC}"

# 3. 启动 Vue 前端
echo -e "${GREEN}正在启动 Vue 前端 (端口 $VUE_PORT)...${NC}"
cd "$VUE_DIR"
pnpm run dev
