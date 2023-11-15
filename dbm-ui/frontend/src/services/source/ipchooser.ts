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

import http from '../http';
import type {
  HostDetails,
  HostTopoInfo,
} from '../types/ip';

export interface IpScope {
  scope_id: number,
  scope_type: string
  bk_cloud_id?: number | string
}

const path = '/apis/ipchooser';

/**
 * 根据用户手动输入的`IP`/`IPv6`/`主机名`/`host_id`等关键字信息获取真实存在的机器信息
 */
export const checkHost = (params: {
  mode?: string,
  ip_list: string[],
  ipv6_list?: string[],
  key_list?: string[],
  scope_list: IpScope[]
}) => http.post<HostDetails[]>(`${path}/host/check/`, params);

/**
 * 根据主机关键信息获取机器详情信息
 */
export const getHostDetails = (params: {
  mode?: string,
  host_list: Array<Partial<HostDetails>>,
  scope_list: IpScope[]
}) => http.post<HostDetails[]>(`${path}/host/details/`, params);

/**
 * 获取自定义配置，比如表格列字段及顺序
 */
export const getIpSelectorSettings = () => http.post(`${path}/settings/batch_get/`);

/**
 * 保存用户自定义配置
 */
export const updateIpSelectorSettings = (params: any) => http.post(`${path}/settings/set/`, params);

/**
 * 获取主机信息参数
 */
export interface FetchHostInfosParams {
  node_list: Array<{
    instance_id: number,
    object_id: string,
    meta: {
      bk_biz_id: number,
      scope_id: number,
      scope_type: string
    }
  }>,
  page_size: number,
  start: number
  mode?: string
}

/**
 * 根据多个拓扑节点与搜索条件批量分页查询所包含的主机 ID 信息
 */
export const getHostIdInfos = (params: FetchHostInfosParams) => http.post(`${path}/topo/query_host_id_infos/`, params);

/**
 * 根据多个拓扑节点与搜索条件批量分页查询所包含的主机信息
 */
export const getHosts = (params: FetchHostInfosParams) => http.post(`${path}/topo/query_hosts/`, params);

/**
 * 批量获取含各节点主机数量的拓扑树
 */
export const getHostTopo = (params: {
  mode?: string,
  all_scope: boolean,
  scope_list: IpScope[]
}) => http.post(`${path}/topo/trees/`, params);

/**
 * 查询主机拓扑信息
 */
export const getHostTopoInfos = (params: {
  bk_biz_id: number,
  filter_conditions: {
    bk_host_innerip?: string[],
    bk_host_id?: string[],
    mode?: string
  }
}) => http.post<{
  total: number,
  hosts_topo_info: Array<HostTopoInfo>
}>(`${path}/topo/query_host_topo_infos/`, params);

/**
 * 管控区域基本信息
 */
export interface CloudAreaInfo {
  bk_account_id: number,
  bk_cloud_id: number,
  bk_cloud_name: string,
  bk_cloud_vendor: string,
  bk_creator: string,
  bk_last_editor: string,
  bk_region: string,
  bk_status: string,
  bk_status_detail: string,
  bk_supplier_account: string,
  bk_vpc_id: string,
  bk_vpc_name: string,
  create_time: string,
  last_time: string,
}

/**
 * 获取管控区域列表
 */
export const getCloudList = () => http.post<CloudAreaInfo[]>(`${path}/settings/search_cloud_area/`);

/**
 * 查询磁盘类型
 */
export const searchDeviceClass = () => http.get<string[]>(`${path}/settings/search_device_class/`);