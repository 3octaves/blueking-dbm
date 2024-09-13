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

import { AccountTypes, type ClusterTypes } from '@common/const';

import http from '../http';
import type { ListBase } from '../types';

const getRootPath = () => `/apis/mysql/bizs/${window.PROJECT_CONFIG.BIZ_ID}/permission/account`;

interface PrivsForIp {
  ip: string;
  dbs: Array<{
    db: string;
    domains: Array<{
      immute_domain: string;
      users: Array<{
        user: string;
        match_ips: Array<{
          match_ip: string;
          match_dbs: Array<{
            match_db: string;
            priv: string;
          }>;
        }>;
      }>;
    }>;
  }>;
}

interface PrivsForCluster {
  immute_domain: string;
  users: Array<{
    user: string;
    match_ips: Array<{
      match_ip: string;
      match_dbs: Array<{
        match_db: string;
        priv: string;
        ip_dbs: Array<{
          ip: string;
          db: string;
        }>;
      }>;
    }>;
  }>;
}

/**
 * 查询权限清单
 */
export const getAccountPrivs = (params: {
  ips: string;
  immute_domains: string;
  users: string;
  account_type: AccountTypes;
  cluster_type: ClusterTypes;
  dbs?: string;
  format_type?: string; // 'ip' | 'cluster';
  limit?: number;
  offset?: number;
}) =>
  http.get<{
    match_ips_count: number;
    results: {
      privs_for_ip: PrivsForIp[] | null;
      privs_for_cluster: PrivsForCluster[] | null;
      has_priv: string[] | null;
      no_priv: string[] | null;
    };
  }>(`${getRootPath()}/get_account_privs/`, params);

/**
 * 下载权限清单
 */
export const getDownloadPrivs = (params: {
  ips: string;
  immute_domains: string;
  users: string;
  account_type: AccountTypes;
  cluster_type: ClusterTypes;
  dbs?: string;
  format_type?: string; // 'ip' | 'cluster';
}) => http.get<string>(`${getRootPath()}/get_download_privs/`, params, { responseType: 'blob' });

/**
 * 查询用户列表
 */
export const getAccountUsers = (params: {
  ips: string;
  immute_domains: string;
  account_type: AccountTypes;
  cluster_type: ClusterTypes;
  limit?: number;
  offset?: number;
}) => http.get<ListBase<string[]>>(`${getRootPath()}/get_account_users/`, params);
