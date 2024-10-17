import type { DetailBase, DetailClusters } from '../common';

export interface ScriptExecute extends DetailBase {
  clusters: DetailClusters;
  cluster_ids: number[];
  mode: string;
  scripts: {
    name: string;
    content: string;
  }[];
}
