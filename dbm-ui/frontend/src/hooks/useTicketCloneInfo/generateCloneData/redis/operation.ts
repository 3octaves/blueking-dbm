/*
 * TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
 *
 * Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */
import RedisModel from '@services/model/redis/redis';
import type { RedisKeysDetails } from '@services/model/ticket/details/redis';
import TicketModel from '@services/model/ticket/ticket';

// Redis 提取Key/删除Key/备份
export function generateRedisOperationCloneData(ticketData: TicketModel<RedisKeysDetails>) {
  const { clusters, rules } = ticketData.details;
  return Promise.resolve(
    rules.map(
      (item) =>
        ({
          ...clusters[item.cluster_id],
          ...item,
          master_domain: clusters[item.cluster_id].immute_domain,
        }) as unknown as RedisModel,
    ),
  );
}