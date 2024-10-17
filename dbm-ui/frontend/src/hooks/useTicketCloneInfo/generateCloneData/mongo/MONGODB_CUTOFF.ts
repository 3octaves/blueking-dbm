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

import MongodbInstanceModel from '@services/model/mongodb/mongodb-instance';
import type { DbReplace } from '@services/model/ticket/details/mongo';
import TicketModel from '@services/model/ticket/ticket';
import { getMongoInstancesList } from '@services/source/mongodb';

import type { SpecInfo } from '@views/mongodb-manage/components/edit-field/spec-select/components/Panel.vue';

import { random } from '@utils';

interface IDataRow {
  rowKey: string;
  isLoading: boolean;
  ip: string;
  clusterId: number;
  clusterType: string;
  role: string;
  machineType: string;
  cluster: {
    domain: string;
    isStart: boolean;
    isGeneral: boolean;
    rowSpan: number;
  };
  relatedClusters: string[];
  currentSpec?: SpecInfo;
  bkCloudId?: number;
}

// MongoDB 扩容接入层
export async function generateCutOffCloneData(ticketData: TicketModel<DbReplace>) {
  const { infos, specs, clusters } = ticketData.details;
  const ipList = infos.reduce(
    (prev, infoItem) => [
      ...prev,
      ...infoItem.mongo_config.map((mongoConfigItem) => mongoConfigItem.ip),
      ...infoItem.mongodb.map((mongoDbItem) => mongoDbItem.ip),
      ...infoItem.mongos.map((mongosItem) => mongosItem.ip),
    ],
    [] as string[],
  );
  const instanceListResult = await getMongoInstancesList({
    ip: ipList.join(','),
    extra: 1,
  });
  const instanceListMap = instanceListResult.results.reduce(
    (obj, item) => {
      Object.assign(obj, {
        [item.ip]: item,
      });
      return obj;
    },
    {} as Record<string, MongodbInstanceModel>,
  );
  const tableDataList = infos.reduce(
    (prev, item) => [
      ...prev,
      ...[...item.mongo_config, ...item.mongodb, ...item.mongos].map((roleItem) => ({
        rowKey: random(),
        isLoading: false,
        ip: roleItem.ip,
        clusterId: item.cluster_id,
        clusterType: clusters[item.cluster_id].cluster_type,
        role: instanceListMap[roleItem.ip].role,
        machineType: instanceListMap[roleItem.ip].machine_type,
        cluster: {
          domain: clusters[item.cluster_id].immute_domain,
          isStart: false,
          isGeneral: true,
          rowSpan: 1,
        },
        relatedClusters: instanceListMap[roleItem.ip].related_clusters.map(
          (relatedCluster) => relatedCluster.immute_domain,
        ),
        currentSpec: { ...specs[item.cluster_id], count: 0 },
        bkCloudId: instanceListMap[roleItem.ip].bk_cloud_id,
      })),
    ],
    [] as IDataRow[],
  );
  return {
    tableDataList,
    remark: ticketData.remark,
  };
}
