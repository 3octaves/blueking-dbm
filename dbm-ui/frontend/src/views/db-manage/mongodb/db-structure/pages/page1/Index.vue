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
  <SmartAction>
    <div class="mongo-rollback-page">
      <BkAlert
        class="alert-tip"
        closable
        theme="info"
        :title="
          t(
            '定点构造：新建一个单节点实例，通过全备 +binlog 的方式，将数据库恢复到过去的某一时间点或者某个指定备份文件的状态',
          )
        " />
      <DbForm
        ref="formRef"
        class="toolbox-form db-struct-form"
        form-type="vertical"
        :model="formData">
        <DbFormItem
          :label="t('时区')"
          required>
          <TimeZonePicker style="width: 450px" />
        </DbFormItem>
        <DbFormItem
          :label="t('集群类型')"
          required>
          <BkRadioGroup
            v-model="clusterType"
            style="width: 400px"
            type="card">
            <BkRadioButton :label="ClusterTypes.MONGO_REPLICA_SET">
              {{ t('副本集集群') }}
            </BkRadioButton>
            <BkRadioButton :label="ClusterTypes.MONGO_SHARED_CLUSTER">
              {{ t('分片集群') }}
            </BkRadioButton>
          </BkRadioGroup>
        </DbFormItem>
        <TargetCluster
          :key="clusterType"
          ref="targetClusterRef"
          :cluster-type="clusterType"
          :is-backup-record-type="isBackupRecordType"
          :selected="selected"
          @change="handleSelectClusters"
          @struct-type-change="handleStructTypeChange" />
        <RenderTargetSpec
          ref="targetSpecRef"
          v-model="formData.specId"
          :cluster-ids="formData.clusterIds"
          :cluster-type="clusterType"
          :data="activeShardMongo"
          :is-shard-cluster="isShardCluster"
          :shard-num="formData.shardNum" />
        <RenderShardNumber
          v-model="formData.shardNum"
          :need-host-num="needHostNum" />
        <RenderDbTable
          v-if="isBackupRecordType"
          ref="dbTableRef"
          :data="tableData" />
        <BkFormItem :label="t('备注')">
          <BkInput
            v-model="formData.remark"
            :maxlength="100"
            :placeholder="t('请提供更多有用信息申请信息_以获得更快审批')"
            style="width: 700px"
            type="textarea" />
        </BkFormItem>
      </DbForm>
    </div>
    <template #action>
      <BkButton
        class="w-88"
        :loading="isSubmitting"
        theme="primary"
        @click="handleSubmit">
        {{ t('提交') }}
      </BkButton>
      <DbPopconfirm
        :confirm-handler="handleReset"
        :content="t('重置将会清空当前填写的所有内容_请谨慎操作')"
        :title="t('确认重置页面')">
        <BkButton
          class="ml8 w-88"
          :disabled="isSubmitting">
          {{ t('重置') }}
        </BkButton>
      </DbPopconfirm>
    </template>
  </SmartAction>
