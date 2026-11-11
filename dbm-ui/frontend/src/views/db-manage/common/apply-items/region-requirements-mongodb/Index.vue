<!--
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
-->

<template>
  <DbCard :title="t('容灾要求')">
    <DisasterToleranceLevelItem v-model="modelValue.disaster_tolerance_level" />
    <CloudItem
      v-model="modelValue.bk_cloud_id"
      @change="handleCloudChange" />
    <CityCodeItem v-model="modelValue" />
    <ZonesItem
      v-if="showZoneItem"
      ref="zonesRef"
      v-model="modelValue"
      :city-code="modelValue.city_code"
      :disaster-tolerance-level="modelValue.disaster_tolerance_level" />
  </DbCard>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import { Affinity } from '@common/const';

  import CloudItem from '@views/db-manage/common/apply-items/CloudItem.vue';

  import ZonesItem from '../region-requirements/components/zones/Index.vue';

  import CityCodeItem from './components/CityCode.vue';
  import DisasterToleranceLevelItem from './components/DisasterToleranceLevel.vue';

  type Emits = (e: 'cloud-change', value: { id: number | string; name: string }) => void;

  interface Expose {
    getValue: () => {
      affinity: string;
      location_spec: {
        city: string;
        include_or_exclue?: boolean;
        /** 可用区级别时存可用区名称；指定园区兼容链路存园区 id */
        sub_zone_ids?: Array<number | string>;
      };
    };
    /** 历史单据 sub_zone_ids 可能是园区数字 id，zones 组件内部降级为随机 */
    setInitSubzone: (zoneIds: Array<number | string>) => void;
  }

  const emits = defineEmits<Emits>();

  const modelValue = defineModel<{
    bk_cloud_id: number;
    city_code: string;
    city_name?: string;
    disaster_tolerance_level: string;
    /** 可用区级别存可用区名称；指定园区兼容链路存园区 id */
    sub_zone_ids: Array<number | string>;
    sub_zone_names: string[];
    /** 可用区名称，与 sub_zone_ids 的名称值同步，供资源预览展示 */
    zone_names: string[];
  }>({
    required: true,
  });

  const { t } = useI18n();

  const zonesRef = useTemplateRef('zonesRef');

  // 跨可用区（强/弱等同纯跨可用区）与「指定可用区」需要选择可用区，跨机架、无只填到地域
  const showZoneItem = computed(
    () =>
      [Affinity.CROSS_SUBZONE_STRONG, Affinity.CROSS_SUBZONE_WEAK, Affinity.SAME_SUBZONE_CROSS_SWTICH].includes(
        modelValue.value.disaster_tolerance_level as Affinity,
      ) && modelValue.value.city_code,
  );

  const handleCloudChange = (value: { id: number | string; name: string }) => {
    emits('cloud-change', value);
  };

  defineExpose<Expose>({
    getValue() {
      const { city_code: city, disaster_tolerance_level: affinity, sub_zone_ids: subZoneIds } = modelValue.value;
      // 跨可用区（强/弱等同纯跨可用区）：随机（空）时不传，自选时至少 2 个；sub_zone_ids 值为可用区名称
      if ([Affinity.CROSS_SUBZONE_STRONG, Affinity.CROSS_SUBZONE_WEAK].includes(affinity as Affinity)) {
        if (subZoneIds.length >= 2 && subZoneIds.every((item) => typeof item === 'string')) {
          return {
            affinity,
            location_spec: {
              city,
              sub_zone_ids: subZoneIds,
            },
          };
        }
        return {
          affinity,
          location_spec: {
            city,
          },
        };
      }
      // 指定可用区：必选 1 个
      if (
        affinity === Affinity.SAME_SUBZONE_CROSS_SWTICH &&
        subZoneIds.length === 1 &&
        typeof subZoneIds[0] === 'string'
      ) {
        return {
          affinity,
          location_spec: {
            city,
            sub_zone_ids: subZoneIds,
          },
        };
      }
      // 指定园区（未选可用区时兼容旧链路）/ 无容灾要求-指定地域-指定园区
      if (
        affinity === Affinity.SAME_SUBZONE_CROSS_SWTICH ||
        (affinity === Affinity.NONE && city !== 'default' && subZoneIds.length > 0)
      ) {
        return {
          affinity,
          location_spec: {
            city,
            sub_zone_ids: subZoneIds,
          },
        };
      }

      // 跨机架 / 无容灾要求-随机地域 / 无容灾要求-指定地域-随机园区
      return {
        affinity,
        location_spec: {
          city,
        },
      };
    },
    // 历史单据的园区数字 id 会在 zones 组件内降级为随机
    setInitSubzone(zoneIds: Array<number | string>) {
      modelValue.value.sub_zone_ids = zoneIds;
      zonesRef.value?.setInitZones(zoneIds);
    },
  });
</script>
