-- 为 sys_menu 表添加 route_name 字段
ALTER TABLE sys_menu ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' AFTER query;
