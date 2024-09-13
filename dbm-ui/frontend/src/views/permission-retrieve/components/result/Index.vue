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
  <div class="permission-retrieve-result">
    <div class="head-item">
      <div class="head-item-title">{{ t('无权限的IP共n个', { n: privIpMap.noPriv.length }) }}</div>
      <template v-if="privIpMap.noPriv.length">
        ：
        <div class="head-item-ip">
          <MultLineText
            :expandable="false"
            :line="3"
            show-tooltips>
            {{ privIpMap.noPriv.join('，') }}
          </MultLineText>
        </div>
        <BkButton
          v-bk-tooltips="t('复制 IP')"
          class="ml-4 mt-2"
          style="flex-shrink: 0"
          text
          theme="primary"
          @click="handleIpCopy(privIpMap.noPriv.join('\n'))">
          <DbIcon type="copy" />
        </BkButton>
      </template>
    </div>
    <div class="head-item head-item-center mt-12">
      <span class="head-item-title">{{ t('有权限的IP共n个', { n: privIpMap.hasPriv.length }) }}</span>
      <template v-if="privIpMap.hasPriv.length">
        <BkButton
          v-bk-tooltips="t('复制 IP')"
          class="ml-4"
          text
          theme="primary"
          @click="handleIpCopy(privIpMap.hasPriv.join('\n'))">
          <DbIcon type="copy" />
        </BkButton>
        <BkButton
          v-bk-tooltips="t('导出结果表')"
          class="ml-4"
          text
          theme="primary"
          @click="handleExport">
          <DbIcon type="daochu-2" />
        </BkButton>
      </template>
      <BkRadioGroup
        v-model="formatType"
        style="margin-left: auto"
        type="capsule">
        <BkRadioButton label="ip">{{ t('IP 视角') }}</BkRadioButton>
        <BkRadioButton label="cluster">{{ t('域名视角') }}</BkRadioButton>
      </BkRadioGroup>
    </div>
    <div class="mt-16 mb-24">
      <DbOriginalTable
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        :max-height="tableMaxHeight"
        :pagination="pagination"
        remote-pagination
        @page-limit-change="handleTableLimitChange"
        @page-value-change="handleTablePageChange" />
    </div>
  </div>
</template>

