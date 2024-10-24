"""
TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at https://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""
import logging

from backend import env
from backend.core.encrypt.constants import AsymmetricCipherConfigType
from backend.core.encrypt.handlers import AsymmetricHandler
from backend.db_proxy.constants import ExtensionType
from backend.db_proxy.models import DBExtension
from backend.flow.consts import DBM_MYSQL_JOB_TMP_USER_PREFIX, UserName

logger = logging.getLogger("flow")


def get_mysql_sys_users(bk_cloud_id) -> list:
    """
    增加方法：收集SaaS内mysql/spider的系统账号列表，作为固定参数传入待执行Actuator指令
    """
    sys_users_map = {
        ExtensionType.DRS: env.DRS_USERNAME,
        ExtensionType.DBHA: env.DBHA_USERNAME,
    }
    sys_users = [UserName.ADMIN.value, UserName.PARTITION_YW.value]
    for key, value in sys_users_map.items():
        if value:
            sys_users.append(value)
        else:
            bk_cloud_name = AsymmetricCipherConfigType.get_cipher_cloud_name(bk_cloud_id)
            info = DBExtension.get_latest_extension(bk_cloud_id=bk_cloud_id, extension_type=key)
            logger.error(f"[{key}] details: {info.details}, bk_cloud_name: {bk_cloud_name}")
            sys_users.append(AsymmetricHandler.decrypt(name=bk_cloud_name, content=info.details["user"]))
            # 对于drs组件单独添加webconsole账号
            if key == ExtensionType.DRS:
                sys_users.append(
                    AsymmetricHandler.decrypt(name=bk_cloud_name, content=info.details["webconsole_user"])
                )

    return sys_users


def generate_mysql_tmp_user(root_id):
    return f"{DBM_MYSQL_JOB_TMP_USER_PREFIX}{root_id}"