</template>
<script setup lang="tsx">
  import type { ComponentExposed } from 'vue-component-type-helpers';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import MongoDBModel from '@services/model/mongodb/mongodb';
  import { createTicket } from '@services/source/ticket';

  import { useTicketCloneInfo } from '@hooks';

  import { useGlobalBizs } from '@stores';

  import { ClusterTypes, TicketTypes } from '@common/const';

  import TimeZonePicker from '@components/time-zone-picker/index.vue';

  import RenderDbTable from './components/render-db-table/Index.vue';
  import { createRowData, type IDataRow } from './components/render-db-table/Row.vue';
  import TargetCluster from './components/render-target-cluster/Index.vue';
  import RenderShardNumber from './components/RenderShardNumber.vue';
  import RenderTargetSpec from './components/RenderTargetSpec.vue';

  const createDefaultData = () => ({
    clusterIds: [] as number[],
    shardNum: 1,
    specId: '',
    remark: '',
  });

  const router = useRouter();
  const { currentBizId } = useGlobalBizs();
  const { t } = useI18n();

  // 单据克隆
  useTicketCloneInfo({
    type: TicketTypes.MONGODB_RESTORE,
    onSuccess(cloneData) {
      clusterType.value = cloneData.clusterType as ClusterTypes;
      // selected.value = {
      //   [clusterType.value]:
      // }
      formData.specId = String(cloneData.specId);
      formData.shardNum = cloneData.shardNum;
      formData.remark = cloneData.remark;
      if (cloneData.nsFilter) {
        const {
          db_patterns: databases,
          ignore_dbs: databasesIgnore,
          ignore_tables: tables,
          table_patterns: tablesIgnore,
        } = cloneData.nsFilter;
        tableData.value = [
          createRowData({
            databases,
            databasesIgnore,
            tables,
            tablesIgnore,
          }),
        ];
      }
      window.changeConfirm = true;
    },
  });

  const formRef = ref();
  const targetClusterRef = ref<ComponentExposed<typeof TargetCluster>>();
  const targetSpecRef = ref<InstanceType<typeof RenderTargetSpec>>();
  const dbTableRef = ref<InstanceType<typeof RenderDbTable>>();
  const isSubmitting = ref(false);
  const clusterType = ref(ClusterTypes.MONGO_REPLICA_SET);
  const structType = ref('REMOTE_AND_BACKUPID');
  const activeShardMongo = ref({} as MongoDBModel);
  const tableData = shallowRef<Array<IDataRow>>([createRowData()]);
  const selected = shallowRef<Record<string, MongoDBModel[]>>({});

  const formData = reactive(createDefaultData());

  const isBackupRecordType = computed(() => structType.value === 'REMOTE_AND_BACKUPID');
  const isShardCluster = computed(() => clusterType.value === ClusterTypes.MONGO_SHARED_CLUSTER);
  const needHostNum = computed(() => {
    if (activeShardMongo.value?.id) {
      return isShardCluster.value
        ? Math.ceil(activeShardMongo.value.shard_num / formData.shardNum)
        : Math.ceil(formData.clusterIds.length / formData.shardNum);
    }
    return 0;
  });

  watch(clusterType, () => {
    formData.clusterIds = [];
  });

  const handleStructTypeChange = (type: string) => {
    structType.value = type;
  };

  const handleSelectClusters = (list: MongoDBModel[]) => {
    formData.clusterIds = list.map((item) => item.id);
    [activeShardMongo.value] = list;
  };

  const handleSubmit = async () => {
    try {
      isSubmitting.value = true;
      await formRef.value.validate();
      const targetClusters = await targetClusterRef.value!.getValue();
      const targetClusterInfo = isBackupRecordType.value
        ? targetClusters.reduce<{
            backupinfo: ReturnType<ComponentExposed<typeof TargetCluster>['getValue']>;
          }>(
            (results, item) => {
              Object.assign(results.backupinfo, item);
              return results;
            },
            {
              backupinfo: {} as ReturnType<ComponentExposed<typeof TargetCluster>['getValue']>,
            },
          )
        : targetClusters[0];
      const dbTables = await dbTableRef.value?.getValue();
      const specInfo = targetSpecRef.value!.getValue();
      const params = {
        bk_biz_id: currentBizId,
        ticket_type: TicketTypes.MONGODB_RESTORE,
        remark: '',
        details: {
          instance_per_host: formData.shardNum,
          cluster_ids: formData.clusterIds,
          ...targetClusterInfo,
          ...specInfo,
        },
      };
      if (dbTables) {
        Object.assign(params.details, {
          ns_filter: {
            ...dbTables,
          },
        });
      }
      await createTicket(params).then((data) => {
        window.changeConfirm = false;
        router.push({
          name: 'MongoDBStructure',
          params: {
            page: 'success',
          },
          query: {
            ticketId: data.id,
          },
        });
      });
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleReset = () => {
    window.changeConfirm = false;
  };
</script>

<style lang="less">
  .mongo-rollback-page {
    padding-bottom: 20px;

    .alert-tip {
      margin-bottom: 32px;
    }

    .db-struct-form {
      .bk-form-label {
        font-size: 12px;
      }
    }
  }
</style>
