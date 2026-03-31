-- 由脚本自动生成：标准规格型号导入SQL
START TRANSACTION;
DELETE FROM material_std_name_spec_value;
DELETE FROM material_std_name_spec;
DELETE FROM material_std_name_unit;
DELETE FROM material_std_name;

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100001, '潜水搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200001, 100001, '组', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200002, 100001, '台', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300001, 100001, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400001, 300001, '1.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400002, 300001, '2.2kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400003, 300001, '3.1kW', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400004, 300001, '4kW', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400005, 300001, '5.5kW', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300002, 100001, '转速n', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400006, 300002, '35r', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400007, 300002, 'min', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400008, 300002, '42r', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400009, 300002, '740r', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300003, 100001, '叶轮直径', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400010, 300003, '320mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400011, 300003, '400mm', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400012, 300003, '2500mm', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300004, 100001, '产品型号', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400013, 300004, 'Am35-2500', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400014, 300004, '34URG', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400015, 300004, 'Am42-2500', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400016, 300004, 'SS304', 4, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100002, '电磁流量计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200003, 100002, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300005, 100002, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400017, 300005, '400mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400018, 300005, '450mm', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400019, 300005, '700mm', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400020, 300005, '800mm', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300006, 100002, '信号类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400021, 300006, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300007, 100002, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400022, 300007, 'DN400', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400023, 300007, 'DN450', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400024, 300007, 'DN700', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400025, 300007, 'DN800', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400026, 300007, 'MAG3100', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400027, 300007, 'MAG5000', 6, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100003, '电动单梁起重机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200004, 100003, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200005, 100003, '台', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300008, 100003, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400028, 300008, '0.0T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400029, 300008, '2.0T', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400030, 300008, '3.0T', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300009, 100003, '起吊高度', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400031, 300009, '6.0m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400032, 300009, '8.0m', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300010, 100003, '跨度', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400033, 300010, '9.26m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400034, 300010, '12.0m', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300011, 100003, '行程', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400035, 300011, '7.7m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400036, 300011, '18.0m', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400037, 300011, '22.4m', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300012, 100003, '功率N', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400038, 300012, '5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400039, 300012, '6.4kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400040, 300012, '6.5kW', 3, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100004, '空压机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200006, 100004, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300013, 100004, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400041, 300013, '3kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400042, 300013, '7.5kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400043, 300013, '18.5kW', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300014, 100004, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400044, 300014, '0.8MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400045, 300014, '8MPa', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300015, 100004, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400046, 300015, '0.42m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400047, 300015, 'min', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400048, 300015, '3.0m³', 3, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100005, '铸铁镶铜方闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200007, 100005, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300016, 100005, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400049, 300016, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100006, '镶铜铸铁圆闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200008, 100006, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300017, 100006, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400050, 300017, '2.0T', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100007, 'UPS电源', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200009, 100007, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200010, 100007, '个', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100008, 'modbus通讯模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200011, 100008, '块', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300018, 100008, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400051, 300018, 'modbus', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100009, '剩余污泥泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200012, 100009, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300019, 100009, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400052, 300019, '7.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100010, '柴油发电机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200013, 100010, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200014, 100010, '台', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300020, 100010, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400053, 300020, '300kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400054, 300020, '640kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100011, '模拟量信号浪涌吸收保护器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200015, 100011, '个（套）', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300021, 100011, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400055, 300021, 'FLD-24', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100012, '污泥输送泵(螺杆泵)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200016, 100012, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200017, 100012, '台', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300022, 100012, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400056, 300022, '11kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300023, 100012, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400057, 300023, '0.2MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400058, 300023, '0.4MPa', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100013, '电源模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200018, 100013, '块', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100014, '超声波液位差计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200019, 100014, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300024, 100014, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400059, 300024, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100015, 'LX型电动单梁悬挂起重机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200020, 100015, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300025, 100015, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400060, 300025, '0.0T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300026, 100015, '起吊高度', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400061, 300026, '6.0m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400062, 300026, '9.0m', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400063, 300026, '18.0m', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300027, 100015, '功率N', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400064, 300027, '4.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100016, 'PLC编程编制', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200021, 100016, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100017, 'PLC编程软件标准版', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200022, 100017, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100018, '低压开关柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200023, 100018, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200024, 100018, '台', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100019, '反冲洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200025, 100019, '个', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300028, 100019, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400065, 300028, '7.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300029, 100019, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400066, 300029, '0.8MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300030, 100019, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400067, 300030, 'm3', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400068, 300030, 'h', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100020, '可提升式薄膜管式微孔曝气器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200026, 100020, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300031, 100020, '池内水深', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400069, 300031, '5250mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300032, 100020, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400070, 300032, 'SWTG2000', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100021, '回流污泥泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200027, 100021, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300033, 100021, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400071, 300033, '16kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100022, '工业以太网交换机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200028, 100022, '个', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100023, '开关电源', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200029, 100023, '个', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200030, 100023, '套', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300034, 100023, '电流', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400072, 300034, '20A', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100024, '旋流沉砂器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200031, 100024, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300035, 100024, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400073, 300035, '1.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300036, 100024, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400074, 300036, 'XLC-1980', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100025, '污泥浓度计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200032, 100025, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300037, 100025, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400075, 300037, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300038, 100025, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400076, 300038, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300039, 100025, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400077, 300039, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100026, '潜污泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200033, 100026, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300040, 100026, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400078, 300040, '4kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300041, 100026, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400079, 300041, 'SE1.50.65.30.2.50D.B', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100027, '电动葫芦', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200034, 100027, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300042, 100027, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400080, 300042, '0.4kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300043, 100027, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400081, 300043, 'MD13-12D', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100028, '电动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200035, 100028, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300044, 100028, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400082, 300044, '450mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300045, 100028, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400083, 300045, 'DN450', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100029, '电涌保护器(I/O模块)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200036, 100029, '块', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300046, 100029, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400084, 300046, 'FLD-24', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400085, 300046, 'LSA-BF-24x10', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100030, '絮凝搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200037, 100030, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300047, 100030, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400086, 300047, '2.2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400087, 300047, '4.5kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400088, 300047, '5kW', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300048, 100030, '转速n', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400089, 300048, '45r', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400090, 300048, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100031, '超声波液位计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200038, 100031, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300049, 100031, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400091, 300049, 'FMU90', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400092, 300049, 'FDU91', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100032, '轴流排风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200039, 100032, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300050, 100032, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400093, 300050, '0.55kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300051, 100032, '风量', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400094, 300051, '7355m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400095, 300051, 'h', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300052, 100032, '转速n', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400096, 300052, '1450r', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400097, 300052, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100033, '轴流风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200040, 100033, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300053, 100033, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400098, 300053, '0.04kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400099, 300053, '0.25kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400100, 300053, '0.55kW', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400101, 300053, '25kW', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300054, 100033, '风量', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400102, 300054, '1680m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400103, 300054, 'h', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300055, 100033, '风压', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400104, 300055, '61Pa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300056, 100033, '转速n', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400105, 300056, '1450r', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400106, 300056, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100034, '铸铁镶铜圆闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200041, 100034, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300057, 100034, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400107, 300057, '0.75kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300058, 100034, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400108, 300058, 'min.m', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100035, '铸铁镶铜闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200042, 100035, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300059, 100035, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400109, 300059, '600mm', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100036, 'ORP测定仪', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200043, 100036, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300060, 100036, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400110, 300060, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300061, 100036, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400111, 300061, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300062, 100036, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400112, 300062, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100037, 'PAM制备系统', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200044, 100037, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300063, 100037, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400113, 300063, '3.67kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300064, 100037, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400114, 300064, 'AT2000', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100038, 'PLC柜改造', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200045, 100038, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300065, 100038, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400115, 300065, 'DI', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400116, 300065, 'DO', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400117, 300065, 'AI', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400118, 300065, 'AO', 4, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100039, '上位机监控程序', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200046, 100039, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100040, '不锈钢仪表箱(罩)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200047, 100040, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100041, '乙酸钠储罐', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200048, 100041, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300066, 100041, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400119, 300066, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100042, '单管中心传动刮吸泥机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200049, 100042, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300067, 100042, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400120, 300067, '0.37kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300068, 100042, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400121, 300068, 'ZXJ-30-1', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100043, '压力变送器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200050, 100043, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300069, 100043, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400122, 300069, '0.6MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300070, 100043, '信号类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400123, 300070, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300071, 100043, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400124, 300071, 'PMP11', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100044, '反洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200051, 100044, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300072, 100044, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400125, 300072, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100045, '回用水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200052, 100045, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300073, 100045, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400126, 300073, '11kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100046, '带式浓缩机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200053, 100046, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300074, 100046, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400127, 300074, '2.2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300075, 100046, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400128, 300075, '8MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300076, 100046, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400129, 300076, 'm3', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400130, 300076, 'h', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100047, '排污泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200054, 100047, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300077, 100047, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400131, 300077, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100048, '提升泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200055, 100048, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300078, 100048, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400132, 300078, '180kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100049, '次氯酸钠储罐', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200056, 100049, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300079, 100049, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400133, 300079, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300080, 100049, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400134, 300080, 'GM0330P', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100050, '气动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200057, 100050, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300081, 100050, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400135, 300081, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300082, 100050, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400136, 300082, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100051, '混合搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200058, 100051, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300083, 100051, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400137, 300083, '0kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400138, 300083, '3kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100052, '溶解氧测定仪(带温度输出)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200059, 100052, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300084, 100052, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400139, 300084, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300085, 100052, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400140, 300085, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300086, 100052, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400141, 300086, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100053, '潜水排污泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200060, 100053, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300087, 100053, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400142, 300087, '55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100054, '热式质量流量计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200061, 100054, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300088, 100054, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400143, 300088, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100055, '电动球阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200062, 100055, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300089, 100055, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400144, 300089, '0.04kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400145, 300089, '0.09kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300090, 100055, '口径DN', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400146, 300090, '50mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400147, 300090, '80mm', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300091, 100055, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400148, 300091, 'Q41F-16C', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100056, '磁粉混合搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200063, 100056, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300092, 100056, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400149, 300092, '7.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100057, '絮凝池搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200064, 100057, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300093, 100057, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400150, 300093, '7.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100058, '配套附件', (SELECT id FROM material_category WHERE level = 2 AND category_name = '其它设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200065, 100058, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100059, '高压冲洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200066, 100059, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300094, 100059, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400151, 300094, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100060, '19"标准机柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200067, 100060, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100061, '1P壁挂式分体空调(门卫、仪表间)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200068, 100061, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300095, 100061, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400152, 300095, '0.75kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400153, 300095, '2.6kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300096, 100061, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400154, 300096, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300097, 100061, '频率', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400155, 300097, '50Hz', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100062, '1通道脉冲计数模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200069, 100062, '块', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100063, 'CPU1215C', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200070, 100063, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300098, 100063, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400156, 300098, 'DI', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400157, 300098, 'DO', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400158, 300098, 'AI', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400159, 300098, 'AO', 4, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100064, 'FeSO4溶药搅拌箱', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200071, 100064, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100065, 'IM360扩展模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200072, 100065, '块', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100066, 'IM361扩展模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200073, 100066, '块', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100067, 'NH3-N分析仪', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200074, 100067, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300099, 100067, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400160, 300099, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100068, 'PAC加药泵(计量泵)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200075, 100068, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300100, 100068, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400161, 300100, '1.1kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300101, 100068, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400162, 300101, '0.3MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100069, 'PAM三槽式自动投药溶解装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200076, 100069, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300102, 100069, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400163, 300102, '0.37kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400164, 300102, '75kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100070, 'PAM三腔溶解装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200077, 100070, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300103, 100070, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400165, 300103, '4.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100071, 'PAM加药泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200078, 100071, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300104, 100071, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400166, 300104, '0.75kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400167, 300104, '75kW', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300105, 100071, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400168, 300105, '0.3MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400169, 300105, '3MPa', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100072, 'PAM加药装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200079, 100072, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300106, 100072, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400170, 300106, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100073, 'PLC控制柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200080, 100073, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100074, 'PLC程序编制', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200081, 100074, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100075, 'PLC编程软件', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200082, 100075, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100076, 'TP/TN分析仪', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200083, 100076, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300107, 100076, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400171, 300107, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100077, 'pH分析仪(带温度输出)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200084, 100077, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300108, 100077, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400172, 300108, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300109, 100077, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400173, 300109, 'CPF81D', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400174, 300109, 'CPM253', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100078, '一期PLC改造', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200085, 100078, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100079, '三叶罗茨鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200086, 100079, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300110, 100079, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400175, 300110, '55kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300111, 100079, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400176, 300111, '0.06MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300112, 100079, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400177, 300112, '31.5m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400178, 300112, 'min', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300113, 100079, '转速n', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400179, 300113, '1200r', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400180, 300113, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100080, '不锈钢仪表箱', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200087, 100080, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100081, '不锈钢自吸泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200088, 100081, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300114, 100081, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400181, 300114, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100082, '中心传动污泥浓缩机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200089, 100082, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300115, 100082, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400182, 300115, '0.55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100083, '中心传动浓缩机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200090, 100083, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300116, 100083, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400183, 300116, '0.55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100084, '中置柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200091, 100084, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300117, 100084, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400184, 300117, 'KYN28A-12', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100085, '中间提升泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200092, 100085, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300118, 100085, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400185, 300118, '55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100086, '乙酸钠卸料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200093, 100086, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300119, 100086, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400186, 300119, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100087, '乙酸钠在线稀释装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200094, 100087, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100088, '二沉池附件', (SELECT id FROM material_category WHERE level = 2 AND category_name = '其它设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200095, 100088, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100089, '以太网通讯模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200096, 100089, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100090, '仪表储气罐', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200097, 100090, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300120, 100090, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400187, 300120, '1MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100091, '仪表气罐', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200098, 100091, '个', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300121, 100091, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400188, 300121, '1MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100092, '低压污泥进料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200099, 100092, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300122, 100092, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400189, 300122, '15kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300123, 100092, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400190, 300123, '0.4MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100093, '低压电容补偿柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200100, 100093, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100094, '低压配电柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200101, 100094, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100095, '低噪声方形壁式轴流风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200102, 100095, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300124, 100095, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400191, 300124, '0.025kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300125, 100095, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400192, 300125, '220V', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100096, '低噪声方形壁式轴流风机(防爆)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200103, 100096, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300126, 100096, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400193, 300126, '0.025kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300127, 100096, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400194, 300127, '220V', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100097, '信号浪涌保护器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200104, 100097, '个', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300128, 100097, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400195, 300128, 'FLD-24', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100098, '全自动隔膜板框压滤机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200105, 100098, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300129, 100098, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400196, 300129, '15kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100099, '其它管路系统及安装附件', (SELECT id FROM material_category WHERE level = 2 AND category_name = '其它设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200106, 100099, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100100, '冲洗水罐(与压滤机清洗水箱共用)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200107, 100100, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100101, '冷却水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200108, 100101, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300130, 100101, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400197, 300130, '0.37kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400198, 300130, '37kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100102, '冷却水罐', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200109, 100102, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300131, 100102, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400199, 300131, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300132, 100102, '信号类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400200, 300132, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100103, '冷风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200110, 100103, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300133, 100103, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400201, 300133, '1.1kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300134, 100103, '流量Q', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400202, 300134, '300.0m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400203, 300134, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100104, '出水水质在线监测仪表系统改造', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200111, 100104, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100105, '剩余污泥流量计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200112, 100105, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300135, 100105, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400204, 300135, '65mm', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100106, '助凝剂在线稀释装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200113, 100106, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100107, '千兆工业级以太网交换机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200114, 100107, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100108, '压榨水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200115, 100108, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300136, 100108, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400205, 300136, '18.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100109, '压榨泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200116, 100109, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300137, 100109, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400206, 300137, '15kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300138, 100109, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400207, 300138, '1.6MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100110, '双侧单管中心传动刮吸泥机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200117, 100110, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300139, 100110, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400208, 300139, '0.55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100111, '反冲洗废水排放泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200118, 100111, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300140, 100111, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400209, 300140, '7.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100112, '反冲洗水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200119, 100112, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300141, 100112, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400210, 300141, '22kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100113, '反冲洗风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200120, 100113, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300142, 100113, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400211, 300142, '75kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300143, 100113, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400212, 300143, '0.08MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300144, 100113, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400213, 300144, '33.3m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400214, 300144, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100114, '反洗出水气动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200121, 100114, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300145, 100114, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400215, 300145, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300146, 100114, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400216, 300146, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100115, '反洗废水排放泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200122, 100115, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300147, 100115, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400217, 300147, '15kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100116, '反洗废水池搅拌器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200123, 100116, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300148, 100116, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400218, 300148, '2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300149, 100116, '叶轮直径', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400219, 300149, '450mm', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100117, '反洗进气气动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200124, 100117, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300150, 100117, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400220, 300150, '250mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300151, 100117, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400221, 300151, 'DN250', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100118, '反洗进水气动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200125, 100118, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300152, 100118, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400222, 300152, '400mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300153, 100118, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400223, 300153, 'DN400', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100119, '反洗风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200126, 100119, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300154, 100119, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400224, 300154, '160kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300155, 100119, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400225, 300155, '0.07MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300156, 100119, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400226, 300156, '95.0m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400227, 300156, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100120, '发电机进出线柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200127, 100120, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100121, '变频调速给水泵组', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200128, 100121, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300157, 100121, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400228, 300157, '1.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300158, 100121, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400229, 300158, '0.6MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100122, '可提升式薄膜板式微孔曝气器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200129, 100122, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100123, '周界报警控制器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200130, 100123, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100124, '回流污泥流量计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200131, 100124, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300159, 100124, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400230, 300159, '80mm', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100125, '回用清水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200132, 100125, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100126, '回转式格栅除污机(粗格栅)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200133, 100126, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300160, 100126, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400231, 300160, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100127, '回转耙齿式细格栅', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200134, 100127, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300161, 100127, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400232, 300161, '2.2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300162, 100127, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400233, 300162, 'RAG-1.4X2.8', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100128, '套筒阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200135, 100128, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300163, 100128, '起吊高度', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400234, 300163, '1500.0m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300164, 100128, '口径DN', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400235, 300164, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300165, 100128, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400236, 300165, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100129, '孔板转鼓式格栅除污机(细格栅)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200136, 100129, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300166, 100129, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400237, 300166, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100130, '室外监控枪机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200137, 100130, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300167, 100130, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400238, 300167, 'HFW3231M-I2', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400239, 300167, 'DH-IPC-HFW3231M-I2', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100131, '小型PLC', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200138, 100131, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300168, 100131, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400240, 300168, '24V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300169, 100131, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400241, 300169, 'DC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300170, 100131, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400242, 300170, 'AI', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100132, '工业级网络交换机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200139, 100132, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100133, '带式浓缩脱水一体机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200140, 100133, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300171, 100133, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400243, 300171, '4.1kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300172, 100133, '信号类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400244, 300172, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100134, '废水池搅拌器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200141, 100134, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300173, 100134, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400245, 300173, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100135, '快混池搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200142, 100135, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300174, 100135, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400246, 300174, '5.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100136, '悬浮式离心鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200143, 100136, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300175, 100136, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400247, 300175, '100kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300176, 100136, '流量Q', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400248, 300176, '55.0m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400249, 300176, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100137, '悬浮鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200144, 100137, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300177, 100137, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400250, 300177, '225kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300178, 100137, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400251, 300178, '0.07MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300179, 100137, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400252, 300179, '168.0m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400253, 300179, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100138, '户外立柱仪表箱', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200145, 100138, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100139, '扩展模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200146, 100139, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100140, '控制台', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200147, 100140, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100141, '控制码集成器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200148, 100141, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300180, 100141, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400254, 300180, 'V2406-2', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100142, '控制系统', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200149, 100142, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100143, '提篮格栅', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200150, 100143, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100144, '插板闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200151, 100144, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100145, '明渠流量计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200152, 100145, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300181, 100145, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400255, 300181, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100146, '曝气生物滤池系统电控柜(暂估价)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200153, 100146, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300182, 100146, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400256, 300182, '100mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400257, 300182, '250mm', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400258, 300182, '300mm', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400259, 300182, '400mm', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300183, 100146, '信号类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400260, 300183, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300184, 100146, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400261, 300184, 'DN100', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400262, 300184, 'DN250', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400263, 300184, 'DN300', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400264, 300184, 'DN400', 4, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100147, '曝气风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200154, 100147, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300185, 100147, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400265, 300185, '15kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300186, 100147, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400266, 300186, '0.08MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300187, 100147, '流量Q', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400267, 300187, '5.54m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400268, 300187, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100148, '机柜(含滤尘、照明、加热除湿、安装辅件等)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200155, 100148, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100149, '板框压滤机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200156, 100149, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300188, 100149, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400269, 300188, '0.25kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400270, 300188, '7.5kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100150, '板框机低压进泥泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200157, 100150, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300189, 100150, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400271, 300189, '22kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100151, '板框机高压进泥泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200158, 100151, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300190, 100151, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400272, 300190, '30kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100152, '柴油发电机及配套设施', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200159, 100152, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300191, 100152, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400273, 300191, '900kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100153, '柴油发电机组', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200160, 100153, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300192, 100153, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400274, 300192, '1000kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100154, '框架式搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200161, 100154, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300193, 100154, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400275, 300193, '11kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100155, '次氯酸钠卸料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200162, 100155, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300194, 100155, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400276, 300194, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100156, '次氯酸钠药液输送隔膜泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200163, 100156, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300195, 100156, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400277, 300195, '0.37kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300196, 100156, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400278, 300196, '0.5MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100157, '止回阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200164, 100157, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300197, 100157, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400279, 300197, '300mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300198, 100157, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400280, 300198, 'DN300', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100158, '气动放空阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200165, 100158, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100159, '气洗鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200166, 100159, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300199, 100159, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400281, 300199, '7.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100160, '氧化还原测定仪', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200167, 100160, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300200, 100160, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400282, 300200, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300201, 100160, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400283, 300201, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300202, 100160, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400284, 300202, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100161, '氨氮分析仪(中间提升泵站)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200168, 100161, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300203, 100161, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400285, 300203, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300204, 100161, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400286, 300204, 'AC', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100162, '氯气检测报警器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200169, 100162, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300205, 100162, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400287, 300205, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100163, '污泥剪碎格栅机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200170, 100163, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300206, 100163, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400288, 300206, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100164, '污泥回流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200171, 100164, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300207, 100164, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400289, 300207, '75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100165, '污泥提升泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200172, 100165, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300208, 100165, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400290, 300208, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100166, '污泥池搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200173, 100166, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300209, 100166, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400291, 300209, '3kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100167, '污泥浓缩脱水一体机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200174, 100167, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300210, 100167, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400292, 300210, '8MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300211, 100167, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400293, 300211, 'm3', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400294, 300211, 'h', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400295, 300211, 'SS304', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400296, 300211, 'PDL1000', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400297, 300211, 'PPE1000', 5, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100168, '污泥螺杆泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200175, 100168, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300212, 100168, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400298, 300212, '15kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300213, 100168, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400299, 300213, 'BN70-6L', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100169, '污泥转子泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200176, 100169, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300214, 100169, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400300, 300214, '3.7kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100170, '污泥输送泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200177, 100170, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300215, 100170, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400301, 300215, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100171, '泥浆泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200178, 100171, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300216, 100171, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400302, 300216, '22kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100172, '浓缩机PAM加药泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200179, 100172, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300217, 100172, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400303, 300217, '1.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300218, 100172, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400304, 300218, '0.5MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100173, '浮球液位计', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200180, 100173, '只', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100174, '消毒模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200181, 100174, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300219, 100174, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400305, 300219, '28.1kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100175, '混凝剂加药装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200182, 100175, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300220, 100175, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400306, 300220, '0.55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100176, '混凝剂在线稀释装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200183, 100176, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100177, '混凝搅拌器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200184, 100177, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300221, 100177, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400307, 300221, '2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400308, 300221, '2.2kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100178, '混凝搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200185, 100178, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300222, 100178, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400309, 300222, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100179, '混合液回流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200186, 100179, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300223, 100179, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400310, 300223, '2.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100180, '清水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200187, 100180, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300224, 100180, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400311, 300224, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100181, '清洗水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200188, 100181, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300225, 100181, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400312, 300225, '30kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300226, 100181, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400313, 300226, '1.96MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100182, '清洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200189, 100182, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300227, 100182, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400314, 300227, '37kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100183, '溶解氧测定仪(带温度输出)(好氧池)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200190, 100183, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300228, 100183, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400315, 300228, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300229, 100183, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400316, 300229, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300230, 100183, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400317, 300230, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100184, '溶解氧测定仪(带温度输出)(缺氧池)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200191, 100184, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300231, 100184, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400318, 300231, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300232, 100184, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400319, 300232, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300233, 100184, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400320, 300233, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100185, '滤带清洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200192, 100185, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300234, 100185, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400321, 300234, '5.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100186, '潜水轴流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200193, 100186, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300235, 100186, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400322, 300235, '45kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100187, '熟石灰投加装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '药剂设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200194, 100187, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300236, 100187, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400323, 300236, '3kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400324, 300236, '7.5kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100188, '环网柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200195, 100188, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100189, '现场控制箱', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200196, 100189, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100190, '现场温度计(风机房)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200197, 100190, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300237, 100190, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400325, 300237, '0.06MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300238, 100190, '口径DN', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400326, 300238, '350mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300239, 100190, '产品型号', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400327, 300239, 'DN350', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100191, '生物滤池除臭装置', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200198, 100191, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300240, 100191, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400328, 300240, '1.5kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400329, 300240, '22kW', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100192, '电力监控设备', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200199, 100192, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100193, '电动单梁悬挂起重机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200200, 100193, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300241, 100193, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400330, 300241, '3.0T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300242, 100193, '起吊高度', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400331, 300242, '12.0m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300243, 100193, '跨度', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400332, 300243, '8.5m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300244, 100193, '功率N', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400333, 300244, '5.3kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100194, '电动单梁桥式起重机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200201, 100194, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300245, 100194, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400334, 300245, '3kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100195, '电动渠道闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200202, 100195, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300246, 100195, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400335, 300246, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100196, '电动碟阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200203, 100196, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100197, '电动闸阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200204, 100197, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300247, 100197, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400336, 300247, '100mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300248, 100197, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400337, 300248, 'DN100', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100198, '电气及自控系统', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200205, 100198, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100199, '电气火灾监控设备', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200206, 100199, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100200, '电涌保护器(脉冲信号)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200207, 100200, '块', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300249, 100200, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400338, 300249, 'FLD-48', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100201, '电源防雷器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200208, 100201, '个', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300250, 100201, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400339, 300250, 'VF230AC', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100202, '电磁流量计DN100(剩余污泥量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200209, 100202, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100203, '电磁流量计DN1000(回流污泥量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200210, 100203, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300251, 100203, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400340, 300251, '1000mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300252, 100203, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400341, 300252, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300253, 100203, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400342, 300253, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300254, 100203, '信号类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400343, 300254, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300255, 100203, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400344, 300255, 'DN1000', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100204, '电磁流量计DN1400(四期出水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200211, 100204, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300256, 100204, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400345, 300256, '1400mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300257, 100204, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400346, 300257, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300258, 100204, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400347, 300258, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300259, 100204, '信号类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400348, 300259, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300260, 100204, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400349, 300260, 'DN1400', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100205, '电磁流量计DN1400(四期进水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200212, 100205, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300261, 100205, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400350, 300261, '1400mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300262, 100205, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400351, 300262, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300263, 100205, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400352, 300263, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300264, 100205, '信号类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400353, 300264, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300265, 100205, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400354, 300265, 'DN1400', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100206, '电磁流量计DN40(改成DN25)(Naclo流量计)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200213, 100206, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300266, 100206, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400355, 300266, '25mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300267, 100206, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400356, 300267, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300268, 100206, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400357, 300268, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300269, 100206, '信号类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400358, 300269, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100207, '电磁流量计DN500(回流污泥量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200214, 100207, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100208, '电磁流量计DN600(出水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200215, 100208, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300270, 100208, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400359, 300270, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300271, 100208, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400360, 300271, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300272, 100208, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400361, 300272, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300273, 100208, '产品型号', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400362, 300273, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100209, '电磁流量计DN600(回流污泥量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200216, 100209, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300274, 100209, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400363, 300274, '0.05MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300275, 100209, '口径DN', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400364, 300275, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300276, 100209, '电压', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400365, 300276, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300277, 100209, '电压类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400366, 300277, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300278, 100209, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400367, 300278, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100210, '电磁流量计DN600(进水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200217, 100210, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300279, 100210, '额定排气压力', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400368, 300279, '0.05MPa', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300280, 100210, '口径DN', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400369, 300280, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300281, 100210, '电压', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400370, 300281, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300282, 100210, '电压类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400371, 300282, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300283, 100210, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400372, 300283, 'DN600', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100211, '电磁流量计DN700(出水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200218, 100211, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100212, '电磁流量计DN700(进水流量)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200219, 100212, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100213, '电磁计量泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200220, 100213, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300284, 100213, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400373, 300284, '0.37kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100214, '电葫芦', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200221, 100214, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300285, 100214, '起吊高度', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400374, 300285, '18.0m', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300286, 100214, '功率N', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400375, 300286, '3kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100215, '监控机箱', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200222, 100215, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100216, '监控硬盘', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200223, 100216, '块', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100217, '磁回流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200224, 100217, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300287, 100217, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400376, 300287, '5.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100218, '磁悬浮鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200225, 100218, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300288, 100218, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400377, 300288, '50kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300289, 100218, '流量Q', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400378, 300289, '42.0m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400379, 300289, 'min', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100219, '磁污泥回流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200226, 100219, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300290, 100219, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400380, 300290, '11kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100220, '磁盘阵列', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200227, 100220, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300291, 100220, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400381, 300291, 'AI', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100221, '移动冲洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200228, 100221, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300292, 100221, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400382, 300292, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100222, '移动式手动葫芦', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200229, 100222, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300293, 100222, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400383, 300293, '1.0T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300294, 100222, '起吊高度', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400384, 300294, '3.0m', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100223, '移动式抓斗格栅', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200230, 100223, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300295, 100223, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400385, 300295, '0.5T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400386, 300295, '5.0T', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300296, 100223, '功率N', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400387, 300296, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100224, '空气压缩机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200231, 100224, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300297, 100224, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400388, 300297, '3kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100225, '空气流量计(DN800)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200232, 100225, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300298, 100225, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400389, 300298, '600mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400390, 300298, '800mm', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300299, 100225, '电压', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400391, 300299, '230V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300300, 100225, '电压类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400392, 300300, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300301, 100225, '信号类型', 4, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400393, 300301, '输出', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300302, 100225, '产品型号', 5, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400394, 300302, 'DN600', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400395, 300302, 'DN800', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100226, '絮凝池反应筒', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200233, 100226, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300303, 100226, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400396, 300303, 'SS304', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100227, '纤维转盘滤池成套设备', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200234, 100227, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100228, '绿化水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200235, 100228, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300304, 100228, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400397, 300304, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100229, '网络交换机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200236, 100229, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100230, '网络机柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200237, 100230, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100231, '网络硬盘录像机(NVR)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200238, 100231, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300305, 100231, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400398, 300305, 'AI', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100232, '耙转式转鼓细格栅', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200239, 100232, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300306, 100232, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400399, 300306, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100233, '聚合氯化铝卸料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200240, 100233, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300307, 100233, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400400, 300307, '2.2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300308, 100233, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400401, 300308, 'ZK-10-20', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100234, '脉冲信号保护器', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200241, 100234, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300309, 100234, '产品型号', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400402, 300309, 'FLD-48', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100235, '计数器模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200242, 100235, '块', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300310, 100235, '点数', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400403, 300310, '2点', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100236, '调理池搅拌机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '搅拌设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200243, 100236, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300311, 100236, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400404, 300311, '15kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100237, '调理池进泥泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200244, 100237, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300312, 100237, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400405, 300312, '11kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100238, '超声波液位差计(细格栅)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200245, 100238, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300313, 100238, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400406, 300313, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300314, 100238, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400407, 300314, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300315, 100238, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400408, 300315, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100239, '超声波液位计(提升泵站)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200246, 100239, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300316, 100239, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400409, 300316, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100240, '超声波液位计(污泥回流泵站、氧化沟加药池、中间提升泵站、消毒出水池)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200247, 100240, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300317, 100240, '电压', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400410, 300317, '220V', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300318, 100240, '电压类型', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400411, 300318, 'AC', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300319, 100240, '信号类型', 3, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400412, 300319, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100241, '转盘滤池', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200248, 100241, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100242, '转鼓式细格栅', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200249, 100242, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300320, 100242, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400413, 300320, '2.2kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100243, '转鼓微过滤设备', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200250, 100243, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300321, 100243, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400414, 300321, '2.2kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300322, 100243, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400415, 300322, 'R200II', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100244, '轴流泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200251, 100244, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300323, 100244, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400416, 300323, '55kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300324, 100244, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400417, 300324, 'KPL.700.45.8.T.50.L.38.Z', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100245, '进水气动蝶阀', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200252, 100245, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300325, 100245, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400418, 300325, '300mm', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300326, 100245, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400419, 300326, 'DN300', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100246, '进水水质在线监测仪表系统改造', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200253, 100246, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100247, '通讯模块', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200254, 100247, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100248, '配套电气自控系统', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200255, 100248, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300327, 100248, '信号类型', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400420, 300327, '输出', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100249, '配电系统、自控系统、电缆及桥架', (SELECT id FROM material_category WHERE level = 2 AND category_name = '电气、自控及仪表设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200256, 100249, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100250, '钢丝绳牵引式格栅除污机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '分离设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200257, 100250, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300328, 100250, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400421, 300328, '0.55kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100251, '铁盐卸料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200258, 100251, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300329, 100251, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400422, 300329, '4kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100252, '铝合金叠梁闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200259, 100252, '套', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100253, '铸铁镶铜速闭圆闸门(下开式)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200260, 100253, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300330, 100253, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400423, 300330, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100254, '镶铜铸铁方闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200261, 100254, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300331, 100254, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400424, 300331, '2.0T', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300332, 100254, '功率N', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400425, 300332, '0.75kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100255, '镶铜铸铁方闸门(下开式)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200262, 100255, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300333, 100255, '起吊重量', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400426, 300333, '2.0T', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100256, '镶铜铸铁闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200263, 100256, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300334, 100256, '口径DN', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400427, 300334, '500mm', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100257, '闸门', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200264, 100257, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100258, '阀控式密封铅酸胶体电池柜', (SELECT id FROM material_category WHERE level = 2 AND category_name = '通用设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200265, 100258, '台', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100259, '降温换气机组(工业冷风机)', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200266, 100259, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300335, 100259, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400428, 300335, '1.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100260, '高压冲洗水泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200267, 100260, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300336, 100260, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400429, 300336, '15kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300337, 100260, '产品型号', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400430, 300337, 'm3', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400431, 300337, 'h', 2, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100261, '高压反洗泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200268, 100261, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300338, 100261, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400432, 300338, '5.5kW', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100262, '高压污泥进料泵', (SELECT id FROM material_category WHERE level = 2 AND category_name = '泵类设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200269, 100262, '台', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300339, 100262, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400433, 300339, '11kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300340, 100262, '额定排气压力', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400434, 300340, '0.8MPa', 1, '1', '0', NOW(), NOW());

INSERT INTO material_std_name (id, standard_name, category_level2_id, status, del_flag, create_time, update_time) VALUES (100263, '鼓风机', (SELECT id FROM material_category WHERE level = 2 AND category_name = '空气设备' LIMIT 1), '1', '0', NOW(), NOW());
INSERT INTO material_std_name_unit (id, std_name_id, unit_name, sort_order, status, del_flag, create_time, update_time) VALUES (200270, 100263, '套', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300341, 100263, '功率N', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400435, 300341, '3kW', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec (id, std_name_id, spec_key, sort_order, status, del_flag, create_time, update_time) VALUES (300342, 100263, '流量Q', 2, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400436, 300342, '2.5m³', 1, '1', '0', NOW(), NOW());
INSERT INTO material_std_name_spec_value (id, spec_id, spec_value, sort_order, status, del_flag, create_time, update_time) VALUES (400437, 300342, 'min', 2, '1', '0', NOW(), NOW());

COMMIT;
SELECT COUNT(*) AS std_name_count FROM material_std_name;
SELECT COUNT(*) AS std_unit_count FROM material_std_name_unit;
SELECT COUNT(*) AS std_spec_count FROM material_std_name_spec;
SELECT COUNT(*) AS std_spec_value_count FROM material_std_name_spec_value;