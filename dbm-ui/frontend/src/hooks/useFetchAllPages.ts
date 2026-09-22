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

import { useRequest } from 'vue-request';

import type { ListBase } from '@services/types';

/**
 * 分页接口取全量
 * 以响应里的 count 作为全量总数，从 offset 0 逐片串行续拉，分片为空或已取满时结束
 */
export const useFetchAllPages = <P extends { limit?: number; offset?: number }, T>(
  request: (params: P) => Promise<ListBase<T[]>>,
) => {
  // 用 shallowRef 避免泛型数组被深解包导致类型失真
  const data = shallowRef([] as T[]);

  const { loading, run, runAsync } = useRequest(
    async (params: P) => {
      const list: T[] = [];
      let offset = params.offset ?? 0;
      let isFinished = false;

      while (!isFinished) {
        const page = await request({
          ...params,
          offset,
        });
        const chunk = page.results;
        list.push(...chunk);
        offset += chunk.length;
        // count 为全量总数；分片为空兜底，避免 count 异常时无限续拉
        isFinished = chunk.length === 0 || (page.count > 0 && offset >= page.count);
      }

      return list;
    },
    {
      manual: true,
      onSuccess(result) {
        data.value = result;
      },
    },
  );

  return {
    data,
    loading,
    run,
    runAsync,
  };
};
