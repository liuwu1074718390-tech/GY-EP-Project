-- =============================================
-- 材料标准管理系统 - 数据库表结构
-- 广业环保企业材料标准管理
-- 创建时间: 2026-01-22
-- =============================================

-- ----------------------------
-- 1. 材料分类表（三级树形结构）
-- ----------------------------
DROP TABLE IF EXISTS material_category;
CREATE TABLE material_category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  category_code VARCHAR(2) NOT NULL COMMENT '分类编码（2位，如01）',
  category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
  parent_id BIGINT DEFAULT 0 COMMENT '父级ID（0表示顶级）',
  level INT NOT NULL COMMENT '分类层级（1/2/3）',
  sort_order INT DEFAULT 0 COMMENT '排序序号',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_code_parent (category_code, parent_id),
  KEY idx_parent_id (parent_id),
  KEY idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='材料分类表';

-- ----------------------------
-- 2. 材料规格型号表
-- ----------------------------
DROP TABLE IF EXISTS material_specification;
CREATE TABLE material_specification (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  spec_code VARCHAR(3) NOT NULL UNIQUE COMMENT '规格编码（3位，如001）',
  spec_name VARCHAR(100) NOT NULL COMMENT '规格名称（如φ6）',
  description VARCHAR(255) COMMENT '规格描述',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='材料规格表';

-- ----------------------------
-- 3. 材料计量单位表
-- ----------------------------
DROP TABLE IF EXISTS material_unit;
CREATE TABLE material_unit (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  unit_code VARCHAR(2) NOT NULL UNIQUE COMMENT '单位编码（2位，如01）',
  unit_name VARCHAR(20) NOT NULL COMMENT '单位名称（如t、kg）',
  unit_symbol VARCHAR(10) COMMENT '单位符号',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='材料单位表';

-- ----------------------------
-- 4. 材料标准主表
-- ----------------------------
DROP TABLE IF EXISTS material_standard;
CREATE TABLE material_standard (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  material_code VARCHAR(11) NOT NULL UNIQUE COMMENT '材料编码（11位，如01010100101）',
  material_name VARCHAR(200) NOT NULL COMMENT '材料名称',
  category_level1_id BIGINT NOT NULL COMMENT '一级分类ID',
  category_level2_id BIGINT NOT NULL COMMENT '二级分类ID',
  category_level3_id BIGINT NOT NULL COMMENT '三级分类ID',
  spec_id BIGINT NOT NULL COMMENT '规格ID',
  unit_id BIGINT NOT NULL COMMENT '单位ID',
  remark VARCHAR(500) COMMENT '备注',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_by VARCHAR(64) COMMENT '创建者',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_by VARCHAR(64) COMMENT '更新者',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  KEY idx_material_code (material_code),
  KEY idx_category_level1 (category_level1_id),
  KEY idx_category_level2 (category_level2_id),
  KEY idx_category_level3 (category_level3_id),
  KEY idx_spec (spec_id),
  KEY idx_unit (unit_id),
  KEY idx_status (status),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='材料标准表';

-- =============================================
-- 初始化基础数据
-- =============================================

-- ----------------------------
-- 插入示例分类数据（三级）
-- ----------------------------
-- 一级分类
INSERT INTO material_category (id, category_code, category_name, parent_id, level, sort_order) VALUES
(1, '01', '黑色及有色金属', 0, 1, 1),
(2, '02', '水泥及混凝土', 0, 1, 2),
(3, '03', '管材管件', 0, 1, 3);

-- 二级分类（黑色及有色金属）
INSERT INTO material_category (id, category_code, category_name, parent_id, level, sort_order) VALUES
(101, '01', '钢筋', 1, 2, 1),
(102, '02', '钢板', 1, 2, 2),
(103, '03', '型钢', 1, 2, 3);

-- 三级分类（钢筋）
INSERT INTO material_category (id, category_code, category_name, parent_id, level, sort_order) VALUES
(10101, '01', '热轧圆盘条', 101, 3, 1),
(10102, '02', '热轧带肋钢筋', 101, 3, 2),
(10103, '03', '冷轧带肋钢筋', 101, 3, 3);

-- ----------------------------
-- 插入示例规格数据
-- ----------------------------
INSERT INTO material_specification (spec_code, spec_name, description) VALUES
('001', 'φ6', '直径6mm圆钢'),
('002', 'φ8', '直径8mm圆钢'),
('003', 'φ10', '直径10mm圆钢'),
('004', 'φ12', '直径12mm圆钢'),
('005', 'φ14', '直径14mm圆钢'),
('006', 'φ16', '直径16mm圆钢'),
('007', 'φ18', '直径18mm圆钢'),
('008', 'φ20', '直径20mm圆钢'),
('009', 'φ22', '直径22mm圆钢'),
('010', 'φ25', '直径25mm圆钢');

-- ----------------------------
-- 插入示例单位数据
-- ----------------------------
INSERT INTO material_unit (unit_code, unit_name, unit_symbol) VALUES
('01', '吨', 't'),
('02', '千克', 'kg'),
('03', '米', 'm'),
('04', '立方米', 'm³'),
('05', '平方米', 'm²'),
('06', '根', '根'),
('07', '个', '个'),
('08', '套', '套'),
('09', '台', '台'),
('10', '件', '件');

-- ----------------------------
-- 插入示例材料标准数据
-- ----------------------------
-- 编码：01(黑色金属) + 01(钢筋) + 01(热轧圆盘条) + 001(φ6) + 01(吨) = 01010100101
INSERT INTO material_standard (material_code, material_name, category_level1_id, category_level2_id, category_level3_id, spec_id, unit_id, remark, create_by) VALUES
('01010100101', '热轧圆盘条φ6', 1, 101, 10101, 1, 1, '常用钢筋规格', 'system'),
('01010100201', '热轧圆盘条φ8', 1, 101, 10101, 2, 1, '常用钢筋规格', 'system'),
('01010100301', '热轧圆盘条φ10', 1, 101, 10101, 3, 1, '常用钢筋规格', 'system');

-- =============================================
-- 说明
-- =============================================
-- 材料编码规则（11位）：
-- 位置1-2：一级分类编码（2位）
-- 位置3-4：二级分类编码（2位）
-- 位置5-6：三级分类编码（2位）
-- 位置7-9：规格编码（3位）
-- 位置10-11：单位编码（2位）
-- 
-- 示例：01010100101
-- 解析：01(黑色金属) + 01(钢筋) + 01(热轧圆盘条) + 001(φ6) + 01(吨)
-- =============================================
