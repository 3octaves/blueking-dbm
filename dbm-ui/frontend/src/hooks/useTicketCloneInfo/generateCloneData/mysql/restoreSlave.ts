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
import type { MySQLRestoreSlaveDetails } from '@services/model/ticket/details/mysql';
import TicketModel from '@services/model/ticket/ticket';

import { random } from '@utils';

// MySQL 重建从库-新机重建
export function generateMysqlRestoreSlaveCloneData(ticketData: TicketModel<MySQLRestoreSlaveDetails>) {
  const { infos } = ticketData.details;
  const tableDataList = infos.map((item) => ({
    rowKey: random(),
    oldSlave: {
      bk_cloud_id: item.old_slave.bk_cloud_id,
      bk_cloud_name: '',
      bk_host_id: item.old_slave.bk_host_id,
      ip: item.old_slave.ip,
      port: item.old_slave.port,
      instance_address: `${item.old_slave.ip}:${item.old_slave.port}`,
      cluster_id: item.cluster_ids[0],
    },
    newSlave: {
      bk_biz_id: item.new_slave.bk_biz_id,
      bk_cloud_id: item.new_slave.bk_cloud_id,
      bk_host_id: item.new_slave.bk_host_id,
      ip: item.new_slave.ip,
      port: item.new_slave.port,
    },
  }));

  return Promise.resolve({
    tableDataList,
    remark: ticketData.remark,
  });
}
