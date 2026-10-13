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
    class="backup-record-selector-dialog"
    :is-show="isShow"
    :width="1080"
    @closed="handleClose">
    <template #header>
      {{ t('选择备份记录') }}
    </template>
    <div class="selector-body">
      <!-- 左栏：备份记录列表 -->
      <div class="pane pane-left">
        <div class="pane-head">
          <BkDatePicker
            v-model="queryTime"
            append-to-body
            :disabled-date="disableQueryDate"
            :shortcuts="queryTimeShortcuts"
            type="datetimerange" />
        </div>
        <BkLoading :loading="isBatchLoading">
          <div class="batch-list">
            <div
              v-for="batchItem in batchList"
              :key="batchItem.backup_identify"
              class="batch-item"
              :class="{
                'is-active': selectedBatch?.backup_identify === batchItem.backup_identify,
              }"
              @click="handleSelectBatch(batchItem)">
              <div class="batch-item__title">
                <span class="batch-item__identify">{{ batchItem.backup_identify }}</span>
                <DbTag
                  v-if="getTopoWarning(batchItem)"
                  class="ml-4"
                  theme="warning">
                  {{ t('拓扑不一致') }}
                </DbTag>
              </div>
              <div class="batch-item__meta">
                {{ batchItem.start_time }} ~ {{ batchItem.end_time }}
                <span class="ml-8">{{ batchItem.backupTypeText }}</span>
                <span class="ml-8">{{ t('n 个分片', { n: batchItem.shard_count }) }}</span>
              </div>
            </div>
            <EmptyStatus
              v-if="!isBatchLoading && batchList.length === 0"
              class="w-100"
              :is-anomalies="false"
              :is-searching="false"
              @refresh="fetchBatches" />
          </div>
        </BkLoading>
      </div>
      <!-- 右栏：构造设置 -->
      <div class="pane pane-right">
        <template v-if="selectedBatch">
          <BkAlert
            v-if="selectedTopoWarning"
            class="mb-12"
            theme="warning"
            :title="selectedTopoWarning" />
          <div class="section">
            <div class="section__label">{{ t('构造范围') }}</div>
            <BkRadioGroup v-model="scope">
              <BkRadio label="all">
                {{ t('全部（n 个分片）', { n: selectedBatch.shard_count }) }}
              </BkRadio>
              <BkRadio label="pick">
                {{ t('指定分片') }}
              </BkRadio>
            </BkRadioGroup>
          </div>
          <template v-if="scope === 'pick'">
            <BkLoading :loading="isShardLoading">
              <DbQuickSearch
                v-model="searchValue"
                class="mb-8"
                :data="searchSelectData"
                @change="handleSearchChange" />
              <div
                v-if="keyRouteWarning"
                class="key-route-warning mb-8">
                {{ keyRouteWarning }}
              </div>
              <BkTable
                class="shard-table"
                :data="filteredShards"
                :max-height="260"
                :outer-border="false"
                row-key="shard_value">
                <TableColumn
                  col-key="selection"
                  :width="60">
                  <template #head>
                    <BkCheckbox
                      :indeterminate="isFilteredIndeterminate"
                      :model-value="isAllFilteredChecked"
                      @change="handleFilterSelectAll" />
                  </template>
                  <template #default="{ row }: { row: RollbackBatchShard }">
                    <BkCheckbox
                      :model-value="Boolean(checkedShardMap[row.shard_value])"
                      @change="(value: boolean) => handleCheckShard(row.shard_value, value)" />
                  </template>
                </TableColumn>
                <TableColumn
                  col-key="shard_value"
                  :min-width="120"
                  :title="t('分片')" />
                <TableColumn
                  col-key="source_instance"
                  :min-width="150"
                  :title="t('备份时实例')">
                  <template #default="{ row }: { row: RollbackBatchShard }">
                    {{ row.source_ip }}:{{ row.source_port }}
                  </template>
                </TableColumn>
                <TableColumn
                  col-key="current_master"
                  :min-width="150"
                  :title="t('当前 Master')">
                  <template #default="{ row }: { row: RollbackBatchShard }">
                    {{ row.current_master || '--' }}
                  </template>
                </TableColumn>
                <TableColumn
                  col-key="backup_end_time"
                  :min-width="180"
                  :title="t('全备结束时间')">
                  <template #default="{ row }: { row: RollbackBatchShard }">
                    {{ row.backup_end_time }}
                  </template>
                </TableColumn>
              </BkTable>
              <EmptyStatus
                v-if="!isShardLoading && filteredShards.length === 0"
                class="w-100"
                :is-anomalies="false"
                :is-searching="hasSearchCondition"
                @clear-search="handleClearSearch" />
            </BkLoading>
          </template>
          <template v-if="hasBinlogArch">
            <div class="section mt-16">
              <div class="section__label">{{ t('构造到') }}</div>
              <BkDatePicker
                v-model="recoveryTimePoint"
                append-to-body
                clearable
                :disabled-date="disableRecoveryDate"
                :placeholder="t('留空则仅用全备')"
                type="datetime" />
              <div
                v-if="isRecoveryInvalid"
                class="recovery-error mt-4">
                {{ t('构造到的时间不能早于 n', { n: localLowerBound }) }}
              </div>
              <template v-if="recoveryTimePoint">
                <BkCheckbox
                  v-model="allowBinlog"
                  class="mt-8">
                  <span>{{ t('binlog 不连续仍构造') }}</span>
                </BkCheckbox>
                <p class="binlog-hint mt-4">
                  {{ t('分片 binlog 不连续时跳过缺失部分继续重放，构造结果可能与原集群数据不一致') }}
                </p>
              </template>
            </div>
          </template>
        </template>
        <div
          v-else
          class="pane-empty">
          {{ t('请先在左侧选择备份记录') }}
        </div>
      </div>
    </div>
    <template #footer>
      <BkButton
        class="mr-8"
        :disabled="isConfirmDisabled"
        theme="primary"
        @click="handleConfirm">
        {{ t('确认选择') }}
      </BkButton>
      <BkButton @click="handleClose">
        {{ t('取消') }}
      </BkButton>
    </template>
  </BkDialog>
