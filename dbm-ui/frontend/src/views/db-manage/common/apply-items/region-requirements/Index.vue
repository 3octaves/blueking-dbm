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
      :disaster-tolerance-level="modelValue.disaster_tolerance_level"
      :region="modelValue.bk_cloud_region" />
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
        /** 地域标识；随机时 default */
        bk_cloud_region: string;
        /** 可用区名列表，随机（跨可用区随机 / 跨机架 / 无）时不传 */
        bk_cloud_zone_list?: string[];
      };
    };
    /** 历史单据 sub_zone_ids 可能是园区数字 id，zones 组件内部降级为随机 */
    setInitSubzone: (zoneIds: Array<number | string>) => void;
  }

  defineProps<Props>();
  const emits = defineEmits<Emits>();

  const modelValue = defineModel<{
    bk_cloud_id: number;
    /** 地域标识，随机为 default */
    bk_cloud_region: string;
    disaster_tolerance_level: string;
    /** 可用区名称；历史单据为园区数字 id */
    sub_zone_ids: Array<number | string>;
  }>({
    required: true,
  });

  const { t } = useI18n();

  const zonesRef = useTemplateRef('zonesRef');

  // 跨可用区（含 mongodb 强/弱）/ 指定可用区才填写可用区，跨机架与无只填到地域；地域随机时也不填
  const showZoneItem = computed(
    () =>
      [
        Affinity.CROS_SUBZONE,
        Affinity.CROSS_SUBZONE_STRONG,
        Affinity.CROSS_SUBZONE_WEAK,
        Affinity.SAME_SUBZONE,
        Affinity.SAME_SUBZONE_CROSS_SWTICH,
      ].includes(modelValue.value.disaster_tolerance_level as Affinity) &&
      Boolean(modelValue.value.bk_cloud_region) &&
      modelValue.value.bk_cloud_region !== 'default',
  );

  // 容灾级别 / 地域变化导致可用区隐藏时，zones 组件已卸载、内部清空 watch 不再执行，这里兜底重置
  watch(showZoneItem, (visible) => {
    if (!visible) {
      modelValue.value.sub_zone_ids = [];
    }
  });

  const handleCloudChange = (value: { id: number | string; name: string }) => {
    emits('cloud-change', value);
  };

  defineExpose<Expose>({
    getValue() {
      const {
        bk_cloud_region: region,
        disaster_tolerance_level: affinity,
        sub_zone_ids: subZoneIds,
      } = modelValue.value;
      // 随机用不传 bk_cloud_zone_list 表达，不传空数组占位
      const locationSpec: {
        bk_cloud_region: string;
        bk_cloud_zone_list?: string[];
      } = {
        bk_cloud_region: region || 'default',
      };
      if (subZoneIds.length > 0 && subZoneIds.every((item) => typeof item === 'string')) {
        locationSpec.bk_cloud_zone_list = subZoneIds as string[];
      }
      return {
        affinity,
        location_spec: locationSpec,
      };
    },
    // 历史单据的园区数字 id 会在 zones 组件内降级为随机
    setInitSubzone(zoneIds: Array<number | string>) {
      modelValue.value.sub_zone_ids = zoneIds;
      zonesRef.value?.setInitZones(zoneIds);
    },
  });
</script>
