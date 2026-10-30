import _ from 'lodash';

import type { ClusterListNode } from '@services/types';

import type { DBTypeOf, GroupedClusterTypes } from '@common/const';

import { isRecentDays, utcDisplayTime } from '@utils';

import { t } from '@locales/index';

export default class ClusterBase<T extends GroupedClusterTypes = GroupedClusterTypes> {
  static getRoleFaildInstanceList = (data: ClusterListNode[]) => _.filter(data, (item) => item.status !== 'running');

  /** 可用区（集群维度，名称列表；接口字段 bk_cloud_zone） */
  bk_cloud_zone: string[];
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
    this.bk_cloud_zone = payload.bk_cloud_zone || [];
    this.region = payload.region;
  }

  get availableTags() {
    return _.sortBy(this.tags, (item) => item.key).filter((item) => !item.system);
  }

  /** 可用区展示值：空值显示「随机」 */
  get clusterZonesDisplay() {
    if (this.bk_cloud_zone.length === 0) {
      return t('随机');
    }
    return this.bk_cloud_zone.join('，');
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
