import _ from 'lodash';

import type { ClusterListNode } from '@services/types';

import type { DBTypeOf, GroupedClusterTypes } from '@common/const';

import { isRecentDays, utcDisplayTime } from '@utils';

import { t } from '@locales/index';

export default class ClusterBase<T extends GroupedClusterTypes = GroupedClusterTypes> {
  static getRoleFaildInstanceList = (data: ClusterListNode[]) => _.filter(data, (item) => item.status !== 'running');

  cluster_subzone_ids: number[];
  cluster_subzones: string[];
  /** 可用区（后端直接返回，前端不做园区反查） */
  cluster_zone_ids: number[];
  cluster_zones: string[];
  create_at: string;
  db_type: DBTypeOf<T>;
  id: number;
  phase: string;
  region: string;
  tags: {
    id: number;
    is_builtin: boolean;
    key: string;
    system: boolean;
    value: string;
  }[];
  update_at: string;

  constructor(payload: ClusterBase<T>) {
    this.create_at = payload.create_at;
    this.id = payload.id;
    this.db_type = payload.db_type;
    this.phase = payload.phase;
    this.tags = payload.tags || [];
    this.update_at = payload.update_at;
    this.cluster_subzone_ids = payload.cluster_subzone_ids || [];
    this.cluster_subzones = payload.cluster_subzones || [];
    this.cluster_zone_ids = payload.cluster_zone_ids || [];
    this.cluster_zones = payload.cluster_zones || [];
    this.region = payload.region;
  }

  get availableTags() {
    return _.sortBy(this.tags, (item) => item.key).filter((item) => !item.system);
  }

  get clusterSubzonesDisplay() {
    if (this.cluster_subzone_ids.length === 0) {
      return t('随机');
    }
    return this.cluster_subzones.join('，');
  }

  /** 可用区展示值：空值显示「随机」 */
  get clusterZonesDisplay() {
    if (this.cluster_zone_ids.length === 0) {
      return t('随机');
    }
    return this.cluster_zones.join('，');
  }

  get createAtDisplay() {
    return utcDisplayTime(this.create_at);
  }

  get isNew() {
    return isRecentDays(this.create_at, 24);
  }

  get isOffline() {
    return this.phase === 'offline';
  }

  get isOnline() {
    return this.phase === 'online';
  }

  get masterDomain() {
    // @ts-expect-error 兼容多种集群读取访问入口信息
    return this.master_domain || this.domain || '';
  }

  get regionDisplay() {
    if (!this.region || this.region === 'default') {
      return t('随机');
    }
    return this.region;
  }

  get updateAtDisplay() {
    return utcDisplayTime(this.update_at);
  }
}
