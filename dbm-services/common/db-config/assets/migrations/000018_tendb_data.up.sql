-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: bk_dbconfig
-- ------------------------------------------------------
-- Server version	5.7.20-tmysql-3.3-log
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;

--
-- Dumping data for table `tb_config_file_def`
--
-- WHERE:  namespace='tendb'

INSERT INTO `tb_config_file_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_type_lc`, `conf_file_lc`, `level_names`, `level_versioned`, `conf_name_validate`, `conf_value_validate`, `value_type_strict`, `namespace_info`, `version_keep_limit`, `version_keep_days`, `conf_name_order`, `description`, `created_at`, `updated_at`, `updated_by`) VALUES (43,'tendb','init_user','mysql#user','','初始化用户','plat','',0,1,0,'',0,0,0,'初始化用户','2022-04-25 10:19:22','2023-03-22 12:08:50','');
INSERT INTO `tb_config_file_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_type_lc`, `conf_file_lc`, `level_names`, `level_versioned`, `conf_name_validate`, `conf_value_validate`, `value_type_strict`, `namespace_info`, `version_keep_limit`, `version_keep_days`, `conf_name_order`, `description`, `created_at`, `updated_at`, `updated_by`) VALUES (32,'tendb','init_user','proxy#user','','初始化用户','plat','',0,1,0,'',0,0,0,'初始化用户','2022-04-25 10:19:22','2023-03-24 17:35:17','');
INSERT INTO `tb_config_file_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_type_lc`, `conf_file_lc`, `level_names`, `level_versioned`, `conf_name_validate`, `conf_value_validate`, `value_type_strict`, `namespace_info`, `version_keep_limit`, `version_keep_days`, `conf_name_order`, `description`, `created_at`, `updated_at`, `updated_by`) VALUES (193,'tendb','init_user','spider#user','','初始化用户','plat','',0,1,0,'',0,0,0,'初始化用户','2023-03-09 17:40:06','2023-03-24 17:35:35','');
INSERT INTO `tb_config_file_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_type_lc`, `conf_file_lc`, `level_names`, `level_versioned`, `conf_name_validate`, `conf_value_validate`, `value_type_strict`, `namespace_info`, `version_keep_limit`, `version_keep_days`, `conf_name_order`, `description`, `created_at`, `updated_at`, `updated_by`) VALUES (80,'tendb','sys','super_account',NULL,'gcs_admin','plat',NULL,1,1,0,NULL,5,365,0,'gcs_admin','2022-09-19 13:20:56','2023-03-22 12:08:50','');
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: bk_dbconfig
-- ------------------------------------------------------
-- Server version	5.7.20-tmysql-3.3-log
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;

--
-- Dumping data for table `tb_config_name_def`
--
-- WHERE:  namespace='tendb' AND (flag_encrypt!=1 or value_default like '{{%')

INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8855,'tendb','init_user','mysql#user','admin_user','STRING','ADMIN','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:15:45',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8862,'tendb','init_user','mysql#user','backup_user','STRING','dba_bak_all_sel','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:16:09',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8866,'tendb','init_user','mysql#user','monitor_access_all_user','STRING','MONITOR','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:16:21',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8854,'tendb','init_user','mysql#user','monitor_user','STRING','MONITOR','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:15:43',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8868,'tendb','init_user','mysql#user','os_mysql_user','STRING','mysql','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:16:26',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8858,'tendb','init_user','mysql#user','repl_user','STRING','repl','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:15:54',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8864,'tendb','init_user','mysql#user','yw_user','STRING','yw','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2022-09-19 13:16:16',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (8860,'tendb','init_user','proxy#user','proxy_admin_user','STRING','proxy','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2022-05-23 15:54:15','2023-03-24 17:30:13',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (15825,'tendb','init_user','spider#user','tdbctl_user','STRING','tdbctl','','STRING',1,0,1,0,0,NULL,'','',-1,NULL,'','2023-03-09 17:36:33','2023-03-24 17:30:47',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18133,'tendb','mysql_monitor','items-config.yaml','character-consistency','STRING','{\"enable\":true,\"name\":\"character-consistency\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"0 0 14 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18156,'tendb','mysql_monitor','items-config.yaml','ctl-replicate','STRING','{\"enable\":true,\"name\":\"ctl-replicate\",\"role\":[\"spider_master\"],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18159,'tendb','mysql_monitor','items-config.yaml','dbha-heartbeat','STRING','{\"enable\":true,\"name\":\"dbha-heartbeat\",\"role\":[],\"machine_type\":[\"spider\",\"remote\",\"backend\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18137,'tendb','mysql_monitor','items-config.yaml','engine','STRING','{\"enable\":true,\"name\":\"engine\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 12 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18138,'tendb','mysql_monitor','items-config.yaml','ext3-check','STRING','{\"enable\":true,\"name\":\"ext3-check\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 16 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18139,'tendb','mysql_monitor','items-config.yaml','ibd-statistic','STRING','{\"enable\":true,\"name\":\"ibd-statistic\",\"role\":[\"slave\"],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 14 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18140,'tendb','mysql_monitor','items-config.yaml','master-slave-heartbeat','STRING','{\"enable\":true,\"name\":\"master-slave-heartbeat\",\"role\":[\"master\",\"repeater\",\"slave\"],\"machine_type\":[\"backend\",\"remote\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (19012,'tendb','mysql_monitor','items-config.yaml','mysql-config-diff','STRING','{\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"enable\":\"1\",\"name\":\"mysql-config-diff\",\"role\":[],\"schedule\":\"0 5 10 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-11-17 11:44:31','2023-11-17 11:44:31',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18144,'tendb','mysql_monitor','items-config.yaml','mysql-connlog-report','STRING','{\"enable\":true,\"name\":\"mysql-connlog-report\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"0 40 23 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18143,'tendb','mysql_monitor','items-config.yaml','mysql-connlog-rotate','STRING','{\"enable\":true,\"name\":\"mysql-connlog-rotate\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"0 30 23 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18142,'tendb','mysql_monitor','items-config.yaml','mysql-connlog-size','STRING','{\"enable\":true,\"name\":\"mysql-connlog-size\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"0 0 12 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18146,'tendb','mysql_monitor','items-config.yaml','mysql-err-critical','STRING','{\"enable\":true,\"name\":\"mysql-err-critical\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18145,'tendb','mysql_monitor','items-config.yaml','mysql-err-notice','STRING','{\"enable\":true,\"name\":\"mysql-err-notice\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18151,'tendb','mysql_monitor','items-config.yaml','mysql-inject','STRING','{\"enable\":true,\"name\":\"mysql-inject\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18150,'tendb','mysql_monitor','items-config.yaml','mysql-lock','STRING','{\"enable\":true,\"name\":\"mysql-lock\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18152,'tendb','mysql_monitor','items-config.yaml','proxy-backend','STRING','{\"enable\":true,\"name\":\"proxy-backend\",\"role\":[],\"machine_type\":[\"proxy\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18153,'tendb','mysql_monitor','items-config.yaml','proxy-user-list','STRING','{\"enable\":true,\"name\":\"proxy-user-list\",\"role\":[],\"machine_type\":[\"proxy\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18154,'tendb','mysql_monitor','items-config.yaml','rotate-slowlog','STRING','{\"enable\":true,\"name\":\"rotate-slowlog\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\",\"spider\"],\"schedule\":\"0 55 23 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18134,'tendb','mysql_monitor','items-config.yaml','routine-definer','STRING','{\"enable\":true,\"name\":\"routine-definer\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 15 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18155,'tendb','mysql_monitor','items-config.yaml','slave-status','STRING','{\"enable\":true,\"name\":\"slave-status\",\"role\":[\"slave\",\"repeater\"],\"machine_type\":[\"backend\",\"remote\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18149,'tendb','mysql_monitor','items-config.yaml','spider-err-critical','STRING','{\"enable\":true,\"name\":\"spider-err-critical\",\"role\":[],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18147,'tendb','mysql_monitor','items-config.yaml','spider-err-notice','STRING','{\"enable\":true,\"name\":\"spider-err-notice\",\"role\":[],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18148,'tendb','mysql_monitor','items-config.yaml','spider-err-warn','STRING','{\"enable\":true,\"name\":\"spider-err-warn\",\"role\":[],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18157,'tendb','mysql_monitor','items-config.yaml','spider-remote','STRING','{\"enable\":true,\"name\":\"spider-remote\",\"role\":[],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18158,'tendb','mysql_monitor','items-config.yaml','spider-table-schema-consistency','STRING','{\"enable\":true,\"name\":\"spider-table-schema-consistency\",\"role\":[\"spider_master\"],\"machine_type\":[\"spider\"],\"schedule\":\"0 10 1 * * *\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18136,'tendb','mysql_monitor','items-config.yaml','trigger-definer','STRING','{\"enable\":true,\"name\":\"trigger-definer\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 15 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18160,'tendb','mysql_monitor','items-config.yaml','unique-ctl-master','STRING','{\"enable\":true,\"name\":\"unique-ctl-master\",\"role\":[\"spider_master\"],\"machine_type\":[\"spider\"],\"schedule\":\"@every 1m\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
INSERT INTO `tb_config_name_def` (`id`, `namespace`, `conf_type`, `conf_file`, `conf_name`, `value_type`, `value_default`, `value_allowed`, `value_type_sub`, `flag_status`, `flag_disable`, `flag_locked`, `flag_encrypt`, `need_restart`, `value_formula`, `extra_info`, `conf_name_lc`, `order_index`, `since_version`, `description`, `created_at`, `updated_at`, `stage`) VALUES (18135,'tendb','mysql_monitor','items-config.yaml','view-definer','STRING','{\"enable\":true,\"name\":\"view-definer\",\"role\":[],\"machine_type\":[\"single\",\"backend\",\"remote\"],\"schedule\":\"0 0 15 * * 1\"}','','MAP',1,0,0,0,1,NULL,NULL,NULL,-1,NULL,NULL,'2023-10-10 15:19:04','2023-10-10 15:19:04',0);
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

