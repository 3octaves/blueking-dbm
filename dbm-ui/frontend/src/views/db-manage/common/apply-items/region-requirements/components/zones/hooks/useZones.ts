/*
 * TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
 *
 * Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License athttps://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */

import { getInfrasCloudSubzones } from '@services/source/infras';

type CloudSubzoneItem = ServiceReturnType<typeof getInfrasCloudSubzones>[number];

/** 全量请求去重：可用区数据一次拉全，多处共用同一份 Promise */
let cloudSubzonesPromise: Promise<CloudSubzoneItem[]> | null = null;

export function fetchAllCloudSubzones() {
  if (!cloudSubzonesPromise) {
    cloudSubzonesPromise = getInfrasCloudSubzones().catch((error) => {
      cloudSubzonesPromise = null;
      throw error;
    });
  }
  return cloudSubzonesPromise;
}

/**
 * 可用区数据：一次拉全量，按地域（bk_cloud_region）分桶
 * 返回每个地域下的可用区名称列表，用于卡片渲染
 */
export function useZones() {
  const zoneList = shallowRef<CloudSubzoneItem[]>([]);
  const loading = ref(false);

  /** 按地域分桶：bk_cloud_region -> 可用区列表 */
  const zonesByRegion = computed(() => {
    const regionMap: Record<string, CloudSubzoneItem[]> = {};
    zoneList.value.forEach((zoneItem) => {
      if (!regionMap[zoneItem.bk_cloud_region]) {
        regionMap[zoneItem.bk_cloud_region] = [];
      }
      regionMap[zoneItem.bk_cloud_region]!.push(zoneItem);
    });
    return regionMap;
  });

  const run = async () => {
    loading.value = true;
    try {
      zoneList.value = await fetchAllCloudSubzones();
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    run,
    zoneList,
    zonesByRegion,
  };
}