<script setup lang="tsx">
  import _ from 'lodash'
  import { useI18n } from 'vue-i18n';

  import { getAccountPrivs } from '@services/source/mysqlPermission';

  import { useCopy,useTableMaxHeight  } from '@hooks'

  import {
    AccountTypes,
    MysqlDbOperations,
    MysqlDdlSensitiveWords,
    TendbClusterDbOperations
  } from '@common/const';

  import DbTable from '@components/db-table/index.vue';
  import DbOriginalTable from '@components/db-table/OriginalTable.vue'
  import MultLineText from '@components/mult-line-text/Index.vue';

  interface TableItem {
    ip: string[],
    db: string[],
    immute_domain: string,
    user: string,
    match_ip: string,
    match_db: string,
    priv: string
  }

  interface Props {
    data?: ServiceReturnType<typeof getAccountPrivs>;
    isMaster: boolean;
    dbMemo: string[]
  }

  interface Emits {
    (e: 'search'): void
    (e: 'download'): void
  }

  interface Expose {
    getPaginationParams: () => {
      limit: number,
      offset: number
    };
    resetPagination: () => void
  }

  const props = defineProps<Props>()
  const emits = defineEmits<Emits>()
  const formatType = defineModel<string>({
    default: ''
  })

  const route = useRoute();
  const { t } = useI18n();
  const copy = useCopy();
  const tableMaxHeight = useTableMaxHeight(530);

  const { accountType } = route.meta as { accountType: string };

  const isSensitivePriv = (priv: string) => {
    const dbOprationsMap: Record<string, string[]> = {
      [AccountTypes.MYSQL]: [...MysqlDbOperations.glob, ...MysqlDdlSensitiveWords],
      [AccountTypes.TENDBCLUSTER]: TendbClusterDbOperations.glob
    }

    const dbOprations = dbOprationsMap[accountType]
    return dbOprations.includes(priv)
  }

  const tableRef = ref<InstanceType<typeof DbTable>>();

  const pagination = reactive({
    current: 1,
    count: 0,
    limit: 10,
    limitList: [10, 20, 50, 100, 500],
  });

  const columns = computed(() => {
    if (formatType.value === 'ip') {
      const ipColums = [
        {
          label: t('源客户端 IP'),
          field: 'ip',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'>{t('查询的对象')}</div>
              <div class='custom-head-sub-title'>{t('源客户端 IP')}</div>
            </>
          ),
          rowspan: ({ row }: { row: TableItem }) => {
            const rowSpan = tableData.value.filter((item) => _.isEqual(item.ip, row.ip)).length;
            return rowSpan > 1 ? rowSpan : 1;
          },
          render: ({ row }: { row: TableItem }) => <span style="font-weight: bolder">{row.ip.join('，')}</span>
        },
        {
          label: t('集群域名'),
          field: 'immute_domain',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'>{t('匹配的规则')}</div>
              <div class='custom-head-sub-title'>{t('集群域名')}</div>
            </>
          ),
          rowspan: ({ row }: { row: TableItem }) => {
            const rowSpan = tableData.value.filter((item) => _.isEqual(item.ip, row.ip) && _.isEqual(item.db, row.db) && item.immute_domain === row.immute_domain).length;
            return rowSpan > 1 ? rowSpan : 1;
          },
          render: ({ row }: { row: TableItem }) => (
            <>
              {
                props.isMaster ? <bk-tag theme="info">{t('主')}</bk-tag> : <bk-tag theme="success">{t('从')}</bk-tag>
              }
              <span class="ml-4">{row.immute_domain}</span>
            </>
          ),
        },
        {
          label: t('账号'),
          field: 'user',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'></div>
              <div class='custom-head-sub-title'>{t('账号')}</div>
            </>
          ),
          rowspan: ({ row }: { row: TableItem }) => {
            const rowSpan = tableData.value.filter((item) => _.isEqual(item.ip, row.ip) && _.isEqual(item.db, row.db) && item.immute_domain === row.immute_domain).length;
            return rowSpan > 1 ? rowSpan : 1;
          },
        },
        {
          label: t('匹配中的访问源'),
          field: 'match_ip',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'></div>
              <div class='custom-head-sub-title'>{t('匹配中的访问源')}</div>
            </>
          ),
          rowspan: ({ row }: { row: TableItem }) => {
            const rowSpan = tableData.value.filter((item) => _.isEqual(item.ip, row.ip) && _.isEqual(item.db, row.db) && item.immute_domain === row.immute_domain).length;
            return rowSpan > 1 ? rowSpan : 1;
          },
        },
        {
          label: t('匹配中的 DB'),
          field: 'match_db',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'></div>
              <div class='custom-head-sub-title'>{t('匹配中的 DB')}</div>
            </>
          ),
          render: ({ row }: { row: TableItem }) => (
            <bk-tag>{row.match_db}</bk-tag>
          ),
        },
        {
          label: t('权限'),
          field: 'priv',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'></div>
              <div class='custom-head-sub-title'>{t('权限')}</div>
            </>
          ),
          render: ({ row }: { row: TableItem }) => {
            const { priv } = row
            const privList = priv.split(',')

            return privList.map((privItem, index) => (
              <>
                { index !== 0 && <span>,</span> }
                <span>{privItem}</span>
                { isSensitivePriv(privItem) && (
                  <bk-tag
                    size="small"
                    theme="warning"
                    class="ml-4"
                  >
                    {t('敏感')}
                  </bk-tag>
                )}
              </>
            ))
          }
        },
      ];

      if (props.dbMemo.length > 0) {
        ipColums.splice(1, 0, {
          label: t('访问的 DB'),
          field: 'db',
          width: 240,
          renderHead: () => (
            <>
              <div class='custom-head-title'></div>
              <div class='custom-head-sub-title'>{t('访问的 DB')}</div>
            </>
          ),
          rowspan: ({ row }: { row: TableItem }) => {
            const rowSpan = tableData.value.filter((item) => _.isEqual(item.ip, row.ip) && _.isEqual(item.db, row.db)).length;
            return rowSpan > 1 ? rowSpan : 1;
          },
          render: ({ row }: { row: TableItem }) => (
            <>
              { row.db.map(dbItem => <bk-tag>{dbItem}</bk-tag>) }
            </>
          )
        })
      }

      return ipColums;
    }

    const domainColumns = [
      {
        label: t('集群域名'),
        field: 'immute_domain',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'>{t('匹配的规则')}</div>
            <div class='custom-head-sub-title'>{t('集群域名')}</div>
          </>
        ),
        rowspan: ({ row }: { row: TableItem }) => {
          const rowSpan = tableData.value.filter((item) => item.immute_domain === row.immute_domain).length;
          return rowSpan > 1 ? rowSpan : 1;
        },
        render: ({ row }: { row: TableItem }) => (
          <>
            {
              props.isMaster ? <bk-tag theme="info">{t('主')}</bk-tag> : <bk-tag theme="success">{t('从')}</bk-tag>
            }
            <span class="ml-4">{row.immute_domain}</span>
          </>
        ),
      },
      {
        label: t('账号'),
        field: 'user',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'></div>
            <div class='custom-head-sub-title'>{t('账号')}</div>
          </>
        ),
        rowspan: ({ row }: { row: TableItem }) => {
          const rowSpan = tableData.value.filter((item) => item.immute_domain === row.immute_domain).length;
          return rowSpan > 1 ? rowSpan : 1;
        },
      },
      {
        label: t('匹配中的访问源'),
        field: 'match_ip',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'></div>
            <div class='custom-head-sub-title'>{t('匹配中的访问源')}</div>
          </>
        ),
        rowspan: ({ row }: { row: TableItem }) => {
          const rowSpan = tableData.value.filter((item) => item.immute_domain === row.immute_domain && item.match_ip === row.match_ip).length;
          return rowSpan > 1 ? rowSpan : 1;
        },
      },
      {
        label: t('匹配中的 DB'),
        field: 'match_db',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'></div>
            <div class='custom-head-sub-title'>{t('匹配中的 DB')}</div>
          </>
        ),
        render: ({ row }: { row: TableItem }) => (
          <bk-tag>{row.match_db}</bk-tag>
        ),
      },
      {
        label: t('权限'),
        field: 'priv',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'></div>
            <div class='custom-head-sub-title'>{t('权限')}</div>
          </>
        ),
        render: ({ row }: { row: TableItem }) => {
          const { priv } = row
          const privList = priv.split(',')

          return privList.map((privItem, index) => (
            <>
              { index !== 0 && <span>，</span> }
              <span>{privItem}</span>
              { isSensitivePriv(privItem) && (
                <bk-tag
                  size="small"
                  theme="warning"
                  class="ml-4"
                >
                  {t('敏感')}
                </bk-tag>
              )}
            </>
          ))
        }
      },
      {
        label: t('源客户端 IP'),
        field: 'ip',
        width: 240,
        renderHead: () => (
          <>
            <div class='custom-head-title'>{t('查询的对象')}</div>
            <div class='custom-head-sub-title'>{t('源客户端 IP')}</div>
          </>
        ),
        rowspan: ({ row }: { row: TableItem }) => {
          const rowSpan = tableData.value.filter((item) => item.ip === row.ip).length;
          return rowSpan > 1 ? rowSpan : 1;
        },
        render: ({ row }: { row: TableItem }) => <span style="font-weight: bolder">{row.ip.join('，')}</span>,
      },
    ];

    if (props.dbMemo.length > 0) {
      domainColumns.push({
        label: t('访问的 DB'),
        field: 'db',
        width: 240,
        renderHead: () => (
          <>
              <div class='custom-head-title'>{t('查询的对象')}</div>
            <div class='custom-head-sub-title'>{t('访问的 DB')}</div>
          </>
        ),
        render: ({ row }: { row: TableItem }) => (
          <>
            { row.db.map(dbItem => <bk-tag>{dbItem}</bk-tag>) }
          </>
        )
      })
    }

    return domainColumns;
  });

  const tableData = computed(() => {
    const {data} = props
    if (data) {
      if (data.results.privs_for_ip) {
        const privsForIp = data.results.privs_for_ip;
        const result = privsForIp.reduce<TableItem[]>((acc, ipItem) => acc.concat(
          ipItem.dbs.reduce<TableItem[]>((dbAcc, dbItem) => dbAcc.concat(
            dbItem.domains.reduce<TableItem[]>((domainAcc, domainItem) => domainAcc.concat(
              domainItem.users.reduce<TableItem[]>((userAcc, userItem) => userAcc.concat(
                userItem.match_ips.reduce<TableItem[]>((matchIpAcc, matchIpItem) => userAcc.concat(
                  matchIpItem.match_dbs.map(matchDbItem => ({
                  ip: [ipItem.ip],
                  db: [dbItem.db],
                  immute_domain: domainItem.immute_domain,
                  user: userItem.user,
                  match_ip: matchIpItem.match_ip,
                  match_db: matchDbItem.match_db,
                  priv: matchDbItem.priv.toLocaleLowerCase()
                }))
                ), [])
              ), [])
            ), [])
          ), [])
        ), []);
        return result
      }
      if (data.results.privs_for_cluster) {
        const privsForCluster = data.results.privs_for_cluster;
        const result = privsForCluster.reduce<TableItem[]>((acc, ipItem) => acc.concat(
          ipItem.users.reduce<TableItem[]>((userAcc, userItem) => userAcc.concat(
            userItem.match_ips.reduce<TableItem[]>((matchIpAcc, matchIpItem) => matchIpAcc.concat(
              matchIpItem.match_dbs.map(matchDbItem => {
                const ipDb = matchDbItem.ip_dbs.reduce<{
                  ip: string[],
                  db: string[]
                }>((prevIpDb, ipDbItem) => ({
                  ip: prevIpDb.ip.concat(ipDbItem.ip),
                  db: prevIpDb.ip.concat(ipDbItem.db)
                }), {
                  ip: [],
                  db: []
                });

                return {
                  immute_domain: ipItem.immute_domain,
                  user: userItem.user,
                  match_ip: matchIpItem.match_ip,
                  match_db: matchDbItem.match_db,
                  priv: matchDbItem.priv,
                  ...ipDb
                }
              })
            ), [])
          ), [])
        ), []);
        return result
      }
    }
    return [];
  });

  const privIpMap = computed(() => {
    const { data } = props
    if (data) {
      const { no_priv: noPriv, has_priv: hasPriv } = data.results
      return {
        noPriv: noPriv || [],
        hasPriv: hasPriv || []
      }
    }
    return {
      noPriv: [],
      hasPriv: []
    }
  })

  watch(() => props.data?.match_ips_count, () => {
    pagination.count = props.data?.match_ips_count ?? 0
  })

  const handleTablePageChange = (value: number) => {
    pagination.current = value
    emits('search')
  };

  const handleTableLimitChange = (value: number) => {
    pagination.limit = value
    handleTablePageChange(1)
  };

  const handleIpCopy = (value: string) => {
    copy(value);
  };

  const handleExport = () => {
    emits('download')
  };

  defineExpose<Expose>({
    getPaginationParams() {
      return {
        limit: pagination.limit,
        offset: pagination.limit * (pagination.current - 1),
      }
    },
    resetPagination() {
      Object.assign(pagination, {
        current: 1,
        count: 0,
      })
    }
  });
</script>

<style lang="less" scoped>
  .permission-retrieve-result {
    .head-item {
      display: flex;
      align-items: flex-start;

      .head-item-title {
        flex-shrink: 0;
        font-size: 12px;
        font-weight: bolder;
        color: #313238;
      }

      .head-item-ip {
        font-size: 12px;
        color: #313238;
      }
    }

    .head-item-center {
      align-items: center;
    }

    :deep(.bk-table-head) {
      height: 100%;
      min-height: 84px;

      th {
        border: none;
      }

      .cell {
        padding: 0;
        height: 100%;

        .head-text {
          display: block;
          width: 100%;
        }
      }
    }

    :deep(.custom-head-title) {
      height: 42px;
      width: 100%;
      background: #dcdee5;
      font-weight: bolder;
      background: #eaebf0;
      line-height: 42px;
      padding: 0 16px;

      &:hover {
        background: #dcdee5;
      }
    }

    :deep(.custom-head-sub-title) {
      height: 42px;
      background: #f0f1f5;
      color: #313238;
      line-height: 42px;
      padding: 0 16px;

      &:hover {
        background: #eaebf0;
      }
    }
  }
</style>
