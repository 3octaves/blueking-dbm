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
  <BkFormItem
    class="apply-zones-item"
    :label="t('可用区')"
    property="details.zone_ids"
    required
    :rules="formRules">
    <template #label>
      <span
        v-bk-tooltips="t('可用区下任意园区均可命中；同一可用区的不同园区不算分散')"
        class="apply-zones-label">
        {{ t('可用区') }}
      </span>
    </template>
    <BkLoading :loading="loading">
      <div class="apply-zones-cards">
        <!-- 跨可用区：默认随机，可自选至少 2 个 -->
        <ZoneCard
          v-if="isCrossSubzone"
          :selected="isRandomSelected"
          :subzones="[t('所选地域内任选 2 个可用区')]"
          :title="t('随机')"
          @select="handleSelectRandom" />
        <ZoneCard
          v-for="zoneItem in cityZoneList"
          :key="zoneItem.bk_cloud_zone"
          :selected="modelValue.zone_ids.includes(zoneItem.bk_cloud_zone)"
          :subzones="zoneItem.subzones"
          :title="zoneItem.bk_cloud_zone"
          @select="handleSelectZone(zoneItem.bk_cloud_zone)" />
      </div>
    </BkLoading>
  </BkFormItem>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import { Affinity } from '@common/const';

  import ZoneCard from './components/ZoneCard.vue';
  import { useZones } from './hooks/useZones';

  interface Props {
    /** 当前地域值（与可用区数据的 bk_cloud_region 同域比对） */
    cityCode: string;
    disasterToleranceLevel: string;
  }

  interface Expose {
    setInitZones(zoneNames: string[]): void;
  }

  const props = defineProps<Props>();

  const modelValue = defineModel<{
    /** 可用区（接口无独立 id，提交体 zone_ids 字段存可用区名称） */
    zone_ids: string[];
    zone_names: string[];
  }>({
    required: true,
  });

  const { t } = useI18n();

  const { loading, run, zonesByRegion } = useZones();

  // 跨可用区（含 MongoDB 的跨可用区强/弱，等同纯跨可用区）
  const isCrossSubzone = computed(() =>
    [Affinity.CROS_SUBZONE, Affinity.CROSS_SUBZONE_STRONG, Affinity.CROSS_SUBZONE_WEAK].includes(
      props.disasterToleranceLevel as Affinity,
    ),
  );

  /** 当前地域下的可用区卡片数据 */
  const cityZoneList = computed(() => zonesByRegion.value[props.cityCode] || []);

  /** 未选具体可用区时视为随机 */
  const isRandomSelected = computed(() => modelValue.value.zone_ids.length === 0);

  const formRules = [
    {
      required: true,
      trigger: 'change',
      validator: () => {
        if (isCrossSubzone.value) {
          // 随机：默认选中且不校验（可用区是否足够由后端调度兜底）
          if (isRandomSelected.value) {
            return true;
          }
          return modelValue.value.zone_ids.length >= 2 ? true : t('至少选择n个区', { n: 2 });
        }
        // 指定可用区：必选 1 个
        return modelValue.value.zone_ids.length === 1 ? true : t('园区不能为空');
      },
    },
  ];

  watch(
    () => [props.disasterToleranceLevel, props.cityCode],
    () => {
      // 切换级别或地域：清空已选可用区并重置为随机
      modelValue.value.zone_ids = [];
      modelValue.value.zone_names = [];
    },
  );

  watch(
    () => props.cityCode,
    () => {
      if (props.cityCode) {
        run();
      }
    },
    { immediate: true },
  );

  /** 选择随机：清空具体可用区 */
  const handleSelectRandom = () => {
    modelValue.value.zone_ids = [];
    modelValue.value.zone_names = [];
  };

  /** 选择具体可用区：跨可用区为多选，指定可用区为单选 */
  const handleSelectZone = (zoneName: string) => {
    if (isCrossSubzone.value) {
      const zoneIdIndex = modelValue.value.zone_ids.indexOf(zoneName);
      if (zoneIdIndex >= 0) {
        modelValue.value.zone_ids.splice(zoneIdIndex, 1);
      } else {
        modelValue.value.zone_ids.push(zoneName);
      }
    } else {
      modelValue.value.zone_ids = [zoneName];
    }
    // 可用区无独立 id，提交体 zone_ids 存名称，zone_names 与其一致
    modelValue.value.zone_names = [...modelValue.value.zone_ids];
  };

  defineExpose<Expose>({
    setInitZones(zoneNames: string[]) {
      modelValue.value.zone_ids = zoneNames;
      modelValue.value.zone_names = [...zoneNames];
    },
  });
</script>

<style lang="less" scoped>
  .apply-zones-label {
    cursor: pointer;
    border-bottom: 1px dashed #979ba5;
  }

  .apply-zones-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
