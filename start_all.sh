#!/bin/bash

# =================================================================
# 项目统一启动脚本 (MacOS/Linux)
# 功能：清理端口占用并启动 Python后端、Java后端、Vue前端
# =================================================================

# 配置端口
PYTHON_PORT=9099
JAVA_PORT=9081
VUE_PORT=9999

# 配置路径 (基于脚本所在目录)
BASE_DIR=$(pwd)
PYTHON_DIR="$BASE_DIR/gz-python-dev"
JAVA_DIR="$BASE_DIR/gz-springboot-base-dev"
VUE_DIR="$BASE_DIR/gz-vue-base-dev"
RUNTIME_DIR="$BASE_DIR/runtime"
JAVA_BUILD_JAR="$JAVA_DIR/gz-server/target/gz-server.jar"
JAVA_RUNTIME_JAR="$RUNTIME_DIR/gz-server-current.jar"

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始执行启动流程...${NC}"

# 1. 清理端口函数
kill_port() {
    local port=$1
    local name=$2
    local pid=$(lsof -t -i:$port)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}检测到端口 $port ($name) 被占用 (PID: $pid)，正在清理...${NC}"
        kill -9 $pid
        sleep 1
    fi
}

echo -e "${GREEN}正在检查并清理端口占用...${NC}"
kill_port $PYTHON_PORT "Python/FastAPI"
kill_port $JAVA_PORT "Java/SpringBot"
kill_port $VUE_PORT "Vue/Vite"

# 补充：清理历史 Java 运行进程（避免旧包残留）
OLD_JAVA_PIDS=$(pgrep -f "gz-server.jar|gz-server-current.jar")
if [ -n "$OLD_JAVA_PIDS" ]; then
    echo -e "${YELLOW}检测到历史 Java 进程，正在清理: $OLD_JAVA_PIDS${NC}"
    kill -9 $OLD_JAVA_PIDS 2>/dev/null
    sleep 1
fi

# 2. 检查 Java 环境 (使用发现的 Java 17)
export JAVA_HOME="/opt/homebrew/opt/openjdk@17"
if [ ! -d "$JAVA_HOME" ]; then
    # 如果不可用，尝试默认系统路径
    JAVA_HOME=$(/usr/libexec/java_home -v 17 2>/dev/null)
fi
echo -e "${GREEN}使用 JAVA_HOME: $JAVA_HOME${NC}"

# 3. 启动 Python 后端
echo -e "${GREEN}正在后台启动 Python 后端 (端口 $PYTHON_PORT)...${NC}"
cd "$PYTHON_DIR"
source venv/bin/activate
nohup python3 app.py > python_server.log 2>&1 &
echo -e "${GREEN}Python 后端已启动，日志查看: $PYTHON_DIR/python_server.log${NC}"

# 4. 启动 Java 后端
echo -e "${GREEN}正在后台启动 Java 后端 (端口 $JAVA_PORT)...${NC}"
cd "$JAVA_DIR"
# 关键：先通过 reactor 构建依赖模块（含 gz-biz），再以 fat-jar 启动，确保运行代码与当前工作区一致
echo -e "${GREEN}正在构建 Java 模块（gz-server + 依赖模块）...${NC}"
mvn -pl gz-server -am -DskipTests package > java_build.log 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}Java 模块构建失败，请查看: $JAVA_DIR/java_build.log${NC}"
    exit 1
fi

# 单包策略：仅发布并运行 runtime/gz-server-current.jar
mkdir -p "$RUNTIME_DIR"
cp -f "$JAVA_BUILD_JAR" "$JAVA_RUNTIME_JAR"
JAR_SHA=$(shasum -a 256 "$JAVA_RUNTIME_JAR" | awk '{print $1}')
echo -e "${GREEN}当前唯一运行包: $JAVA_RUNTIME_JAR${NC}"
echo -e "${GREEN}包 SHA256: $JAR_SHA${NC}"

nohup java -jar "$JAVA_RUNTIME_JAR" --spring.profiles.active=dev > java_server.log 2>&1 &
echo -e "${GREEN}Java 后端已启动，日志查看: $JAVA_DIR/java_server.log（构建日志: $JAVA_DIR/java_build.log）${NC}"

# 5. 启动 Vue 前端
echo -e "${GREEN}正在启动 Vue 前端 (端口 $VUE_PORT)...${NC}"
cd "$VUE_DIR"
# 前端通常在终端前台运行或打开新窗口，这里建议在当前终端运行，或者你也想放后台？
# 为了方便用户看到输出，我们最后一步启动前端
pnpm run dev
