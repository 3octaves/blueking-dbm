# -*- coding: utf-8 -*-
"""
TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at https://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""

from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from backend.db_meta.enums import ClusterType
from backend.db_services.dbbase.constants import IpSource
from backend.flow.engine.controller.mysql import MySQLController
from backend.ticket import builders
from backend.ticket.builders.common.base import (
    BaseOperateResourceParamBuilder,
    DisplayInfoSerializer,
    HostInfoSerializer,
)
from backend.ticket.builders.common.constants import MySQLBackupSource
from backend.ticket.builders.mysql.base import BaseMySQLTicketFlowBuilder, MySQLBaseOperateDetailSerializer
from backend.ticket.constants import TicketType


class MysqlMigrateUpgradeDetailSerializer(MySQLBaseOperateDetailSerializer):
    class InfoSerializer(DisplayInfoSerializer):
        cluster_ids = serializers.ListField(help_text=_("集群ID列表"), child=serializers.IntegerField(), min_length=1)
        resource_spec = serializers.JSONField(help_text=_("资源规格"), required=False)
        pkg_id = serializers.IntegerField(help_text=_("目标版本包ID"))
        new_db_module_id = serializers.IntegerField(help_text=_("数据库模块ID"))
        new_master = HostInfoSerializer(help_text=_("新主库主机"), required=False)
        new_slave = HostInfoSerializer(help_text=_("新从库主机"), required=False)

    ip_source = serializers.ChoiceField(
        help_text=_("机器来源"), choices=IpSource.get_choices(), required=False, default=IpSource.MANUAL_INPUT
    )
    backup_source = serializers.ChoiceField(help_text=_("备份源"), choices=MySQLBackupSource.get_choices())
    infos = serializers.ListField(help_text=_("添加信息"), child=InfoSerializer())

    def validate(self, attrs):
        # 校验集群是否可用，集群类型为高可用
        super(MysqlMigrateUpgradeDetailSerializer, self).validate_cluster_can_access(attrs)
        super(MysqlMigrateUpgradeDetailSerializer, self).validated_cluster_type(attrs, ClusterType.TenDBHA)

        if attrs["ip_source"] == IpSource.RESOURCE_POOL:
            return attrs

        return attrs


class MysqlMigrateUpgradeParamBuilder(builders.FlowParamBuilder):
    controller = MySQLController.mysql_migrate_upgrade_scene

    def format_ticket_data(self):
        if self.ticket_data["ip_source"] == IpSource.RESOURCE_POOL:
            return
        for info in self.ticket_data["infos"]:
            info["new_master_ip"], info["new_slave_ip"] = info["new_master"]["ip"], info["new_slave"]["ip"]
            info["bk_new_master"], info["bk_new_slave"] = info.pop("new_master"), info.pop("new_slave")


class MysqlMigrateUpgradeResourceParamBuilder(BaseOperateResourceParamBuilder):
    def post_callback(self):
        next_flow = self.ticket.next_flow()
        ticket_data = next_flow.details["ticket_data"]
        for info in ticket_data["infos"]:
            info["bk_new_master"], info["bk_new_slave"] = info.pop("new_master")[0], info.pop("new_slave")[0]
            info["new_master_ip"], info["new_slave_ip"] = info["bk_new_master"]["ip"], info["bk_new_slave"]["ip"]

        next_flow.save(update_fields=["details"])


@builders.BuilderFactory.register(TicketType.MYSQL_MIGRATE_UPGRADE, is_apply=True)
class MysqlMigrateUpgradeFlowBuilder(BaseMySQLTicketFlowBuilder):
    serializer = MysqlMigrateUpgradeDetailSerializer
    inner_flow_builder = MysqlMigrateUpgradeParamBuilder
    resource_batch_apply_builder = MysqlMigrateUpgradeResourceParamBuilder