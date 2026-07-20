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
  <div>
    <!-- 基础信息 -->
    <TicketInfoBasic :ticket-details="ticketDetails">
      <!-- 目标选择模式 -->
      <TicketInfoItem label="目标选择模式">
        {{ targetModeText }}
      </TicketInfoItem>
      <!-- 强制重启 -->
      <TicketInfoItem label="强制重启">
        {{ ticketDetails.details.is_force_reload ? '是' : '否' }}
      </TicketInfoItem>
    </TicketInfoBasic>

    <!-- 按集群模式展示 -->
    <template v-if="targetMode === 'cluster'">
      <TicketInfoTable
        :data="ticketDetails.details.infos"
        row-key="cluster_id">
        <TicketInfoTableColumn
          col-key="cluster_id"
          :title="t('目标集群')">
          <template #default="{ row }: { row: RowData }">
            {{ ticketDetails.details.clusters?.[row.cluster_id]?.immute_domain || '--' }}
          </template>
        </TicketInfoTableColumn>
      </TicketInfoTable>
    </template>

    <!-- 按主机模式展示 -->
    <template v-if="targetMode === 'machine'">
      <TicketInfoTable
        :data="ticketDetails.details.infos"
        row-key="bk_host_id">
        <TicketInfoTableColumn
          col-key="bk_host_id"
          :title="t('主机IP')">
          <template #default="{ row }: { row: MachineRowData }">
            {{ row.ip || '--' }}
          </template>
        </TicketInfoTableColumn>
      </TicketInfoTable>
    </template>

    <!-- 按实例模式展示（保持原有逻辑） -->
    <template v-if="targetMode === 'instance'">
      <TicketInfoTable
        :data="ticketDetails.details.infos"
        row-key="instance_id">
        <TicketInfoTableColumn
          col-key="instance_id"
          :get-copy-value="(row: RowData) => ticketDetails.details.instances?.[row.instance_id]?.instance || ''"
          :title="t('实例')"
          width="300">
          <template #default="{ row }: { row: RowData }">
            {{ ticketDetails.details.instances?.[row.instance_id]?.instance || '--' }}
          </template>
        </TicketInfoTableColumn>
        <TicketInfoTableColumn
          col-key="role"
          :title="t('角色')"
          width="100" />
        <TicketInfoTableColumn
          col-key="immute_domain"
          :title="t('所属集群')">
          <template #default="{ row }: { row: RowData }">
            {{ ticketDetails.details.clusters?.[row.cluster_id]?.immute_domain || '--' }}
          </template>
        </TicketInfoTableColumn>
      </TicketInfoTable>
    </template>
  </div>
</template>

<script setup lang="tsx">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import TicketModel, { type Mongodb } from '@services/model/ticket/ticket';

  import { TicketTypes } from '@common/const';

  defineOptions({
    name: TicketTypes.MONGODB_INSTANCE_RELOAD,
    inheritAttrs: false,
  });

  defineProps<Props>();

  // 目标模式文本映射
  const modeTextMap: Record<string, string> = {
    cluster: '按集群',
    instance: '按实例',
    machine: '按主机',
  };

  type RowData = Mongodb.InstanceReload['infos'][number];
  type MachineRowData = {
    bk_host_id: number;
    ip?: string;
  };

  interface Props {
    ticketDetails: TicketModel<Mongodb.InstanceReload>;
  }

  const { t } = useI18n();

  // 获取目标选择模式
  const targetMode = computed(() => ticketDetails.value.details.target_select_mode || 'instance');

  // 目标选择模式文本
  const targetModeText = computed(() => modeTextMap[targetMode.value] || t('按实例'));
</script>
