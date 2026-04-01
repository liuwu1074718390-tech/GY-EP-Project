-- 材价记录导入模块初始化脚本

CREATE TABLE IF NOT EXISTS material_price_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  material_name VARCHAR(255) NOT NULL COMMENT '材料名称',
  specification VARCHAR(255) NOT NULL COMMENT '规格型号',
  category_name VARCHAR(255) NOT NULL COMMENT '所属分类',
  category_level1_id BIGINT NULL COMMENT '所属分类一级ID',
  category_level2_id BIGINT NULL COMMENT '所属分类二级ID',
  category_level3_id BIGINT NULL COMMENT '所属分类三级ID',
  process_segment_name VARCHAR(255) NULL COMMENT '工艺段',
  unit_name VARCHAR(64) NOT NULL COMMENT '单位',
  brand_name VARCHAR(128) NULL COMMENT '品牌',
  quantity DECIMAL(18,4) NOT NULL DEFAULT 1 COMMENT '数量',
  price_excluding_tax DECIMAL(18,2) NOT NULL COMMENT '不含税价',
  tax_rate DECIMAL(6,2) NOT NULL COMMENT '税率(%)',
  price_including_tax DECIMAL(18,2) NOT NULL COMMENT '含税价',
  source_project VARCHAR(255) NULL COMMENT '来源项目',
  purchase_time VARCHAR(7) NOT NULL COMMENT '采购时间YYYY-MM',
  price_type VARCHAR(20) NOT NULL COMMENT '价格类型',
  supplier_company VARCHAR(255) NULL COMMENT '报价供应商',
  remark VARCHAR(500) NULL COMMENT '备注',
  batch_id VARCHAR(64) NULL COMMENT '导入批次号',
  del_flag CHAR(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  create_by VARCHAR(64) NULL,
  update_by VARCHAR(64) NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_material_price_key (material_name, specification, purchase_time),
  KEY idx_material_price_supplier (supplier_company),
  KEY idx_material_price_batch (batch_id)
) COMMENT='材价记录表';

CREATE TABLE IF NOT EXISTS material_price_category_dict (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_material_price_category_name (category_name)
) COMMENT='材价导入分类字典';

CREATE TABLE IF NOT EXISTS material_price_unit_dict (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  unit_name VARCHAR(64) NOT NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_material_price_unit_name (unit_name)
) COMMENT='材价导入单位字典';

CREATE TABLE IF NOT EXISTS material_price_supplier_dict (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  supplier_name VARCHAR(255) NOT NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_material_price_supplier_name (supplier_name)
) COMMENT='材价导入供应商字典';

CREATE TABLE IF NOT EXISTS material_price_brand_dict (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  brand_name VARCHAR(255) NOT NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_material_price_brand_name (brand_name)
) COMMENT='材价导入品牌字典';

CREATE TABLE IF NOT EXISTS material_price_project_dict (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(255) NOT NULL,
  create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_material_price_project_name (project_name)
) COMMENT='材价导入项目字典';
