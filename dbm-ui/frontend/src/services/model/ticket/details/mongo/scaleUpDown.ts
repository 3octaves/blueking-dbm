import type { DetailBase } from '../common';

export interface ScaleUpDown extends DetailBase {
  infos: {
    cluster_id: number;
    shard_machine_group: number;
    shard_node_count: number;
  }[];
  ip_source: string;
}
