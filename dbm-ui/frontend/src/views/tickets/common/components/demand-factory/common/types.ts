/*
 * TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
 *
 * Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */
import type { SpecInfo } from '@services/model/ticket/details/common';

import { ClusterTypes } from '@common/const';

// Sqlserver 集群部署
export interface DetailsSqlserver {
  bk_cloud_id: number;
  charset: string;
  city_code: string;
  city_name: string;
  cluster_count: number;
  db_module_id: number;
  db_module_name: string;
  db_version: string;
  disaster_tolerance_level: string;
  domains: {
    key: string;
    master: string;
    slave: string;
  }[];
  inst_num: number;
  ip_source: string;
  nodes?: {
    [ClusterTypes.SQLSERVER_SINGLE]: {
      ip: string;
      bk_host_id: number;
      bk_cloud_id: number;
      bk_biz_id: number;
    }[];
    [ClusterTypes.SQLSERVER_HA]: {
      ip: string;
      bk_host_id: number;
      bk_cloud_id: number;
      bk_biz_id: number;
    }[];
  };
  resource_spec?: {
    [ClusterTypes.SQLSERVER_SINGLE]: SpecInfo;
    [ClusterTypes.SQLSERVER_HA]: SpecInfo;
  };
  spec: string;
  spec_display: string;
  start_mysql_port: number;
  start_mssql_port: number;
}

export interface RedisHaApply {
  bk_cloud_id: number;
  cluster_type: string;
  disaster_tolerance_level: string;
  append_apply: boolean; // 是否是追加部署
  port?: number; // 追加就非必填
  city_code?: string; // 追加就非必填
  db_version?: string; // 追加就非必填
  infos: {
    databases: number;
    cluster_name: string;
    // 如果是追加部署，则一定有backend_group，表示追加的主机信息
    backend_group?: {
      master: {
        ip: string;
        bk_cloud_id: number;
        bk_host_id: number;
      };
      slave: {
        ip: string;
        bk_cloud_id: number;
        bk_host_id: number;
      };
    };
  }[];
  // 如果是新部署，则一定从资源池部署
  resource_spec: {
    backend_group: SpecInfo;
  };
}

export type TicketDetailTypes = DetailsSqlserver | RedisHaApply;
