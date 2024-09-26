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
import MongoModel from '@services/model/mongodb/mongodb';
import type { ProxyScaleUp } from '@services/model/ticket/details/mongo';
import TicketModel from '@services/model/ticket/ticket';
import { getMongoList } from '@services/source/mongodb';

import { random } from '@utils';

// MongoDB 扩容接入层
export async function generateExecScriptApplyCloneData(ticketData: TicketModel<ProxyScaleUp>) {
  const { infos, specs } = ticketData.details;
  const clusterListResult = await getMongoList({
    cluster_ids: infos.map((item) => item.cluster_id).join(','),
  });
  const clusterListMap = clusterListResult.results.reduce(
    (obj, item) => {
      Object.assign(obj, {
        [item.id]: item,
      });
      return obj;
    },
    {} as Record<number, MongoModel>,
  );
  const tableDataList = infos.map((item) => {
    const clusterItem = clusterListMap[item.cluster_id];
    return {
      rowKey: random(),
      isLoading: false,
      clusterName: clusterItem.cluster_name,
      clusterId: clusterItem.id,
      shardNum: clusterItem.shard_num,
      machineNum: clusterItem.replicaset_machine_num,
      mongosNum: clusterItem.mongos.length,
      currentSpec: specs,
      targetNum: item.resource_spec.mongos.count,
    };
  });

  return {
    tableDataList,
    remark: ticketData.remark,
  };
}
