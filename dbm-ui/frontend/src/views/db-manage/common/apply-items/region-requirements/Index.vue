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
    <DisasterToleranceLevelItem
      v-model="modelValue.disaster_tolerance_level"
      :type="type" />
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
  import type { ComponentProps } from 'vue-component-type-helpers';
  import { useI18n } from 'vue-i18n';

  import { Affinity } from '@common/const';

  import CloudItem from '@views/db-manage/common/apply-items/CloudItem.vue';

  import CityCodeItem from './components/CityCode.vue';
  import DisasterToleranceLevelItem from './components/DisasterToleranceLevel.vue';
  import ZonesItem from './components/zones/Index.vue';

  interface Props {
    type?: ComponentProps<typeof DisasterToleranceLevelItem>['type'];
  }

  type Emits = (e: 'cloud-change', value: { id: number | string; name: string }) => void;

  interface Expose {
    getValue: () => {
      affinity: string;
      location_spec: {
        city: string;
        include_or_exclue?: boolean;
        sub_zone_ids?: number[];
        zone_ids?: number[];
      };
    };
    setInitSubzone: (subzoneIds: number[]) => void;
    setInitZones: (zoneIds: number[]) => void;
  }

  defineProps<Props>();
  const emits = defineEmits<Emits>();

  const modelValue = defineModel<{
    bk_cloud_id: number;
    city_code: string;
    city_name?: string;
    disaster_tolerance_level: string;
    sub_zone_ids: number[];
    sub_zone_names: string[];
    zone_ids: number[];
    zone_names: string[];
  }>({
    required: true,
  });

  const { t } = useI18n();

  const zonesRef = useTemplateRef('zonesRef');

  // 新规则：跨可用区 / 指定可用区才填写可用区，跨机架与无只填到地域
  const showZoneItem = computed(
    () =>
      [Affinity.CROS_SUBZONE, Affinity.SAME_SUBZONE_CROSS_SWTICH].includes(
        modelValue.value.disaster_tolerance_level as Affinity,
      ) && modelValue.value.city_code,
  );

  const handleCloudChange = (value: { id: number | string; name: string }) => {
    emits('cloud-change', value);
  };

  defineExpose<Expose>({
    getValue() {
      const {
        city_code: city,
        disaster_tolerance_level: affinity,
        sub_zone_ids: subZoneIds,
        zone_ids: zoneIds,
      } = modelValue.value;
      // 跨可用区：随机时不传 zone_ids，自选时至少 2 个
      if (affinity === Affinity.CROS_SUBZONE) {
        if (zoneIds.length >= 2) {
          return {
            affinity,
            location_spec: {
              city,
              sub_zone_ids: subZoneIds,
              zone_ids: zoneIds,
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
      if (affinity === Affinity.SAME_SUBZONE_CROSS_SWTICH && zoneIds.length === 1) {
        return {
          affinity,
          location_spec: {
            city,
            sub_zone_ids: subZoneIds,
            zone_ids: zoneIds,
          },
        };
      }
      // 跨机架 / 无容灾要求（兼容旧链路：无容灾-指定地域-指定园区仍走园区字段）
      if (affinity === Affinity.NONE && city !== 'default' && subZoneIds.length > 0) {
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
    },
    setInitSubzone(subzoneIds: number[]) {
      modelValue.value.sub_zone_ids = subzoneIds;
    },
    setInitZones(zoneIds: number[]) {
      zonesRef.value?.setInitZones(zoneIds);
    },
  });
</script>
