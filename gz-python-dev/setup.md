# 进入后端目录

cd ruoyi-fastapi-backend

# 如果使用的是 MySQL 数据库，请执行以下命令安装项目依赖环境

pip3 install -r requirements.txt

# 如果使用的是 PostgreSQL 数据库，请执行以下命令安装项目依赖环境

pip3 install -r requirements-pg.txt

# 配置环境

在.env.dev 文件中配置开发环境的数据库和 redis

# 运行 sql 文件

1.新建数据库 ruoyi-fastapi(默认，可修改) 2.如果使用的是 MySQL 数据库，使用命令或数据库连接工具运行 sql 文件夹下的 ruoyi-fastapi.sql；如果使用的是 PostgreSQL 数据库，使用命令或数据库连接工具运行 sql 文件夹下的 ruoyi-fastapi-pg.sql

# 运行后端

uvicorn server:app --host 0.0.0.0 --port 9099 --reload
