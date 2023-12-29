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

import type { RouteRecordRaw } from 'vue-router';

import type { BigdataFunctions } from '@services/model/function-controller/functionController';

import { MainViewRouteNames } from '@views/main-views/common/const';

import { t } from '@locales/index';

const routes: RouteRecordRaw[] = [
  // {
  //   name: 'RiakApply',
  //   path: 'riak',
  //   meta: {
  //     routeParentName: MainViewRouteNames.SelfService,
  //     navName: t('申请Riak集群部署'),
  //     activeMenu: 'SelfServiceApply',
  //   },
  //   component: () => import('@views/riak-manage/apply/Index.vue'),
  // },
  {
    name: 'RiakManage',
    path: 'riak-manage',
    meta: {
      routeParentName: MainViewRouteNames.Database,
      navName: t('Riak_集群管理'),
      isMenu: true,
    },
    redirect: {
      name: 'RiakList',
    },
    component: () => import('@views/riak-manage/Index.vue'),
    children: [
      {
        name: 'RiakList',
        path: 'list',
        meta: {
          routeParentName: MainViewRouteNames.Database,
          navName: t('Riak_集群管理'),
          activeMenu: 'RiakManage',
        },
        component: () => import('@views/riak-manage/list/Index.vue'),
      },
    ],
  },
];

export default function getRoutes(controller: Record<BigdataFunctions | 'bigdata', boolean>) {
  return controller.riak ? routes : [];
}
