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

import { cloudZoneNameMap, type ClusterTypes } from '@common/const';

import http from '../http';

const path = '/apis/infras';

interface CityItem {
  city_code: string;
  city_name: string;
  inventory: number;
  inventory_tag: string;
}

/**
 * 查询服务器资源的城市信息
 */
export const getInfrasCities = () => http.get<CityItem[]>('/apis/infras/cities/');

/**
 * 查询服务器资源的常用和非常用城市信息
 */
export const getCommonCities = () =>
  http.get<{
    common: CityItem[];
    internal: CityItem[];
  }>('/apis/infras/cities/list_common_cities/');

/**
 * 查询服务器资源的城市信息
 */
export function listLogicCities() {
  return http.get<
    {
      bk_idc_city_id: number;
      bk_idc_city_name: string;
      logical_city: number;
      logical_city_name: string;
    }[]
  >(`${path}/cities/list_logic_cities/`);
}

/**
 * 查询城市园区信息
 * @param params.bk_cloud_zone 可用区名称，用于按可用区收窄园区
 */
export function getInfrasSubzonesByCity(params?: { bk_cloud_zone?: string; city_code?: string }) {
  return http.get<
    {
      bk_city: number;
      bk_city_code: string;
      bk_sub_zone: string;
      bk_sub_zone_id: number;
    }[]
  >(`${path}/cities/list_subzones/`, params);
}

/**
 * 查询可用区信息（含该可用区下登记过的全部园区）
 * @param params.city_code 按城市过滤；
 * @param params.region 按地域过滤；均不传返回全量
 */
// TODO: list_cloud_zones 接口未上线，先用 mock 数据联调，后端就绪后恢复 http.get 实现
export function getInfrasCloudZones(params?: { city_code?: string; region?: string }) {
  /** 可用区标识前缀 → 所属城市（mock 用；部署页 city_code 为中文城市名，分组比对按此值） */
  const regionCityMap: Record<string, string> = {
    'ap-chongqing': '重庆',
    'ap-guangzhou': '广州',
    'ap-hongkong': '香港',
    'ap-nanjing': '南京',
    'ap-shanghai': '上海',
    'ap-shenyang-ec': '沈阳',
    'ap-shenzhen': '深圳',
    'ap-singapore': '新加坡',
    'ap-tianjin': '天津',
    'ap-xian-ec': '西安',
  };

  /** 特例园区：覆盖卡片三种展示形态——空园区、超 3 个（共 N 个 hover 气泡）、常规 1-2 个 */
  const mockSubZonesOverride: Record<string, string[]> = {
    'ap-guangzhou-3': ['广州-黄埔', '广州-天河', '广州-南沙', '广州-番禺'],
    'ap-hongkong-2': [],
    'ap-nanjing-1': ['南京-江宁', '南京-雨花台'],
  };

  const getRegionCity = (zone: string) =>
    Object.keys(regionCityMap).find((region) => zone.startsWith(`${region}-`)) || '';

  // mock 数据由 cloudZoneNameMap 的真实可用区标识派生：城市名作 bk_cloud_region，园区给占位值
  const mockData = Object.keys(cloudZoneNameMap).map((zone) => {
    const city = regionCityMap[getRegionCity(zone)];
    return {
      bk_cloud_region: city,
      bk_cloud_zone: zone,
      /** 该可用区下登记过的全部园区名称 */
      sub_zones: mockSubZonesOverride[zone] || [`${city}-园区一`, `${city}-园区二`],
    };
  });

  const keyword = params?.city_code || params?.region;
  return Promise.resolve(keyword ? mockData.filter((item) => item.bk_cloud_region === keyword) : mockData);

  // 后端就绪后恢复：
  // return http.get<
  //   {
  //     bk_cloud_region: string;
  //     bk_cloud_zone: string;
  //     /** 该可用区下登记过的全部园区名称 */
  //     sub_zones: string[];
  //   }[]
  // >(`${path}/cities/list_cloud_zones/`, params);
}

/**
 * redis 容量列表
 */
export function getCapSpecs(params: {
  cityCode: string;
  cluster_type: ClusterTypes;
  ip_source: string;
  nodes: {
    master: Array<{
      bk_biz_id: number;
      bk_cloud_id: number;
      bk_cpu?: number;
      bk_disk?: number;
      bk_host_id: number;
      bk_mem?: number;
      ip: string;
    }>;
    slave: Array<{
      bk_biz_id: number;
      bk_cloud_id: number;
      bk_cpu?: number;
      bk_disk?: number;
      bk_host_id: number;
      bk_mem?: number;
      ip: string;
    }>;
  };
}) {
  return http.post<
    {
      cap_key: string;
      group_num: number;
      max_disk: number;
      maxmemory: number;
      selected: boolean;
      shard_num: number;
      spec: string;
      total_disk: string;
      total_memory: number;
    }[]
  >(`${path}/cities/cap_specs/`, params);
}

/**
 * 查询集群类型
 */
export function fetchDbTypeList() {
  return http.get<
    Array<{
      id: string;
      name: string;
    }>
  >(`${path}/dbtype/list_db_types/`);
}

/**
 * 服务器规格列表
 */
export function getInfrasHostSpecs() {
  return http.get<
    {
      cpu: string;
      mem: string;
      spec: string;
      type: string;
    }[]
  >(`${path}/cities/host_specs/`);
}
