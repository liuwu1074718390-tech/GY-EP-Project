-- 标准工艺段升级脚本
-- 日期：2026-03-30

-- 1) 创建标准工艺段表
CREATE TABLE IF NOT EXISTS material_process_segment (
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  segment_biz_id VARCHAR(16) NOT NULL COMMENT '工艺段业务ID（如P001）',
  segment_name VARCHAR(100) NOT NULL COMMENT '工艺段名称',
  status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY uk_segment_biz_id (segment_biz_id),
  UNIQUE KEY uk_segment_name (segment_name),
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='材料标准工艺段表';

-- 2) 初始化标准工艺段（来源：标准工艺段.md）
INSERT INTO material_process_segment (segment_biz_id, segment_name, status)
SELECT src.segment_biz_id, src.segment_name, src.status
FROM (
  SELECT 'P001' AS segment_biz_id, '污泥调理系统' AS segment_name, '1' AS status
  UNION ALL SELECT 'P002', '板框压滤机系统', '1'
  UNION ALL SELECT 'P003', '污泥浓缩池', '1'
  UNION ALL SELECT 'P004', '加药间', '1'
  UNION ALL SELECT 'P005', '二次提升泵站', '1'
  UNION ALL SELECT 'P006', '出水监控', '1'
  UNION ALL SELECT 'P007', '转盘滤池', '1'
  UNION ALL SELECT 'P008', '磁混凝沉淀池', '1'
  UNION ALL SELECT 'P009', '细格栅及旋流沉砂池', '1'
  UNION ALL SELECT 'P010', '回流污泥泵站', '1'
  UNION ALL SELECT 'P011', '消毒出水池', '1'
  UNION ALL SELECT 'P012', '鼓风机房', '1'
  UNION ALL SELECT 'P013', '污泥脱水间', '1'
  UNION ALL SELECT 'P014', 'AAO微曝氧化沟', '1'
  UNION ALL SELECT 'P015', '二沉池', '1'
  UNION ALL SELECT 'P016', '曝气生物滤池', '1'
  UNION ALL SELECT 'P017', '精密过滤池', '1'
  UNION ALL SELECT 'P018', '除磷沉淀池及储泥池', '1'
  UNION ALL SELECT 'P019', '高效沉淀池', '1'
  UNION ALL SELECT 'P020', '变电所', '1'
  UNION ALL SELECT 'P021', '粗格栅池及提升泵站', '1'
  UNION ALL SELECT 'P022', '反应池初沉池', '1'
  UNION ALL SELECT 'P023', '精细格栅及中间提升泵站', '1'
  UNION ALL SELECT 'P024', '生物除臭', '1'
  UNION ALL SELECT 'P025', '除磷反应池', '1'
  UNION ALL SELECT 'P026', '一期转盘滤池改造', '1'
  UNION ALL SELECT 'P027', '预处理加药间', '1'
  UNION ALL SELECT 'P028', '电气设备', '1'
  UNION ALL SELECT 'P029', '中控系统', '1'
  UNION ALL SELECT 'P030', '储泥池', '1'
  UNION ALL SELECT 'P031', '巴氏计量槽', '1'
  UNION ALL SELECT 'P032', '尾水提升泵站', '1'
  UNION ALL SELECT 'P033', '高位出水井', '1'
  UNION ALL SELECT 'P034', '污水提升泵站', '1'
  UNION ALL SELECT 'P035', '监控系统', '1'
  UNION ALL SELECT 'P036', '反硝化深床滤池', '1'
  UNION ALL SELECT 'P037', '污泥浓度计', '1'
  UNION ALL SELECT 'P038', '自控系统PLC1', '1'
  UNION ALL SELECT 'P039', '自控系统PLC2', '1'
  UNION ALL SELECT 'P040', '自控系统PLC3', '1'
  UNION ALL SELECT 'P041', '自控系统PLC4', '1'
  UNION ALL SELECT 'P042', '自控系统PLC', '1'
  UNION ALL SELECT 'P043', '自控系统3PLC1', '1'
  UNION ALL SELECT 'P044', '自控系统3PLC1#RIO101', '1'
  UNION ALL SELECT 'P045', '自控系统4PLC1', '1'
  UNION ALL SELECT 'P046', '自控系统4PLC2', '1'
  UNION ALL SELECT 'P047', '仪表系统', '1'
  UNION ALL SELECT 'P048', '自控系统', '1'
  UNION ALL SELECT 'P049', '2PLC1（变电所控制站）', '1'
  UNION ALL SELECT 'P050', '配套管网主要设备', '1'
  UNION ALL SELECT 'P051', '配水井', '1'
  UNION ALL SELECT 'P052', '生化池', '1'
  UNION ALL SELECT 'P053', 'T-PLC1', '1'
  UNION ALL SELECT 'P054', '其它工艺段', '1'
) src
WHERE NOT EXISTS (
  SELECT 1
  FROM material_process_segment t
  WHERE t.segment_name = src.segment_name
);
