/*
 * TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
 *
 * Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreement to in writing, software distributed under the License is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */
/*
 * 【联调前临时数据】后端接口未就绪时的本地假数据，接口可用后：
 * 1. 删除本文件；2. 删除 redisRollback.ts 中的 IS_MOCK 分支与相关 import。
 */
import dayjs from 'dayjs';

import RollbackBatch, { BackupType } from '@services/model/redis/rollback-batch';
import RollbackBatchShard from '@services/model/redis/rollback-batch-shard';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// 全部分片取值（与原型一致）
export const MOCK_SHARD_VALUES = ['0-104999', '105000-209999', '210000-314999', '315000-419999'];

const makeTime = (dayOffset: number, utcTime: string) =>
  dayjs()
    .subtract(dayOffset, 'day')
    .format(`YYYY-MM-DD ${utcTime}`) + '+00:00';

interface IMockBatchRow {
  backup_identify: string;
  backup_type: BackupType;
  end_day_offset: number;
  // 备份时分片数（与 MOCK_SHARD_VALUES 不一致时触发拓扑不一致提示）
  shard_count: number;
  start_day_offset: number;
}

// 批次假数据：含拓扑不一致（2/4 分片）、单据备份、binlog 缺口演示批次
const MOCK_BATCH_ROWS: IMockBatchRow[] = [
  {
    backup_identify: 'SCHEDULED-2026101203',
    backup_type: BackupType.SCHEDULED,
    end_day_offset: 1,
    shard_count: 4,
    start_day_offset: 1,
  },
  {
    backup_identify: 'BILL-2026101112',
    backup_type: BackupType.BILL,
    end_day_offset: 2,
    shard_count: 4,
    start_day_offset: 2,
  },
  {
    backup_identify: 'SCHEDULED-2026101003',
    backup_type: BackupType.SCHEDULED,
    end_day_offset: 3,
    // 拓扑不一致：备份时 2 个分片，当前 4 个分片
    shard_count: 2,
    start_day_offset: 3,
  },
];

export async function getMockRollbackBatches(_params: {
  cluster_id: number;
  end_time?: string;
  shard_values?: string[];
  start_time?: string;
}) {
  await delay();
  return {
    batches: MOCK_BATCH_ROWS.map(
      (rowItem) =>
        new RollbackBatch({
          backup_identify: rowItem.backup_identify,
          backup_type: rowItem.backup_type,
          end_time: makeTime(rowItem.end_day_offset, '04:15:30'),
          is_all_shards_covered: rowItem.shard_count === MOCK_SHARD_VALUES.length,
          is_complete: true,
          shard_count: rowItem.shard_count,
          source_is_all_current: rowItem.shard_count === MOCK_SHARD_VALUES.length,
          start_time: makeTime(rowItem.start_day_offset, '03:42:01'),
          total_size: 21474836480,
        }),
    ),
    cluster_shards: MOCK_SHARD_VALUES.map((shardValue, index) => ({
      current_master: `1.1.1.${index + 1}:30000`,
      current_slave: `1.1.1.${index + 11}:30000`,
      resolvable: true,
      shard_value: shardValue,
      warning: '',
    })),
    locator_source: 'table',
  };
}

export async function getMockRollbackBatchDetails(params: {
  backup_identify: string;
  cluster_id: number;
  shard_values?: string[];
}) {
  await delay();
  const batchRow = MOCK_BATCH_ROWS.find((rowItem) => rowItem.backup_identify === params.backup_identify);
  // 拓扑不一致的批次只有前 2 个分片有备份
  const shardValues = batchRow && batchRow.shard_count < MOCK_SHARD_VALUES.length
    ? MOCK_SHARD_VALUES.slice(0, batchRow.shard_count)
    : MOCK_SHARD_VALUES;
  return {
    backup_identify: params.backup_identify,
    cluster_shards: [],
    locator_source: 'table',
    shards: shardValues.map((shardValue, index) => {
      const sourceIp = `1.1.1.${index + 11}`;
      return new RollbackBatchShard({
        backup_begin_time: makeTime(batchRow?.start_day_offset ?? 1, '03:42:01'),
        backup_end_time: makeTime(batchRow?.end_day_offset ?? 1, `03:${(50 + index * 5).toString().padStart(2, '0')}:10`),
        binlog_gaps: null,
        current_master: `1.1.1.${index + 1}:30000`,
        files: [
          {
            file_name: `3-redis-slave-${sourceIp}-30000-20261012034201.aof.zst`,
            size: 5368709120,
            task_id: `0512100803420000${index}`,
          },
        ],
        in_current_topology: shardValues.length === MOCK_SHARD_VALUES.length,
        is_complete: true,
        shard_value: shardValue,
        size: 5368709120,
        source_ip: sourceIp,
        source_is_current: true,
        source_port: 30000,
      });
    }),
    warnings: [],
  };
}

