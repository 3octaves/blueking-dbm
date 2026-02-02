import { ClusterTypes } from '@common/const';

import { t } from '@/locales';

export const tabListMap: Record<ISupportKey, string> = {
  [ClusterTypes.MONGO_REPLICA_SET]: t('Mongo 副本集'),
  [ClusterTypes.MONGO_SHARED_CLUSTER]: t('Mongo 分片'),
  [ClusterTypes.SQLSERVER_HA]: t('SqlServer 主从'),
  [ClusterTypes.SQLSERVER_SINGLE]: t('SqlServer 单节点'),
  [ClusterTypes.TENDBCLUSTER]: t('Tendb Cluster-主域名'),
  [ClusterTypes.TENDBCLUSTER_SLAVE]: t('Tendb Cluster-从域名'),
  [ClusterTypes.TENDBHA]: t('Mysql 主从-主域名'),
  [ClusterTypes.TENDBHA_SLAVE]: t('Mysql 主从-从域名'),
  [ClusterTypes.TENDBSINGLE]: t('Mysql 单节点'),
};
