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

import defaultData from '@services/model/function-controller/defaultController.json';
import FunctionControllerModel from '@services/model/function-controller/functionController';

import http from './http';

/**
 * 获取功能开关信息
 * 当接口报错则返回默认配置功能
 */
export const getFunController = () =>
  http
    .get<FunctionControllerModel>('/apis/conf/function_controller/')
    .then((res) => new FunctionControllerModel(res))
    .catch(() => new FunctionControllerModel(defaultData));
