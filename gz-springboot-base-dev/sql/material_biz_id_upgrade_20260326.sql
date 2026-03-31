-- 业务ID稳定化升级脚本（M/U/V）
-- 执行日期：2026-03-26

-- 1) material_std_name: 增加标准名称业务ID
ALTER TABLE material_std_name
  ADD COLUMN std_name_code VARCHAR(16) DEFAULT NULL COMMENT '标准材料名称业务ID（如M00001）' AFTER standard_name;

ALTER TABLE material_std_name
  ADD UNIQUE KEY uk_std_name_code (std_name_code);

UPDATE material_std_name
SET std_name_code = CONCAT('M', LPAD(id, 6, '0'))
WHERE std_name_code IS NULL OR std_name_code = '';

-- 2) material_unit: 增加单位业务ID
ALTER TABLE material_unit
  ADD COLUMN unit_biz_id VARCHAR(16) DEFAULT NULL COMMENT '单位业务ID（如U0001）' AFTER unit_code;

ALTER TABLE material_unit
  ADD UNIQUE KEY uk_unit_biz_id (unit_biz_id);

UPDATE material_unit
SET unit_biz_id = CONCAT('U', LPAD(id, 4, '0'))
WHERE unit_biz_id IS NULL OR unit_biz_id = '';

-- 3) material_std_name_unit: 文本单位升级为单位ID关联（保留unit_name兼容）
ALTER TABLE material_std_name_unit
  ADD COLUMN unit_id BIGINT DEFAULT NULL COMMENT '单位ID（material_unit.id）' AFTER std_name_id;

ALTER TABLE material_std_name_unit
  ADD KEY idx_unit_id (unit_id);

UPDATE material_std_name_unit su
LEFT JOIN material_unit u ON u.unit_name = su.unit_name
SET su.unit_id = u.id
WHERE su.unit_id IS NULL;

-- 历史数据可能存在unit_name重复绑定，先去重后再建唯一约束
DELETE su1
FROM material_std_name_unit su1
JOIN material_std_name_unit su2
  ON su1.std_name_id = su2.std_name_id
 AND su1.unit_id = su2.unit_id
 AND su1.id > su2.id
WHERE su1.unit_id IS NOT NULL;

ALTER TABLE material_std_name_unit
  ADD UNIQUE KEY uk_std_unit (std_name_id, unit_id);

-- 4) material_std_name_spec_value: 增加规格值业务ID
ALTER TABLE material_std_name_spec_value
  ADD COLUMN spec_value_code VARCHAR(16) DEFAULT NULL COMMENT '规格值业务ID（如V000001）' AFTER spec_value;

ALTER TABLE material_std_name_spec_value
  ADD UNIQUE KEY uk_spec_value_code (spec_value_code);

UPDATE material_std_name_spec_value
SET spec_value_code = CONCAT('V', LPAD(id, 6, '0'))
WHERE spec_value_code IS NULL OR spec_value_code = '';

-- 5) material_std_name_spec: 增加规格名称业务ID
ALTER TABLE material_std_name_spec
  ADD COLUMN spec_key_code VARCHAR(16) DEFAULT NULL COMMENT '规格名称业务ID（如A0001）' AFTER spec_key;

ALTER TABLE material_std_name_spec
  ADD UNIQUE KEY uk_spec_key_code (spec_key_code);

UPDATE material_std_name_spec
SET spec_key_code = CONCAT('A', LPAD(id, 4, '0'))
WHERE spec_key_code IS NULL OR spec_key_code = '';