</template>

<script setup lang="ts">
  import { Message } from 'bkui-vue';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';

  import RollbackBatch from '@services/model/redis/rollback-batch';
  import RollbackBatchShard from '@services/model/redis/rollback-batch-shard';
  import { getRollbackBatchDetails, getRollbackBatches, getShardRoute } from '@services/source/redisRollback';

  import EmptyStatus from '@components/empty-status/EmptyStatus.vue';

  import { createBackupRecord, hasBinlog, type IBackupRecord } from './backup-record';

  interface Props {
    cluster: {
      cluster_type: string;
      id: number;
    };
  }

  const props = defineProps<Props>();

  const isShow = defineModel<boolean>('isShow', {
    default: false,
  });

  const modelValue = defineModel<IBackupRecord | null>({
    default: null,
  });

  const { t } = useI18n();

  // 查询时间快捷项：同页各行共用（组件实例唯一，状态天然共享），默认最近 3 天
  const queryTimeShortcuts = [1, 3, 7, 15].map((days) => ({
    text: t('最近 n 天', { n: days }),
    value: () => [dayjs().subtract(days, 'day').toDate(), new Date()] as [Date, Date],
  }));

  const searchSelectData = [
    {
      id: 'ip',
      name: 'IP',
    },
    {
      id: 'key',
      name: 'Key',
    },
  ];

  const isBatchLoading = ref(false);
  const isShardLoading = ref(false);

  const queryTime = ref<[Date, Date]>([dayjs().subtract(3, 'day').toDate(), new Date()]);

  const batchList = ref<RollbackBatch[]>([]);
  const currentShardCount = ref(0);
  const selectedBatch = ref<RollbackBatch | null>(null);

  const scope = ref<'all' | 'pick'>('all');
  const checkedShardValues = ref<string[]>([]);
  const shardList = ref<RollbackBatchShard[]>([]);

  const searchValue = ref<Record<string, string>>({});
  const keyRouteShards = ref<string[] | null>(null);
  const keyRouteWarning = ref('');

  const recoveryTimePoint = ref('');
  const allowBinlog = ref(false);

  const lastClusterId = ref(0);
  // 标记 programmatic 赋值，避免 watch 误触发请求
  const isRestoring = ref(false);

  const checkedShardMap = computed(() => Object.fromEntries(checkedShardValues.value.map((item) => [item, true])));

  const hasBinlogArch = computed(() => hasBinlog(props.cluster.cluster_type));

  // 拓扑不一致：备份时分片数与当前集群分片数不同
  const getTopoWarning = (batchItem: RollbackBatch) =>
    currentShardCount.value && batchItem.shard_count !== currentShardCount.value
      ? t('备份时 x 个分片，当前 y 个分片，将按备份时的分片构造', {
          x: batchItem.shard_count,
          y: currentShardCount.value,
        })
      : '';

  const selectedTopoWarning = computed(() => (selectedBatch.value ? getTopoWarning(selectedBatch.value) : ''));

  // 参与构造分片中最晚的全备结束时间（UTC）
  const lowerBound = computed(() => {
    if (!selectedBatch.value) {
      return '';
    }
    if (scope.value === 'all') {
      return selectedBatch.value.end_time;
    }
    const checkedShards = shardList.value.filter((item) => checkedShardMap.value[item.shard_value]);
    if (checkedShards.length === 0) {
      return '';
    }
    return checkedShards.reduce((max, item) => (item.backup_end_time > max ? item.backup_end_time : max), '');
  });

  const localLowerBound = computed(() =>
    lowerBound.value ? dayjs(lowerBound.value).format('YYYY-MM-DD HH:mm:ss') : '',
  );

  const isRecoveryInvalid = computed(
    () =>
      Boolean(recoveryTimePoint.value) &&
      Boolean(lowerBound.value) &&
      dayjs(recoveryTimePoint.value).valueOf() < dayjs(lowerBound.value).valueOf(),
  );

  // IP / Key 过滤（两条件取交集，过滤不影响已勾选分片）
  const filteredShards = computed(() =>
    shardList.value.filter((item) => {
      const ipCondition = searchValue.value.ip;
      if (ipCondition && !item.source_ip.includes(ipCondition.trim())) {
        return false;
      }
      if (keyRouteShards.value && !keyRouteShards.value.includes(item.shard_value)) {
        return false;
      }
      return true;
    }),
  );

  const isAllFilteredChecked = computed(
    () =>
      filteredShards.value.length > 0 && filteredShards.value.every((item) => checkedShardMap.value[item.shard_value]),
  );

  // 是否存在 IP / Key 过滤条件（决定分片列表空态形态）
  const hasSearchCondition = computed(() => Boolean(searchValue.value.ip || keyRouteShards.value));

  const handleClearSearch = () => {
    searchValue.value = {};
    keyRouteShards.value = null;
    keyRouteWarning.value = '';
  };

  const isFilteredIndeterminate = computed(
    () => !isAllFilteredChecked.value && filteredShards.value.some((item) => checkedShardMap.value[item.shard_value]),
  );

  const isConfirmDisabled = computed(() => {
    if (!selectedBatch.value) {
      return true;
    }
    if (scope.value === 'pick' && checkedShardValues.value.length === 0) {
      return true;
    }
    return isRecoveryInvalid.value;
  });

  // 查询时间跨度不得超过 30 天（list_batches 接口限制）
  const disableQueryDate = (date: Date | number) => dayjs(date).isAfter(dayjs(), 'day');

  const disableRecoveryDate = (date: Date | number) => dayjs(date).isAfter(dayjs(), 'day');

  const fetchBatches = () => {
    isBatchLoading.value = true;
    getRollbackBatches({
      cluster_id: props.cluster.id,
      end_time: dayjs(queryTime.value[1]).format('YYYY-MM-DD HH:mm:ssZ'),
      start_time: dayjs(queryTime.value[0]).format('YYYY-MM-DD HH:mm:ssZ'),
    })
      .then((res) => {
        batchList.value = res.batches;
        currentShardCount.value = res.cluster_shards.length;
      })
      .finally(() => {
        isBatchLoading.value = false;
      });
  };

  const fetchShards = (restoreChecked: string[] = []) => {
    if (!selectedBatch.value) {
      return;
    }
    isShardLoading.value = true;
    getRollbackBatchDetails({
      backup_identify: selectedBatch.value.backup_identify,
      cluster_id: props.cluster.id,
    })
      .then((res) => {
        shardList.value = res.shards;
        checkedShardValues.value = restoreChecked.filter((item) =>
          res.shards.some((shardItem) => shardItem.shard_value === item),
        );
      })
      .finally(() => {
        isShardLoading.value = false;
      });
  };

  watch(isShow, (show) => {
    if (!show) {
      return;
    }
    if (lastClusterId.value !== props.cluster.id) {
      lastClusterId.value = props.cluster.id;
      batchList.value = [];
      selectedBatch.value = null;
      shardList.value = [];
      keyRouteShards.value = null;
      keyRouteWarning.value = '';
      searchValue.value = {};
      fetchBatches();
    }
    // 回显本行已选记录；未选过则重置为默认态
    isRestoring.value = true;
    const record = modelValue.value;
    if (record) {
      selectedBatch.value = new RollbackBatch({
        backup_identify: record.backup_identify,
        backup_type: record.backup_type,
        end_time: record.end_time,
        is_all_shards_covered: true,
        is_complete: true,
        shard_count: record.shard_count,
        source_is_all_current: true,
        start_time: record.start_time,
        total_size: 0,
      });
      scope.value = record.scope;
      recoveryTimePoint.value = record.recovery_time_point;
      allowBinlog.value = record.allow_binlog_nonconsecutive;
      if (record.scope === 'pick') {
        fetchShards(record.shard_values);
      } else {
        checkedShardValues.value = [];
        shardList.value = [];
      }
    } else {
      selectedBatch.value = null;
      scope.value = 'all';
      checkedShardValues.value = [];
      shardList.value = [];
      recoveryTimePoint.value = '';
      allowBinlog.value = false;
      keyRouteShards.value = null;
      keyRouteWarning.value = '';
      searchValue.value = {};
    }
    nextTick(() => {
      isRestoring.value = false;
    });
  });

  // 查询时间变化重新拉取批次列表；跨度超过 30 天时截断（list_batches 接口限制）
  watch(queryTime, ([start, end]) => {
    if (!isShow.value || isBatchLoading.value) {
      return;
    }
    if (dayjs(end).diff(start, 'day') > 30) {
      queryTime.value = [start, dayjs(start).add(30, 'day').toDate()];
      Message({
        message: t('查询时间跨度不能超过 30 天'),
        theme: 'warning',
      });
      return;
    }
    selectedBatch.value = null;
    fetchBatches();
  });

  const handleSelectBatch = (batchItem: RollbackBatch) => {
    if (selectedBatch.value?.backup_identify === batchItem.backup_identify) {
      return;
    }
    selectedBatch.value = batchItem;
    // 切换备份记录：构造范围回「全部」、构造到清空、binlog 勾选取消
    isRestoring.value = true;
    scope.value = 'all';
    checkedShardValues.value = [];
    shardList.value = [];
    recoveryTimePoint.value = '';
    allowBinlog.value = false;
    keyRouteShards.value = null;
    keyRouteWarning.value = '';
    searchValue.value = {};
    nextTick(() => {
      isRestoring.value = false;
    });
  };

  watch(scope, (newScope) => {
    if (isRestoring.value) {
      return;
    }
    if (newScope === 'pick' && shardList.value.length === 0) {
      fetchShards(checkedShardValues.value);
    }
    if (newScope === 'all') {
      checkedShardValues.value = [];
    }
  });

  // Key 过滤需经 shard_route 反查所在分片；IP 过滤为本地匹配
  const handleSearchChange = () => {
    const keys = (searchValue.value.key || '')
      .split(/[,\s;，；]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (keys.length === 0) {
      keyRouteShards.value = null;
      keyRouteWarning.value = '';
      return;
    }
    if (!selectedBatch.value) {
      return;
    }
    getShardRoute({
      backup_identify: selectedBatch.value.backup_identify,
      cluster_id: props.cluster.id,
      keys: [...new Set(keys)].slice(0, 500),
    }).then((res) => {
      keyRouteShards.value = res.batch_shard_values;
      if (res.results.some((item) => !item.is_covered)) {
        keyRouteWarning.value = t('该 Key 所在的部分段在备份批次中存在缺口，已尽可能勾选覆盖分片');
      } else {
        keyRouteWarning.value = '';
      }
    });
  };

  const handleCheckShard = (shardValue: string, checked: boolean) => {
    if (checked) {
      checkedShardValues.value = [...checkedShardValues.value, shardValue];
    } else {
      checkedShardValues.value = checkedShardValues.value.filter((item) => item !== shardValue);
    }
  };

  // 表头全选只作用于当前过滤结果
  const handleFilterSelectAll = (checked: boolean) => {
    const filteredValues = filteredShards.value.map((item) => item.shard_value);
    if (checked) {
      checkedShardValues.value = [...new Set([...checkedShardValues.value, ...filteredValues])];
    } else {
      const filteredMap = Object.fromEntries(filteredValues.map((item) => [item, true]));
      checkedShardValues.value = checkedShardValues.value.filter((item) => !filteredMap[item]);
    }
  };

  const handleClose = () => {
    isShow.value = false;
  };

  const handleConfirm = () => {
    if (!selectedBatch.value) {
      return;
    }
    modelValue.value = createBackupRecord({
      allow_binlog_nonconsecutive: recoveryTimePoint.value ? allowBinlog.value : false,
      backup_identify: selectedBatch.value.backup_identify,
      backup_type: selectedBatch.value.backup_type,
      current_shard_count: currentShardCount.value,
      end_time: selectedBatch.value.end_time,
      recovery_time_point: recoveryTimePoint.value,
      scope: scope.value,
      shard_count: selectedBatch.value.shard_count,
      shard_max_backup_end_time: lowerBound.value,
      shard_values: scope.value === 'pick' ? [...checkedShardValues.value] : [],
      start_time: selectedBatch.value.start_time,
    });
    handleClose();
  };
</script>

<style lang="less">
  .backup-record-selector-dialog {
    .selector-body {
      display: flex;
      height: 520px;
      border: 1px solid #dcdee5;
      border-radius: 2px;

      .pane {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .pane-left {
        display: flex;
        flex: 0 0 380px;
        flex-direction: column;
        border-right: 1px solid #dcdee5;

        // BkLoading 的包裹层是普通 div，需让其参与 flex 布局，batch-list 高度才能撑开
        .bk-loading-wrapper {
          display: flex;
          flex: 1;
          min-height: 0;
          flex-direction: column;

          .bk-loading {
            flex: 1;
          }
        }
      }

      .pane-right {
        flex: 1;
        padding: 16px;
        overflow: auto;
      }

      .pane-head {
        padding: 12px 16px;
        border-bottom: 1px solid #dcdee5;
      }

      .batch-list {
        flex: 1;
        min-height: 0;
        overflow: auto;

        .batch-item {
          padding: 10px 16px;
          font-size: 12px;
          color: #63656e;
          cursor: pointer;
          border-bottom: 1px solid #eaebf0;

          &:hover {
            background: #f5f7fa;
          }

          &.is-active {
            background: #e1ecff;
          }

          .batch-item__title {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #313238;
          }

          .batch-item__meta {
            margin-top: 4px;
          }
        }
      }

      .section__label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #313238;
      }

      .key-route-warning {
        padding: 4px 8px;
        font-size: 12px;
        color: #ff9c01;
        background: #fff4e2;
      }

      .recovery-error {
        font-size: 12px;
        color: #ea3636;
      }

      .binlog-hint {
        font-size: 12px;
        color: #979ba5;
      }

      .pane-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #979ba5;
      }
    }
  }
</style>