export async function getMockRollbackPrecheck(params: {
  allow_binlog_nonconsecutive?: boolean;
  backup_identify: string;
  cluster_id: number;
  resource_spec?: {
    redis: {
      count: number;
    };
  };
  shard_values?: string[];
}) {
  await delay();
  const shardValues = params.shard_values && params.shard_values.length ? params.shard_values : [];
  const checkedShardValues = shardValues.length ? shardValues : MOCK_SHARD_VALUES;
  // 演示 binlog 缺口：勾选最后一个分片时存在断层
  const gapShardValue = '315000-419999';
  const hasBinlogGap = checkedShardValues.includes(gapShardValue);
  const binlogGapError = `分片 ${gapShardValue} binlog 序号不连续 (缺失序号: 105, 106)，若接受缺失写入可开启 allow_binlog_nonconsecutive 放行`;
  const shards = checkedShardValues.map((shardValue) => ({
    binlog_gaps: shardValue === gapShardValue ? { missing: [105, 106], missing_count: 2 } : null,
    errors: shardValue === gapShardValue && hasBinlogGap && !params.allow_binlog_nonconsecutive ? [binlogGapError] : [],
    file_names: [`3-redis-slave-1.1.1.12-30000-20261012034201.aof.zst`],
    ok: !(shardValue === gapShardValue && hasBinlogGap && !params.allow_binlog_nonconsecutive),
    shard_value: shardValue,
  }));
  const blockedErrors = shards.flatMap((shardItem) => shardItem.errors);
  return {
    binlog_nonconsecutive: hasBinlogGap && Boolean(params.allow_binlog_nonconsecutive),
    errors: blockedErrors,
    exist: blockedErrors.length === 0,
    shards,
    warnings: [
      ...blockedErrors,
      // 整集群回档：缺分片全备提示
      ...(shardValues.length === 0 ? [`分片 315000-419999 的全备缺失，该分片不参与构造`] : []),
      // 部分分片：占位提示
      ...(shardValues.length > 0 && shardValues.length < MOCK_SHARD_VALUES.length
        ? [`未勾选的分片 [${MOCK_SHARD_VALUES.filter((item) => !shardValues.includes(item)).join('、')}] 将只拉起空实例，保证临时 Proxy 路由完整`]
        : []),
      ...(hasBinlogGap && params.allow_binlog_nonconsecutive
        ? [`分片 ${gapShardValue} 存在 binlog 断层，将跳过缺失序号期间的数据写入，构造结果可能与原集群数据不一致`]
        : []),
    ],
  };
}

export async function getMockShardRoute(params: { backup_identify?: string; cluster_id: number; keys: string[] }) {
  await delay();
  // 简单哈希：key 落到前 3 个分片；包含 miss 的 key 演示批次缺口
  const results = params.keys.map((keyItem) => {
    const hash = [...keyItem].reduce((sum, charItem) => sum + charItem.charCodeAt(0), 0);
    const shardValue = MOCK_SHARD_VALUES[hash % 3];
    const isCovered = !keyItem.includes('miss');
    return {
      backend: `1.1.1.1:30000`,
      batch_shard_values: isCovered ? [shardValue] : [],
      error: '',
      is_covered: isCovered,
      key: keyItem,
      range: shardValue,
      uncovered_ranges: isCovered ? [] : ['210000-419999'],
    };
  });
  return {
    batch_shard_values: [...new Set(results.flatMap((resultItem) => resultItem.batch_shard_values))],
    results,
    warnings: [],
  };
}
