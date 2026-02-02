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
  <BkDialog
    class="dbm-cluster-selector"
    :close-icon="false"
    :draggable="false"
    :esc-close="false"
    :is-show="isShow"
    :quick-close="false"
    width="80%"
    @closed="handleClose">
    <BkResizeLayout
      :border="false"
      collapsible
      initial-divide="320px"
      :max="360"
      :min="320"
      placement="right">
      <template #main>
        <PanelTab
          v-model="currentPanelTab"
          :is-empty="isEmpty"
          :keys="keys"
          :unique-panel-settings="localUniquePanelSettings" />
        <Table
          :key="currentPanelTab"
          :current-key="currentPanelTab"
          :data-source-map="dataSourceMap"
          :disable-select-method="disableSelectMethod"
          :selected="currentTableData"
          :single="single"
          :support-offline-data="supportOfflineData"
          @selection="handleSelection" />
      </template>
      <template #aside>
        <PreviewResult
          :cluster-types="keys"
          :last-values="lastValues"
          @change="handlePreviewChange" />
      </template>
    </BkResizeLayout>
    <template #footer>
      <span class="mr-24">
        <slot
          v-if="slots.submitTips"
          :cluster-list="selectedClusterList"
          name="submitTips" />
      </span>
      <span v-bk-tooltips="submitButtonDisabledInfo.tooltips">
        <BkButton
          v-test="{ type: 'button', value: 'clusterSelectorConfirm' }"
          class="w-88"
          :disabled="submitButtonDisabledInfo.disabled || isEmpty"
          :loading="relatedClustersLoading"
          theme="primary"
          @click="handleConfirm">
          {{ t('确定') }}
        </BkButton>
      </span>
      <BkButton
        class="ml-8 w-88"
        @click="handleCancel">
        {{ t('取消') }}
      </BkButton>
    </template>
  </BkDialog>
</template>

<script lang="ts">
  import _ from 'lodash';
  import type { UnwrapRef } from 'vue';
  import type { ComponentProps } from 'vue-component-type-helpers';
  import { useI18n } from 'vue-i18n';

  import { filterClusterEntries } from '@services/source/dbbase';

  import PanelTab from './components/PanelTab.vue';
  import PreviewResult from './components/preview-result/Index.vue';
  import { tabListMap } from './components/tabInfo';
  import Table from './components/table/Index.vue';
  import { type ISupportKey, SupportKey } from './types';

  type IRowData = ServiceReturnType<typeof filterClusterEntries>['results'][number];

  export { type IRowData, type ISupportKey, SupportKey, tabListMap };
</script>
<script setup lang="ts" generic="T extends ISupportKey">
  export interface Props<C extends ISupportKey> {
    dataSourceMap?: {
      [key in C]?: typeof filterClusterEntries;
    };
    disableSelectMethod?: (data: IRowData[]) => boolean | string;
    disableSubmitMethod?: (list: string[]) => string | boolean;
    keys: C[];
    repeatable?: boolean;
    single?: boolean;
    supportOfflineData?: boolean;
    uniquePanelSettings?: boolean | ComponentProps<typeof PanelTab>['uniquePanelSettings'];
  }

  type Emits = {
    (e: 'change', value: UnwrapRef<typeof modelValue>): void;
    (e: 'cancel'): void;
  };

  const props = defineProps<Props<T>>();
  const emits = defineEmits<Emits>();
  const slots = defineSlots<{
    submitTips?: (params: { clusterList: string[] }) => VNode;
  }>();

  const modelValue = defineModel<{ [key in T]: IRowData[] }>({
    required: true,
  });
  const isShow = defineModel<boolean>('isShow', {
    default: false,
  });

  const { t } = useI18n();

  const currentPanelTab = ref(props.keys[0]);
  const lastValues = ref({} as UnwrapRef<typeof modelValue>);
  const relatedClustersLoading = ref(false);

  const currentTableData = computed(() => lastValues.value[currentPanelTab.value] || []);
  const isEmpty = computed(() => Object.values<IRowData[]>(lastValues.value).every((values) => values.length === 0));

  const selectedClusterList = computed(() =>
    Object.values<IRowData[]>(lastValues.value).flatMap((selectedItem) =>
      selectedItem.map((clusterItem) => clusterItem.domain),
    ),
  );

  const submitButtonDisabledInfo = computed(() => {
    const info = {
      disabled: false,
      tooltips: {
        content: '',
        disabled: true,
      },
    };

    if (isEmpty.value) {
      info.disabled = true;
      info.tooltips.disabled = false;
      info.tooltips.content = t('请选择集群');
      return info;
    }

    const checkValue = props.disableSubmitMethod ? props.disableSubmitMethod(selectedClusterList.value) : false;
    if (checkValue) {
      info.disabled = true;
      info.tooltips.disabled = false;
      info.tooltips.content = _.isString(checkValue) ? checkValue : t('无法保存');
    }
    return info;
  });

  const localUniquePanelSettings = computed(() =>
    _.isBoolean(props.uniquePanelSettings) ? { enable: props.uniquePanelSettings } : props.uniquePanelSettings,
  );

  watch(isShow, () => {
    lastValues.value = _.cloneDeep(modelValue.value);
  });

  const handleSelection = (list: IRowData[]) => {
    const lastValuesMemo = { ...lastValues.value };
    lastValues.value = Object.assign(lastValuesMemo, {
      [currentPanelTab.value]: list,
    });
  };

  const handlePreviewChange = (values: UnwrapRef<typeof modelValue>) => {
    lastValues.value = values;
  };

  const handleConfirm = (other?: UnwrapRef<typeof modelValue>) => {
    const result = Object.assign(lastValues.value, other);
    if (!props.repeatable) {
      modelValue.value = result;
    }
    emits('change', result);
    handleClose();
  };

  const handleCancel = () => {
    emits('cancel');
    handleClose();
  };

  const handleClose = () => {
    isShow.value = false;
  };
</script>

<style lang="less">
  .dbm-cluster-selector {
    display: block;
    width: 80%;
    max-width: 1600px;
    min-width: 1200px;

    .bk-modal-header {
      display: none;
    }

    .bk-dialog-content {
      padding: 0;
      margin: 0;
    }
  }
</style>
