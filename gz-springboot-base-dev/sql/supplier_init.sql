-- =============================================
-- 供应商信息管理系统 - 数据库表结构
-- 广业环保企业供应商管理
-- 创建时间: 2026-01-30
-- =============================================

-- ----------------------------
-- 供应商信息表
-- ----------------------------
DROP TABLE IF EXISTS supplier_info;
CREATE TABLE supplier_info (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  supplier_name VARCHAR(200) NOT NULL COMMENT '供应商名称',
  category_level1_id BIGINT COMMENT '一级分类ID',
  category_level2_id BIGINT COMMENT '二级分类ID',
  category_level3_id BIGINT COMMENT '三级分类ID',
  brand_name VARCHAR(100) COMMENT '供应品牌',
  province VARCHAR(50) COMMENT '省份',
  city VARCHAR(50) COMMENT '城市',
  district VARCHAR(50) COMMENT '区县',
  address VARCHAR(255) COMMENT '详细地址',
  contact_person VARCHAR(50) NOT NULL COMMENT '联系人',
  contact_phone VARCHAR(20) NOT NULL COMMENT '联系电话',
  contact_email VARCHAR(100) COMMENT '联系邮箱',
  remark VARCHAR(500) COMMENT '备注',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  del_flag CHAR(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  create_by VARCHAR(64) COMMENT '创建者',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_by VARCHAR(64) COMMENT '更新者',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  KEY idx_supplier_name (supplier_name),
  KEY idx_category (category_level1_id, category_level2_id, category_level3_id),
  KEY idx_brand (brand_name),
  KEY idx_region (province, city, district),
  KEY idx_contact (contact_person, contact_phone),
  KEY idx_status (status),
  KEY idx_del_flag (del_flag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='供应商信息表';

-- ----------------------------
-- 插入示例数据
-- ----------------------------
INSERT INTO supplier_info (supplier_name, category_level1_id, category_level2_id, category_level3_id, brand_name, province, city, district, address, contact_person, contact_phone, contact_email, remark, create_by) VALUES
('广东格兰富水泵有限公司', 2, 201, 20101, '格兰富', '广东省', '广州市', '天河区', '天河路123号科技园A座', '张伟', '13800138001', 'zhangwei@grundfos.cn', '丹麦格兰富中国区授权经销商，专业提供水泵设备', 'system'),
('深圳威乐机电设备有限公司', 2, 201, 20102, '威乐', '广东省', '深圳市', '南山区', '科技园南区深圳湾科技生态园', '李娜', '13800138002', 'lina@wilo.com.cn', '德国威乐品牌中国总代理', 'system'),
('上海赛莱默环保设备公司', 2, 202, 20203, '赛莱默', '上海市', '上海市', '浦东新区', '张江高科技园区碧波路690号', '王强', '13800138003', 'wangqiang@xylem.com', '美国赛莱默集团中国分公司，MBR膜技术领先', 'system');

-- =============================================
-- 说明
-- =============================================
-- 供应商信息表用于存储供应商的基本信息
-- 通过 category_level1_id, category_level2_id, category_level3_id 关联材料分类表
-- 支持按供应商名称、品牌、地区、联系人等多维度查询
-- =============================================
