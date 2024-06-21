/**
 * 用户个人设置 keys
 */
// mysql
export enum UserPersonalSettings {
  MYSQL_TOOLBOX_FAVOR = 'MYSQL_TOOLBOX_FAVOR_1',
  MYSQL_TOOLBOX_MENUS = 'MYSQL_TOOLBOX_MENUS_1',
  TENDBSINGLE_TABLE_SETTINGS = 'TENDBSINGLE_TABLE_SETTINGS',
  TENDBHA_TABLE_SETTINGS = 'TENDBHA_TABLE_SETTINGS',
  TENDBHA_INSTANCE_SETTINGS = 'TENDBHA_INSTANCE_SETTINGS',
}
// spider(tendbcluster)
export enum UserPersonalSettings {
  SPIDER_TOOLBOX_FAVOR = 'SPIDER_TOOLBOX_FAVOR_1',
  SPIDER_TOOLBOX_MENUS = 'SPIDER_TOOLBOX_MENUS_1',
  TENDBCLUSTER_TABLE_SETTINGS = 'TENDBCLUSTER_TABLE_SETTINGS',
  TENDBCLUSTER_INSTANCE_TABLE = 'TENDBCLUSTER_INSTANCE_TABLE',
}
// redis
export enum UserPersonalSettings {
  REDIS_TABLE_SETTINGS = 'REDIS_TABLE_SETTINGS',
  REDIS_TOOLBOX_FAVOR = 'REDIS_TOOLBOX_FAVOR_1',
  REDIS_TOOLBOX_MENUS = 'REDIS_TOOLBOX_MENUS_1',
  REDIS_INSTANCE_SETTINGS = 'REDIS_INSTANCE_SETTINGS',
  REDIS_HA_TABLE_SETTINGS = 'REDIS_HA_TABLE_SETTINGS',
  REDIS_HA_INSTANCE_SETTINGS = 'REDIS_HA_INSTANCE_SETTINGS',
}
// bigdata
export enum UserPersonalSettings {
  INFLUXDB_TABLE_SETTINGS = 'INFLUXDB_TABLE_SETTINGS',
  HDFS_TABLE_SETTINGS = 'HDFS_TABLE_SETTINGS',
  ES_TABLE_SETTINGS = 'ES_TABLE_SETTINGS',
  KAFKA_TABLE_SETTINGS = 'KAFKA_TABLE_SETTINGS',
  PULSAR_TABLE_SETTINGS = 'PULSAR_TABLE_SETTINGS',
}
// mongo
export enum UserPersonalSettings {
  MONGO_TOOLBOX_FAVOR = 'MONGO_TOOLBOX_FAVOR_1',
  MONGO_TOOLBOX_MENUS = 'MONGO_TOOLBOX_MENUS_1',
  MONGODB_INSTANCE_TABLE_SETTINGS = 'MONGODB_INSTANCE_TABLE_SETTINGS',
  MONGODB_REPLICA_SET_SETTINGS = 'MONGODB_REPLICA_SET_SETTINGS',
  MONGODB_SHARED_CLUSTER_SETTINGS = 'MONGODB_SHARED_CLUSTER_SETTINGS',
}
// sqlserver
export enum UserPersonalSettings {
  SQLSERVER_TOOLBOX_MENUS = 'SQLSERVER_TOOLBOX_MENUS',
  SQLSERVER_TOOLBOX_FAVOR = 'SQLSERVER_TOOLBOX_FAVOR',
  SQLSERVER_SINGLE_TABLE_SETTINGS = 'SQLSERVER_SINGLE_TABLE_SETTINGS',
  SQLSERVER_HA_TABLE_SETTINGS = 'SQLSERVER_HA_TABLE_SETTINGS',
  SQLSERVER_HA_INSTANCE_SETTINGS = 'SQLSERVER_HA_INSTANCE_SETTINGS',
}
// quicksearch
export enum UserPersonalSettings {
  QUICK_SEARCH_CLUSTER_DOMAIN = 'QUICK_SEARCH_CLUSTER_DOMAIN',
  QUICK_SEARCH_CLUSTER_NAME = 'QUICK_SEARCH_CLUSTER_NAME',
  QUICK_SEARCH_INSTANCE = 'QUICK_SEARCH_INSTANCE',
  QUICK_SEARCH_RESOURCE_POOL = 'QUICK_SEARCH_RESOURCE_POOL',
  QUICK_SEARCH_TASK = 'QUICK_SEARCH_TASK',
}
export enum UserPersonalSettings {
  APP_FAVOR = 'APP_FAVOR',
  ACTIVATED_APP = 'ACTIVATED_APP',
  DBHA_SWITCH_EVENTS = 'DBHA_SWITCH_EVENTS',
  SPECIFICATION_TABLE_SETTINGS = 'SPECIFICATION_TABLE_SETTINGS',
  SERVICE_APPLY_FAVOR = 'SERVICE_APPLY_FAVOR',
  RESOURCE_POOL_SELECTOR_SETTINGS = 'RESOURCE_POOL_SELECTOR_SETTINGS',
}