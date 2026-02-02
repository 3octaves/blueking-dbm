<template>
  <div class="cluster-selector-table">
    <!-- <DbQuickSearch
      v-model="searchValue"
      class="mt-16 mb-16"
      :data="quickSearchData"
      :placeholder="t('请输入或选择条件搜索')"
      @change="handleQuickSearchChange" /> -->
    <DbTable
      ref="clusterTable"
      class="db-cluster-table"
      :container-height="containerHeight"
      :data-source="realDataSource"
      :disable-select-method="realDisableSelectMethod"
      :filter-value="searchValue"
      row-key="domain"
      :select-single="single"
      selectable
      :selected="selected"
      @filter-change="handleFilterChange"
      @selection="handleSelection">
      <TableColumn
        col-key="domain"
        fixed="left"
        :min-width="300"
        :title="t('访问入口')">
        <template #default="{ row }: { row: IRowData }">
          <TextOverflowLayout>
            {{ row.domain || '--' }}
            <!-- <template #append>
              <BkPopover
                v-if="row.operations && row.operations.length > 0"
                theme="light"
                width="360">
                <BkTag
                  class="operations-length-tag ml-4"
                  theme="info">
                  {{ row.operations.length }}
                </BkTag>
                <template #content>
                  <ClusterRelatedTasks :data="row.operations" />
                </template>
              </BkPopover>
              <BkTag
                v-if="row.isOffline"
                class="ml-4"
                size="small">
                {{ t('已禁用') }}
              </BkTag>
            </template> -->
          </TextOverflowLayout>
        </template>
      </TableColumn>
      <!-- <TableColumn
        col-key="cluster_ids"
        :filter="columnFilter?.['cluster_ids']"
        title="ID"
        :width="80">
        <template #default="{ row }: { row: IRowData }">
          {{ row.id }}
        </template>
      </TableColumn> -->
      <!-- <TableColumn
        col-key="name"
        :filter="columnFilter?.['name']"
        :min-width="250"
        :title="t('集群别名')">
        <template #default="{ row }: { row: IRowData }">
          {{ row.cluster_alias || '--' }}
        </template>
      </TableColumn>
      <TableColumn
        col-key="tag"
        :filter="columnFilter?.['tag']"
        :title="t('标签')"
        :width="150">
        <template #default="{ row }: { row: IRowData }">
          <ClusterTag
            :data="row"
            :editable="false"
            mode="vertical" />
        </template>
      </TableColumn> -->

      <!-- <TableColumn
        col-key="status"
        :filter="columnFilter?.['status']"
        :title="t('状态')"
        width="100">
        <template #default="{ row }: { row: IRowData }">
          <ClusterRoleStatus
            :data="{
              status: row.cluster_status,
              roleFailedInstanceInfo: {},
            }" />
        </template>
      </TableColumn> -->

      <TableColumn
        col-key="status"
        :title="t('状态')"
        width="100">
        <template #default="{ row }: { row: IRowData }">
          <ClusterRoleStatus
            :data="{
              status: row.cluster_status,
              roleFailedInstanceInfo: {},
            }" />
        </template>
      </TableColumn>
      <!-- <TableColumn
        v-if="showModuleColumn"
        col-key="db_module_id"
        :filter="columnFilter?.['db_module_id']"
        :title="t('模块')"
        :width="150">
        <template #default="{ row }: { row: IRowData }">
          {{ row.db_module_name || '--' }}
        </template>
      </TableColumn> -->
      <!-- <TableColumn
        col-key="major_version"
        :filter="columnFilter?.['major_version']"
        :min-width="150"
        :title="t('版本')">
        <template #default="{ row }: { row: IRowData }">
          {{ row.major_version || '--' }}
        </template>
      </TableColumn>
      <TableColumn
        col-key="disaster_tolerance_level"
        :filter="columnFilter?.['disaster_tolerance_level']"
        :min-width="160"
        :title="t('容灾要求')">
        <template #default="{ row }: { row: IRowData }">
          {{ row.disasterToleranceLevelName || '--' }}
        </template>
      </TableColumn>
      <TableColumn
        col-key="region"
        :filter="columnFilter?.['region']"
        :min-width="150"
        :title="t('地域园区')">
        <template #default="{ row }: { row: IRowData }">
          <div>{{ row.regionDisplay }}</div>
          <TextOverflowLayout>{{ row.clusterSubzonesDisplay }}</TextOverflowLayout>
        </template>
      </TableColumn> -->
    </DbTable>
  </div>
</template>

