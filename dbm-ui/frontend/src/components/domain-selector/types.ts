import { ClusterTypes } from '@common/const';

export const enum SupportKey {
  TENDBCLUSTER_SLAVE = 'tendbclusterSlave',
  TENDBHA_SLAVE = 'tendbhaSlave',
}

export type ISupportKey =
  | `${SupportKey}`
  | ClusterTypes.MONGO_REPLICA_SET
  | ClusterTypes.MONGO_SHARED_CLUSTER
  | ClusterTypes.SQLSERVER_HA
  | ClusterTypes.SQLSERVER_SINGLE
  | ClusterTypes.TENDBCLUSTER
  | ClusterTypes.TENDBHA
  | ClusterTypes.TENDBSINGLE;
