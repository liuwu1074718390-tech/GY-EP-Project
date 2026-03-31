-- 标准规格型号维护表结构

DROP TABLE IF EXISTS material_std_name_spec_value;
DROP TABLE IF EXISTS material_std_name_spec;
DROP TABLE IF EXISTS material_std_name_unit;
DROP TABLE IF EXISTS material_std_name;

CREATE TABLE material_std_name (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  standard_name VARCHAR(200) NOT NULL COMMENT '标准材料名称',
  std_name_code VARCHAR(16) DEFAULT NULL COMMENT '标准材料名称业务ID（如M00001）',
  category_level2_id BIGINT NOT NULL COMMENT '所属二级分类ID',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_by VARCHAR(64) DEFAULT NULL COMMENT '创建者',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_by VARCHAR(64) DEFAULT NULL COMMENT '更新者',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_standard_name (standard_name),
  UNIQUE KEY uk_std_name_code (std_name_code),
  KEY idx_category_level2_id (category_level2_id),
  KEY idx_status (status),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标准规格型号-标准名称主表';

CREATE TABLE material_std_name_unit (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  std_name_id BIGINT NOT NULL COMMENT '标准名称ID',
  unit_id BIGINT DEFAULT NULL COMMENT '单位ID（material_unit.id）',
  unit_name VARCHAR(50) NOT NULL COMMENT '单位名称（文本）',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_std_unit (std_name_id, unit_id),
  KEY idx_std_name_id (std_name_id),
  KEY idx_unit_id (unit_id),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标准规格型号-名称单位表';

CREATE TABLE material_std_name_spec (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  std_name_id BIGINT NOT NULL COMMENT '标准名称ID',
  spec_key VARCHAR(100) NOT NULL COMMENT '规格名称',
  spec_key_code VARCHAR(16) DEFAULT NULL COMMENT '规格名称业务ID（如A0001）',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_spec_key_code (spec_key_code),
  KEY idx_std_name_id (std_name_id),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标准规格型号-规格项表';

CREATE TABLE material_std_name_spec_value (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  spec_id BIGINT NOT NULL COMMENT '规格项ID',
  spec_value VARCHAR(200) NOT NULL COMMENT '规格值',
  spec_value_code VARCHAR(16) DEFAULT NULL COMMENT '规格值业务ID（如V000001）',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_spec_value_code (spec_value_code),
  KEY idx_spec_id (spec_id),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标准规格型号-规格值表';
