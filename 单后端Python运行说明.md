# 单后端 Python 运行说明

## 目标架构

- 后端：仅 `gz-python-dev`（FastAPI，端口 `9099`）
- 前端：`gz-vue-base-dev`（Vite，开发代理 `/dev-api -> 9099`）
- 数据库：本地 MySQL `127.0.0.1:3306/GY-EP_local`
- Java：`gz-springboot-base-dev` 不再作为运行依赖

## 启动方式

在项目根目录执行：

```bash
./start_all.sh
```

该脚本会：

- 清理 `9099`、`9999` 端口占用
- 启动 Python 后端
- 启动 Vue 前端

## 联调校验

1. 访问前端开发地址，进入“材料标准”模块。
2. 切换“标准工艺段”Tab，确认不出现 `404`。
3. 校验接口路径 `/dev-api/material/standard/processSegment/page` 返回非 `404`（未登录场景通常为 `401`）。

## 数据库要求

- 统一使用库名：`GY-EP_local`
- Python 配置固定连接：`127.0.0.1:3306`
- 已执行的业务增量脚本需落在 `GY-EP_local`（包含标准工艺段相关表）
