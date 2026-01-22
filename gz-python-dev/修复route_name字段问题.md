# 修复 route_name 字段缺失问题

## 问题描述
数据库表 `sys_menu` 缺少 `route_name` 字段,导致登录时出现以下错误:
```
(pymysql.err.OperationalError) (1054, "Unknown column 'sys_menu.route_name' in 'field list'")
```

## 解决方案

### 步骤1: 启动MySQL服务

首先确保MySQL服务正在运行。根据你的MySQL安装方式,选择以下方法之一:

#### 方法1: 如果MySQL是通过Homebrew安装的
```bash
brew services start mysql
# 或者
brew services start mysql@8.0  # 根据你的版本调整
```

#### 方法2: 如果MySQL是手动安装的
```bash
# 查找MySQL进程
ps aux | grep mysql

# 如果没有运行,启动MySQL
sudo /usr/local/mysql/support-files/mysql.server start
```

#### 方法3: 检查MySQL是否在运行
```bash
# 尝试连接MySQL
mysql -u root -p
# 输入密码: mysqlroot
```

### 步骤2: 添加缺失的字段

一旦MySQL服务运行,执行以下命令之一:

#### 选项A: 使用Python脚本(推荐)
```bash
cd /Users/liuwu/Desktop/BOQ\ Comparison/前端+后端python+后端java/gz-python-dev
python add_route_name_field.py
```

#### 选项B: 使用MySQL命令行
```bash
mysql -u root -pmysqlroot ruoyi-fastapi << EOF
ALTER TABLE sys_menu 
ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' 
AFTER query;
EOF
```

#### 选项C: 使用数据库管理工具
如果你使用Navicat、MySQL Workbench或其他数据库管理工具:

1. 连接到数据库 `ruoyi-fastapi`
2. 打开SQL编辑器
3. 执行以下SQL:
```sql
ALTER TABLE sys_menu 
ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' 
AFTER query;
```

### 步骤3: 重启后端服务

添加字段后,重启Python后端服务:

```bash
# 停止当前运行的服务(如果有)
# 然后重新启动
cd /Users/liuwu/Desktop/BOQ\ Comparison/前端+后端python+后端java/gz-python-dev
python app.py --env=dev
```

### 步骤4: 验证修复

1. 打开浏览器访问 http://localhost:80
2. 使用账号 `admin` 密码 `admin123` 登录
3. 如果能成功登录并看到菜单,说明问题已解决

## 备选方案: 重新初始化数据库

如果上述方法不起作用,或者你想要一个干净的数据库,可以重新初始化:

```bash
# 1. 删除旧数据库(谨慎操作!)
mysql -u root -pmysqlroot -e "DROP DATABASE IF EXISTS \`ruoyi-fastapi\`;"

# 2. 创建新数据库
mysql -u root -pmysqlroot -e "CREATE DATABASE \`ruoyi-fastapi\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. 导入SQL文件
mysql -u root -pmysqlroot ruoyi-fastapi < sql/ruoyi-fastapi.sql
```

## 常见问题

### Q: MySQL服务无法启动怎么办?
A: 检查MySQL是否已安装:
```bash
which mysql
mysql --version
```

如果没有安装,需要先安装MySQL。

### Q: 连接被拒绝 (Connection refused)
A: 这表示MySQL服务没有运行。请按照步骤1启动MySQL服务。

### Q: 密码错误
A: 检查 `.env.dev` 文件中的数据库密码配置是否正确。

## 相关文件

- SQL脚本: `add_route_name_column.sql`
- Python脚本: `add_route_name_field.py`
- 完整SQL文件: `sql/ruoyi-fastapi.sql`
