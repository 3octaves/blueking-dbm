/**
 * 创建补货单
 */
export interface CreateReplenish {
  city: string;
  count: number;
  db_type: string;
  os_name: string;
  /** 地域（region，新口径；city 保留兼容） */
  region?: string;
  spec_id: number;
  subzone: string;
  zone?: string; // 可用区
  zone_id?: number; // 可用区 id
}

/**
 * 补货单详情
 */
export default class Replenish implements CreateReplenish {
  city: string;
  count: number;
  db_type: string;
  operator: string;
  os_name: string;
  record_id: number;
  region: string;
  spec: {
    cpu: {
      max: number;
      min: number;
    };
    creator: string;
    desc: string;
    device_class: string[];
    enable: boolean;
    instance_num: number;
    mem: {
      max: number;
      min: number;
    };
    qps: {
      max: number;
      min: number;
    };
    spec_cluster_type: string;
    spec_id: number;
    spec_machine_type: string;
    spec_name: string;
    storage_spec: {
      max: number;
      min: number;
      mount_point: string;
      size: number;
      type: string;
    }[];
    updater: string;
  };
  spec_id: number;
  subzone: string;
  zone: string;
  zone_id: number;

  constructor(payload = {} as Replenish) {
    this.db_type = payload.db_type || '';
    this.spec_id = payload.spec_id || 0;
    this.city = payload.city || '';
    this.subzone = payload.subzone || '';
    this.region = payload.region || '';
    this.zone = payload.zone || '';
    this.zone_id = payload.zone_id || 0;
    this.os_name = payload.os_name || '';
    this.count = payload.count || 0;
    this.operator = payload.operator || '';
    this.spec = payload.spec || {};
    this.record_id = payload.record_id || 0;
  }
}
