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

import type { ClusterTypes } from '@common/const';

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
 * 查询可用区信息
 * 传 city_code 返回该城市下的可用区；不传返回全量
 */
// TODO: list_cloud_subzones 接口未上线，先用 mock 数据联调，后端就绪后恢复 http.get 实现
export function getInfrasCloudSubzones(params?: { city_code?: string }) {
  const mockData: {
    bk_cloud_region: string;
    bk_cloud_zone: string;
    /** 该可用区下的园区名称列表 */
    subzones: string[];
  }[] = [
    {
      bk_cloud_region: '深圳',
      bk_cloud_zone: '深圳一可用区',
      subzones: ['深圳一区（全称）', '深圳二区（全称）', '深圳三区（全称）', '深圳四区（全称）'],
    },
    {
      bk_cloud_region: '深圳',
      bk_cloud_zone: '深圳二可用区',
      subzones: ['深圳五区（全称）'],
    },
    {
      bk_cloud_region: 'shanghai',
      bk_cloud_zone: '上海一可用区',
      subzones: ['上海一区（全称）', '上海二区（全称）'],
    },
    {
      bk_cloud_region: 'shanghai',
      bk_cloud_zone: '上海二可用区',
      subzones: ['上海三区（全称）', '上海四区（全称）'],
    },
    {
      bk_cloud_region: '广州',
      bk_cloud_zone: '广州一可用区',
      subzones: ['广州一区（全称）'],
    },
    {
      bk_cloud_region: '南京',
      bk_cloud_zone: '南京一可用区',
      subzones: ['南京一区（全称）', '南京二区（全称）'],
    },
    {
      bk_cloud_region: '南京',
      bk_cloud_zone: '南京二可用区（无园区）',
      subzones: [],
    },
  ];

  return Promise.resolve(
    params?.city_code ? mockData.filter((item) => item.bk_cloud_region === params.city_code) : mockData,
  );

  // 后端就绪后恢复：
  // return http.get<
  //   {
  //     bk_cloud_region: string;
  //     bk_cloud_zone: string;
  //     /** 该可用区下的园区名称列表 */
  //     subzones: string[];
  //   }[]
  // >(`${path}/cities/list_cloud_subzones/`, params);
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
