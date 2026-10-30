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
  <BkComposeFormItem class="search-city-subzones">
    <DbSelect
      v-model="region"
      clearable
      style="width: 100px"
      @change="handleRegionChange">
      <DbOptionGroup group-style="divider">
        <DbOption
          v-for="item in citiyList"
          :key="item.city_code"
          :label="item.city_name"
          :value="item.city_code" />
      </DbOptionGroup>
      <DbOptionGroup group-style="divider">
        <DbOption
          :label="specialOptionLabelMap[SpecialOptions.EMPTY]"
          :value="SpecialOptions.EMPTY" />
      </DbOptionGroup>
    </DbSelect>
    <DbSelect
      v-model="zoneNames"
      collapse-tags
      :disabled="!region"
      filterable
      style="width: 130px"
      @change="handleZoneChange">
      <DbOptionGroup
        v-if="filterZoneList.length > 0"
        group-style="divider">
        <DbOption
          v-for="item in filterZoneList"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </DbOptionGroup>
      <DbOptionGroup group-style="divider">
        <DbOption
          :label="specialOptionLabelMap[SpecialOptions.EMPTY]"
          :value="SpecialOptions.EMPTY" />
      </DbOptionGroup>
    </DbSelect>
    <DbSelect
      v-model="subzoneIds"
      collapse-tags
      :disabled="!zoneNames"
      filterable
      multiple
      multiple-mode="tag"
      show-select-all
      @change="handleChange">
      <DbOptionGroup
        v-if="filterSubzoneList.length > 0"
        group-style="divider">
        <DbOption
          v-for="item in filterSubzoneList"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </DbOptionGroup>
      <DbOptionGroup group-style="divider">
        <DbOption
          :label="specialOptionLabelMap[SpecialOptions.EMPTY]"
          :value="SpecialOptions.EMPTY" />
      </DbOptionGroup>
    </DbSelect>
  </BkComposeFormItem>
</template>
<script setup lang="ts">
  import { useRequest } from 'vue-request';

  import { getCommonCities, getInfrasCloudSubzones, getInfrasSubzonesByCity } from '@services/source/infras';

  import { specialOptionLabelMap, SpecialOptions } from '@common/const';

  type CityItem = ServiceReturnType<typeof getCommonCities>['common'][number];
  type CloudSubzoneItem = ServiceReturnType<typeof getInfrasCloudSubzones>[number];

  interface Props {
    model: Record<string, any>;
  }

  type Emits = (e: 'change', value: any, name?: string) => void;

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<Props>();

  const emits = defineEmits<Emits>();

  const region = defineModel<string>({
    default: '',
  });

  const zoneNames = ref<string>();
  const subzoneIds = ref<string[]>([]);
  const citiyList = ref<CityItem[]>([]);
  const cityZoneList = ref<CloudSubzoneItem[]>([]);

  // 可用区候选（zone 与 region 无归属映射，候选为全量；筛选生效由后端完成）
  const filterZoneList = computed(() =>
    cityZoneList.value.map((item) => ({
      label: item.bk_cloud_zone,
      value: item.bk_cloud_zone,
    })),
  );

  // 园区候选：按已选可用区收窄（可用区的 subzones 园区名列表）
  const filterSubzoneList = computed(() => {
    if (!zoneNames.value) {
      return [];
    }
    const selectedZone = cityZoneList.value.find((item) => item.bk_cloud_zone === zoneNames.value);
    const selectedZoneSubzones = new Set(selectedZone?.subzones || []);
    return (subzoneList.value || [])
      .filter((item) => selectedZoneSubzones.has(item.bk_sub_zone))
      .map((item) => ({
        label: item.bk_sub_zone,
        value: `${item.bk_sub_zone_id}`,
      }));
  });

  useRequest(getCommonCities, {
    onSuccess(data) {
      citiyList.value = data.common.concat(data.internal).filter((item) => item.city_code !== 'default');
    },
  });

  // 可用区候选：随已选地域联动（getInfrasCloudSubzones 按 city_code 过滤）
  const { run: runCloudSubzones } = useRequest(getInfrasCloudSubzones, {
    manual: true,
    onSuccess(data) {
      cityZoneList.value = data;
    },
  });

  // 园区候选：随已选地域 / 可用区联动（getInfrasSubzonesByCity 按 city_code + bk_cloud_zone 过滤）
  const { data: subzoneList, run: runSubzoneList } = useRequest(getInfrasSubzonesByCity, {
    manual: true,
  });

  const fetchZoneList = () => runCloudSubzones({ city_code: region.value || undefined });

  const fetchSubzoneList = () =>
    runSubzoneList({
      bk_cloud_zone: zoneNames.value || undefined,
      city_code: region.value || undefined,
    });

  fetchZoneList();
  fetchSubzoneList();

  watch(
    () => props.model,
    () => {
      if (props.model) {
        region.value = props.model.bk_cloud_region || '';
        const modelZones = props.model.bk_cloud_zone || [];
        zoneNames.value = Array.isArray(modelZones) ? modelZones[0] : modelZones;
        subzoneIds.value = props.model.subzone_ids;
      }
    },
    {
      immediate: true,
    },
  );

  const handleRegionChange = (value: string) => {
    zoneNames.value = '';
    subzoneIds.value = [];
    emits('change', value, 'bk_cloud_region');
    emits('change', '', 'bk_cloud_zone');
    emits('change', [], 'subzone_ids');
    // 地域变化：重取可用区与园区候选
    fetchZoneList();
    fetchSubzoneList();
  };

  const handleZoneChange = (value: string) => {
    subzoneIds.value = [];
    emits('change', value, 'bk_cloud_zone');
    emits('change', [], 'subzone_ids');
    // 可用区变化：重取园区候选
    fetchSubzoneList();
  };

  const handleChange = (value: string[]) => {
    emits('change', value, 'subzone_ids');
  };
</script>
<style lang="less" scoped>
  .search-city-subzones {
    display: flex;
    width: 100%;

    :deep(.bk-compose-form-item-tail) {
      flex: 1;
    }
  }
</style>
