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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '67b148dc-ebb1-11f0-a335-0fb9751d32a3:1-22714';

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

--
-- Table structure for table `material_price_record`
--

DROP TABLE IF EXISTS `material_price_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_price_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `material_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `specification` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category_level1_id` bigint DEFAULT NULL,
  `category_level2_id` bigint DEFAULT NULL,
  `category_level3_id` bigint DEFAULT NULL,
  `process_segment_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unit_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `brand_name` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` decimal(18,4) NOT NULL DEFAULT '1.0000',
  `price_excluding_tax` decimal(18,2) NOT NULL,
  `tax_rate` decimal(6,2) NOT NULL,
  `price_including_tax` decimal(18,2) NOT NULL,
  `source_project` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_time` varchar(7) COLLATE utf8mb4_general_ci NOT NULL,
  `price_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `supplier_company` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch_id` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `del_flag` char(1) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `create_by` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `update_by` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `standardization_status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING' COMMENT '标准化状态',
  `standard_review_id` bigint DEFAULT NULL COMMENT '标准化复核ID',
  `standard_code` varchar(16) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标准化编码',
  `standard_category_level3_id` bigint DEFAULT NULL COMMENT '标准三级分类ID',
  `standard_std_name_id` bigint DEFAULT NULL COMMENT '标准材料名称ID',
  `standard_unit_id` bigint DEFAULT NULL COMMENT '标准单位ID',
  `standard_segment_id` bigint DEFAULT NULL COMMENT '标准工艺段ID',
  `standard_attr_value_ids_json` longtext COLLATE utf8mb4_general_ci COMMENT '标准属性值ID列表',
  `normalized_price_excluding_tax` decimal(18,2) DEFAULT NULL COMMENT '标准化不含税价',
  `normalized_price_including_tax` decimal(18,2) DEFAULT NULL COMMENT '标准化含税价',
  `standardization_error` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标准化错误信息',
  `standardized_at` datetime DEFAULT NULL COMMENT '标准化时间',
  PRIMARY KEY (`id`),
  KEY `idx_material_price_key` (`material_name`,`specification`,`purchase_time`),
  KEY `idx_material_price_supplier` (`supplier_company`),
  KEY `idx_material_price_batch` (`batch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_price_record`
--

LOCK TABLES `material_price_record` WRITE;
/*!40000 ALTER TABLE `material_price_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_price_record` ENABLE KEYS */;
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

-- Dump completed on 2026-03-31 17:57:44
