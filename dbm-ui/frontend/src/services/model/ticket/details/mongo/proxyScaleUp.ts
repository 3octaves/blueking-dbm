import type { DetailBase, DetailClusters, DetailSpecs } from '../common';

export interface ProxyScaleUp extends DetailBase {
  clusters: DetailClusters;
  infos: {
    cluster_id: number;
    resource_spec: {
      mongos: {
        count: number;
        spec_id: number;
      };
    };
    role: string;
  }[];
  is_safe: boolean;
  ip_source: string;
  specs: DetailSpecs;
}
