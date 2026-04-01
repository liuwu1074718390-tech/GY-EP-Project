-- MySQL dump 10.13  Distrib 9.5.0, for macos26.1 (arm64)
--
-- Host: localhost    Database: GY-EP_local
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '67b148dc-ebb1-11f0-a335-0fb9751d32a3:1-22700';

--
-- Table structure for table `material_category`
--

DROP TABLE IF EXISTS `material_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_code` varchar(2) NOT NULL COMMENT '分类编码（2位，如01）',
  `category_name` varchar(100) NOT NULL COMMENT '分类名称',
  `parent_id` bigint DEFAULT '0' COMMENT '父级ID（0表示顶级）',
  `level` int NOT NULL COMMENT '分类层级（1/2/3）',
  `sort_order` int DEFAULT '0' COMMENT '排序序号',
  `status` char(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code_parent` (`category_code`,`parent_id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_level` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=20802 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='材料分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_category`
--

LOCK TABLES `material_category` WRITE;
/*!40000 ALTER TABLE `material_category` DISABLE KEYS */;
INSERT INTO `material_category` VALUES (2,'02','设备',0,1,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(201,'01','通用设备',2,2,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(202,'02','分离设备',2,2,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(203,'03','搅拌设备',2,2,3,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(204,'04','空气设备',2,2,4,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(205,'05','泵类设备',2,2,5,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(206,'06','药剂设备',2,2,6,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(207,'07','电气、自控及仪表设备',2,2,7,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(208,'08','其它设备',2,2,8,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20101,'01','闸门',201,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20102,'02','起重机',201,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20103,'03','阀门',201,3,3,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20104,'04','紫外线消毒系统设备',201,3,4,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20105,'05','生物除臭系统设备',201,3,5,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20106,'06','其它通用设备',201,3,6,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20107,'07','其它除臭设备',201,3,7,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20201,'01','格栅',202,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20202,'02','转盘滤池',202,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20203,'03','刮吸泥机',202,3,3,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20204,'04','转盘滤池主要设备',202,3,4,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20205,'05','磁混凝主要设备',202,3,5,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20206,'06','脱水机',202,3,6,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20207,'07','精密过滤系统设备',202,3,7,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20208,'08','污泥浓缩机',202,3,8,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20209,'09','反硝化深床滤池系统主要设备',202,3,9,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20301,'01','搅拌器',203,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20302,'02','其它搅拌设备',203,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20401,'01','轴流风机',204,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20402,'02','鼓风机',204,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20403,'03','曝气器',204,3,3,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20404,'04','其它空气设备',204,3,4,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20501,'01','潜水泵',205,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20502,'02','螺杆泵',205,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20601,'01','加药设备',206,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20701,'01','过程仪表',207,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20702,'02','控制柜',207,3,2,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20703,'03','电力设备',207,3,3,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20704,'04','监控系统设备',207,3,4,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20705,'05','自控设备',207,3,5,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20706,'06','中控系统设备',207,3,6,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20707,'07','在线仪表',207,3,7,'1','2026-03-31 17:45:19','2026-03-31 17:45:19'),(20801,'01','附属设备及配件',208,3,1,'1','2026-03-31 17:45:19','2026-03-31 17:45:19');
/*!40000 ALTER TABLE `material_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_standard`
--

DROP TABLE IF EXISTS `material_standard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_standard` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `material_code` varchar(11) NOT NULL COMMENT '材料编码（11位，如01010100101）',
  `material_name` varchar(200) NOT NULL COMMENT '材料名称',
  `category_level1_id` bigint NOT NULL COMMENT '一级分类ID',
  `category_level2_id` bigint NOT NULL COMMENT '二级分类ID',
  `category_level3_id` bigint NOT NULL COMMENT '三级分类ID',
  `spec_id` bigint NOT NULL COMMENT '规格ID',
  `unit_id` bigint NOT NULL COMMENT '单位ID',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `status` char(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标识（0正常 1删除）',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `material_code` (`material_code`),
  KEY `idx_material_code` (`material_code`),
  KEY `idx_category_level1` (`category_level1_id`),
  KEY `idx_category_level2` (`category_level2_id`),
  KEY `idx_category_level3` (`category_level3_id`),
  KEY `idx_spec` (`spec_id`),
  KEY `idx_unit` (`unit_id`),
  KEY `idx_status` (`status`),
  KEY `idx_del_flag` (`del_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='材料标准表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_standard`
--

LOCK TABLES `material_standard` WRITE;
/*!40000 ALTER TABLE `material_standard` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_standard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_standard_review`
--

DROP TABLE IF EXISTS `material_standard_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_standard_review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price_record_id` bigint NOT NULL,
  `material_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `specification` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `unit_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `process_segment_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `original_process_segment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `raw_price_excluding_tax` decimal(18,2) DEFAULT NULL,
  `raw_price_including_tax` decimal(18,2) DEFAULT NULL,
  `dify_request_json` longtext COLLATE utf8mb4_general_ci,
  `dify_answer_text` longtext COLLATE utf8mb4_general_ci,
  `dify_result_json` longtext COLLATE utf8mb4_general_ci,
  `standard_category_level3_id` bigint DEFAULT NULL,
  `standard_std_name_id` bigint DEFAULT NULL,
  `standard_unit_id` bigint DEFAULT NULL,
  `standard_segment_id` bigint DEFAULT NULL,
  `standard_attr_value_ids_json` longtext COLLATE utf8mb4_general_ci,
  `standard_code` varchar(16) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `conversion_factor` decimal(18,6) DEFAULT '1.000000',
  `normalized_price_excluding_tax` decimal(18,2) DEFAULT NULL,
  `normalized_price_including_tax` decimal(18,2) DEFAULT NULL,
  `standardization_status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING',
  `source_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'DIFY',
  `error_message` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `standardized_at` datetime DEFAULT NULL,
  `del_flag` char(1) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_review_price_record_id` (`price_record_id`),
  KEY `idx_review_raw_match` (`material_name`,`specification`,`unit_name`),
  KEY `idx_review_status` (`standardization_status`),
  KEY `idx_review_standard_code` (`standard_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_standard_review`
--

LOCK TABLES `material_standard_review` WRITE;
/*!40000 ALTER TABLE `material_standard_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_standard_review` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-31 17:45:19
