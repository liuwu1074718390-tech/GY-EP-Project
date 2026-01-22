# MySQL未安装 - 解决方案指南

## 问题诊断

经过检查,你的系统上**没有安装MySQL服务**,这就是为什么无法连接数据库的原因。

## 解决方案

你有以下几个选择:

---

## 方案A: 安装MySQL (推荐用于生产环境)

### 使用Homebrew安装MySQL

```bash
# 1. 安装MySQL
brew install mysql

# 2. 启动MySQL服务
brew services start mysql

# 3. 设置root密码
mysql_secure_installation
# 按提示设置密码为: mysqlroot

# 4. 测试连接
mysql -u root -p
# 输入密码: mysqlroot
```

### 手动下载安装

1. 访问 https://dev.mysql.com/downloads/mysql/
2. 下载Mac版本的MySQL
3. 安装后在系统偏好设置中启动MySQL
4. 设置root密码为 `mysqlroot`

---

## 方案B: 使用Docker运行MySQL (推荐用于开发)

### 1. 安装Docker Desktop

如果没有安装Docker,先安装:
- 访问 https://www.docker.com/products/docker-desktop
- 下载并安装Docker Desktop for Mac

### 2. 启动MySQL容器

```bash
# 创建并启动MySQL容器
docker run -d \
  --name mysql-ruoyi \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=mysqlroot \
  -e MYSQL_DATABASE=ruoyi-fastapi \
  mysql:8.0 \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci

# 等待MySQL启动(约10-20秒)
sleep 15

# 验证MySQL是否运行
docker ps | grep mysql-ruoyi
```

### 3. 初始化数据库

```bash
# 进入项目目录
cd "/Users/liuwu/Desktop/BOQ Comparison/前端+后端python+后端java/gz-python-dev"

# 导入SQL文件到Docker容器
docker exec -i mysql-ruoyi mysql -uroot -pmysqlroot ruoyi-fastapi < sql/ruoyi-fastapi.sql

# 验证导入
docker exec mysql-ruoyi mysql -uroot -pmysqlroot -e "USE \`ruoyi-fastapi\`; SHOW TABLES;"
```

### Docker常用命令

```bash
# 启动MySQL容器
docker start mysql-ruoyi

# 停止MySQL容器
docker stop mysql-ruoyi

# 查看MySQL日志
docker logs mysql-ruoyi

# 连接到MySQL
docker exec -it mysql-ruoyi mysql -uroot -pmysqlroot

# 删除容器(如果需要重新创建)
docker rm -f mysql-ruoyi
```

---

## 方案C: 使用PostgreSQL替代MySQL

如果你更喜欢PostgreSQL:

```bash
# 1. 安装PostgreSQL
brew install postgresql@14

# 2. 启动服务
brew services start postgresql@14

# 3. 创建数据库
createdb ruoyi-fastapi

# 4. 修改配置文件 .env.dev
# 将 DB_TYPE=mysql 改为 DB_TYPE=postgresql
# 将 DB_PORT=3306 改为 DB_PORT=5432

# 5. 导入PostgreSQL版本的SQL
psql ruoyi-fastapi < sql/ruoyi-fastapi-pg.sql
```

---

## 快速启动脚本 (使用Docker)

我已经为你准备了一个快速启动脚本,保存为 `start_mysql_docker.sh`:

```bash
#!/bin/bash

echo "正在启动MySQL Docker容器..."

# 检查容器是否已存在
if docker ps -a | grep -q mysql-ruoyi; then
    echo "容器已存在,正在启动..."
    docker start mysql-ruoyi
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
    
    echo "等待MySQL启动..."
    sleep 20
fi

# 检查MySQL是否运行
if docker ps | grep -q mysql-ruoyi; then
    echo "✓ MySQL容器运行中"
    
    # 导入SQL
    echo "正在导入SQL文件..."
    docker exec -i mysql-ruoyi mysql -uroot -pmysqlroot ruoyi-fastapi < sql/ruoyi-fastapi.sql
    
    echo "✓ 数据库初始化完成!"
    echo ""
    echo "数据库连接信息:"
    echo "  主机: 127.0.0.1"
    echo "  端口: 3306"
    echo "  用户: root"
    echo "  密码: mysqlroot"
    echo "  数据库: ruoyi-fastapi"
else
    echo "✗ MySQL容器启动失败"
    exit 1
fi
```

---

## 推荐方案

**对于开发环境,我强烈推荐使用方案B (Docker)**,因为:

1. ✅ 安装简单,不污染系统
2. ✅ 可以轻松启动/停止/删除
3. ✅ 版本隔离,不影响其他项目
4. ✅ 跨平台一致性

## 下一步

请选择一个方案并告诉我:
1. 你想使用哪个方案? (A/B/C)
2. 如果选择Docker,你是否已安装Docker Desktop?
3. 如果选择MySQL,你是否已安装Homebrew?

我会根据你的选择提供具体的执行步骤。
