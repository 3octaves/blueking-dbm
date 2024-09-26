import type { DetailBase, DetailClusters } from '../common';

export interface TemporaryDestroy extends DetailBase {
  clusters: DetailClusters;
  cluster_ids: number[];
}
