#!/bin/bash

echo "============================================================"
echo "MySQL Docker 容器启动脚本"
echo "============================================================"
echo ""

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "✗ Docker未安装"
    echo ""
    echo "请先安装Docker Desktop:"
    echo "https://www.docker.com/products/docker-desktop"
    exit 1
fi

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo "✗ Docker未运行"
    echo ""
    echo "请启动Docker Desktop应用"
    exit 1
fi

echo "✓ Docker已就绪"
echo ""

# 检查容器是否已存在
if docker ps -a --format '{{.Names}}' | grep -q "^mysql-ruoyi$"; then
    echo "发现已存在的MySQL容器"
    
    # 检查容器是否在运行
    if docker ps --format '{{.Names}}' | grep -q "^mysql-ruoyi$"; then
        echo "✓ MySQL容器已在运行"
    else
        echo "正在启动MySQL容器..."
        docker start mysql-ruoyi
        echo "✓ MySQL容器已启动"
    fi
else
    echo "创建新的MySQL容器..."
    docker run -d \
      --name mysql-ruoyi \
      -p 3306:3306 \
      -e MYSQL_ROOT_PASSWORD=mysqlroot \
      -e MYSQL_DATABASE=ruoyi-fastapi \
      mysql:8.0 \
      --character-set-server=utf8mb4 \
      --collation-server=utf8mb4_unicode_ci
    
    if [ $? -eq 0 ]; then
        echo "✓ MySQL容器创建成功"
        echo ""
        echo "等待MySQL初始化(约20秒)..."
        sleep 20
    else
        echo "✗ MySQL容器创建失败"
        exit 1
    fi
fi

echo ""
echo "检查MySQL容器状态..."

# 等待MySQL完全启动
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker exec mysql-ruoyi mysqladmin ping -uroot -pmysqlroot --silent &> /dev/null; then
        echo "✓ MySQL服务已就绪"
        break
    fi
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        echo "✗ MySQL启动超时"
        exit 1
    fi
    sleep 1
done

echo ""
echo "正在导入SQL文件..."

# 导入SQL文件
if [ -f "sql/ruoyi-fastapi.sql" ]; then
    docker exec -i mysql-ruoyi mysql -uroot -pmysqlroot ruoyi-fastapi < sql/ruoyi-fastapi.sql
    
    if [ $? -eq 0 ]; then
        echo "✓ SQL文件导入成功"
    else
        echo "✗ SQL文件导入失败"
        exit 1
    fi
else
    echo "✗ SQL文件不存在: sql/ruoyi-fastapi.sql"
    exit 1
fi

echo ""
echo "验证数据库表..."
table_count=$(docker exec mysql-ruoyi mysql -uroot -pmysqlroot -D ruoyi-fastapi -e "SHOW TABLES;" 2>/dev/null | wc -l)
table_count=$((table_count - 1))  # 减去表头

if [ $table_count -gt 0 ]; then
    echo "✓ 数据库包含 $table_count 个表"
else
    echo "✗ 数据库表验证失败"
    exit 1
fi

echo ""
echo "验证 route_name 字段..."
if docker exec mysql-ruoyi mysql -uroot -pmysqlroot -D ruoyi-fastapi -e "DESCRIBE sys_menu;" 2>/dev/null | grep -q "route_name"; then
    echo "✓ route_name 字段存在"
else
    echo "✗ route_name 字段不存在"
    exit 1
fi

echo ""
echo "============================================================"
echo "✓ MySQL数据库初始化完成!"
echo "============================================================"
echo ""
echo "数据库连接信息:"
echo "  主机: 127.0.0.1"
echo "  端口: 3306"
echo "  用户: root"
echo "  密码: mysqlroot"
echo "  数据库: ruoyi-fastapi"
echo ""
echo "Docker容器管理命令:"
echo "  启动: docker start mysql-ruoyi"
echo "  停止: docker stop mysql-ruoyi"
echo "  查看日志: docker logs mysql-ruoyi"
echo "  连接MySQL: docker exec -it mysql-ruoyi mysql -uroot -pmysqlroot"
echo ""
echo "下一步:"
echo "  1. 重启后端服务"
echo "  2. 使用账号 'admin' 密码 'admin123' 登录"
echo "============================================================"
