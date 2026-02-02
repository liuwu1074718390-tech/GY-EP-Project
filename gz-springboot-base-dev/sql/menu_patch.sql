-- =================================================================
-- 广业材价项目 - 菜单自动初始化脚本 (SQL 补丁)
-- 说明：本脚本会自动检测菜单是否存在，如不存在则创建，确保部署稳定性。
-- =================================================================

-- 1. 确保供应商管理主菜单存在
INSERT INTO `sys_menu` (`menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `remark`)
SELECT '供应商管理', '0', '4', 'supplier', 'Layout', 1, 0, 'M', '0', '0', NULL, 'user', 'admin', '新增供应商管理目录'
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE menu_name = '供应商管理' AND parent_id = 0);

-- 获取刚才创建或已存在的“供应商管理”目录ID
SET @parent_id = (SELECT menu_id FROM `sys_menu` WHERE menu_name = '供应商管理' AND parent_id = 0 ORDER BY menu_id DESC LIMIT 1);

-- 2. 插入“供应商查询”子菜单
INSERT INTO `sys_menu` (`menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `remark`)
SELECT '供应商查询', @parent_id, '1', 'query', 'system/SupplierQuery', 1, 0, 'C', '0', '0', 'system:supplier:list', 'search', 'admin', '供应商查询页面'
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE menu_name = '供应商查询' AND parent_id = @parent_id);

-- 3. 插入“材料标准”菜单（如果之前没在库里的话）
INSERT INTO `sys_menu` (`menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `remark`)
SELECT '材料标准', '0', '5', 'material-standard', 'Layout', 1, 0, 'M', '0', '0', NULL, 'shopping', 'admin', '材料标准主目录'
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE menu_name = '材料标准' AND parent_id = 0);

SET @mat_parent_id = (SELECT menu_id FROM `sys_menu` WHERE menu_name = '材料标准' AND parent_id = 0 ORDER BY menu_id DESC LIMIT 1);

INSERT INTO `sys_menu` (`menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `remark`)
SELECT '标准维护', @mat_parent_id, '1', 'standard', 'system/MaterialStandard', 1, 0, 'C', '0', '0', 'system:material:list', 'edit', 'admin', '材料标准维护页面'
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE menu_name = '标准维护' AND parent_id = @mat_parent_id);

-- 4. 强制更新首页驾驶舱指向
UPDATE `sys_menu` 
SET `component` = 'dashboard/MaterialDashboard', `menu_name` = '驾驶舱'
WHERE `path` = 'index' AND `parent_id` = 0;