<script setup lang="ts" generic="T extends ISupportKey">
  import { useI18n } from 'vue-i18n';

  import { filterClusterEntries } from '@services/source/dbbase';

  import { ClusterTypes } from '@common/const';

  // import { useClusterColumnFilter, useClusterQuickSearch } from '@hooks';
  // import { ClusterTypes } from '@common/const';
  // import ClusterTag from '@components/cluster-tag/index.vue';
  import DbTable from '@components/db-table/IndexNew.vue';
  import TextOverflowLayout from '@components/text-overflow-layout/Index.vue';

  import ClusterRoleStatus from '@views/db-manage/common/cluster-role-status/Index.vue';

  // import useClusterList from '@views/db-manage/hooks/useClusterList';
  import { type ISupportKey, SupportKey } from '../../types';

  // import ClusterRelatedTasks from './task-panel/Index.vue';

  export type IRowData = ServiceReturnType<typeof filterClusterEntries>['results'][number];

  export interface Props<C extends ISupportKey> {
    currentKey: ISupportKey;
    dataSourceMap?: {
      [key in C]?: typeof filterClusterEntries;
    };
    disableSelectMethod?: (data: IRowData[]) => boolean | string;
    selected: IRowData[];
    single?: boolean;
    supportOfflineData?: boolean;
  }

  type Emits = (e: 'selection', list: IRowData[]) => void;

  const props = defineProps<Props<T>>();
  const emits = defineEmits<Emits>();

  const { t } = useI18n();

  // const quickSearchClusterType = clusterMap[props.currentKey] || props.currentKey;
  // const { quickSearchData, searchValue } = useClusterQuickSearch(quickSearchClusterType);

  // const { data: columnFilter } = useClusterColumnFilter({
  //   cluster_attrs: ['db_module_id', 'major_version', 'region', 'disaster_tolerance_level'] as const,
  //   cluster_type:
  //     props.currentKey === ClusterTypes.TENDBHA_SLAVE
  //       ? (clusterMap[ClusterTypes.TENDBHA_SLAVE] as ClusterTypes)
  //       : props.currentKey,
  // });

  const showModuleColumn = [
    ClusterTypes.SQLSERVER_HA,
    ClusterTypes.SQLSERVER_SINGLE,
    ClusterTypes.TENDBCLUSTER,
    ClusterTypes.TENDBHA,
    ClusterTypes.TENDBSINGLE,
    SupportKey.TENDBCLUSTER_SLAVE,
    SupportKey.TENDBHA_SLAVE,
  ].includes(props.currentKey);

  const containerHeight = 570 - 32 - 16; // 去除搜索框的高度和margin bottom

  const clusterTableRef = useTemplateRef('clusterTable');

  const realDisableSelectMethod = (data: IRowData) => {
    if (!props.supportOfflineData && data.isOffline) {
      return t('集群已禁用');
    }
    if (props.disableSelectMethod) {
      return props.disableSelectMethod(data);
    }
    return false;
  };

  const searchValue = ref({});

  const realDataSource = (params: ServiceParameters<typeof filterClusterEntries>) => {
    debugger;
    const clusterTypeMap = {
      [SupportKey.TENDBCLUSTER_SLAVE]: ClusterTypes.TENDBCLUSTER,
      [SupportKey.TENDBHA_SLAVE]: ClusterTypes.TENDBHA,
    };

    let isMaster = true;
    if (props.currentKey.includes('Slave')) {
      isMaster = false;
    }

    return (props.dataSourceMap?.[props.currentKey as T] || filterClusterEntries)({
      ...params,
      bk_biz_id: window.PROJECT_CONFIG.BIZ_ID,
      cluster_type: clusterTypeMap[props.currentKey as keyof typeof clusterTypeMap] || props.currentKey,
      role: isMaster ? 'master_entry' : 'slave_entry',
    });
  };

  const fetchData = () => {
    clusterTableRef.value!.fetchData(Object.assign({}, searchValue.value));
  };

  const handleQuickSearchChange = () => {
    fetchData();
  };

  const handleFilterChange = (filterValue: Record<string, string>) => {
    searchValue.value = filterValue;
    fetchData();
  };

  const handleSelection = (_key: string[], list: IRowData[]) => {
    emits('selection', list);
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less">
  .cluster-selector-table {
    height: 570px;
    padding: 0 24px;

    .db-cluster-table {
      .operations-length-tag {
        height: 16px;
        color: #3a84ff;
        border-radius: 8px !important;
      }
    }
  }
</style>
