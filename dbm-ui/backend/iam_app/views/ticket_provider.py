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

import logging

from django.db import models

from backend.iam_app.dataclass.resources import ResourceEnum, ResourceMeta
from backend.iam_app.handlers.converter import MoreLevelIamPathConverter
from backend.iam_app.views.iam_provider import BaseModelResourceProvider
from backend.ticket.models import Ticket

logger = logging.getLogger("root")


class TicketResourceProvider(BaseModelResourceProvider):
    """
    flow资源的反向拉取类
    """

    model: models.Model = Ticket
    resource_meta: ResourceMeta = ResourceEnum.TICKET

    @staticmethod
    def parse_iam_path(iam_path):
        return {
            "bk_biz_id": iam_path.split("/")[1].split(",")[-1],
            "db_type": iam_path.split("/")[2].split(",")[-1],
        }

    def list_instance(self, filter, page, **options):
        filter.data_source = self.model
        filter.value_list = [self.resource_meta.lookup_field, *self.resource_meta.display_fields]
        filter.keyword_field = "id__icontains"
        return super().list_instance(filter, page, **options)

    def _list_instance(self, data_source: models.Model, condition, value_list, page):
        # ticket的db_type字段是group
        if "db_type" in condition:
            if condition["db_type"] == "other":
                condition["db_type"] = ""
            condition["group"] = condition.pop("db_type")
        return super()._list_instance(data_source, condition, value_list, page)

    def search_instance(self, filter, page, **options):
        return self.list_instance(filter, page, **options)

    def fetch_instance_info(self, filter, **options):
        filter.data_source = self.model
        return super().fetch_instance_info(filter, **options)

    def list_instance_by_policy(self, filter, page, **options):
        key_mapping = {
            f"{self.resource_meta.id}.id": "id",
            f"{self.resource_meta.id}.creator": "creator",
            f"{self.resource_meta.id}._bk_iam_path_": "bk_biz_id",
        }
        value_hooks = {"bk_biz_id,db_type": self.parse_iam_path}
        converter_class = options.get("converter_class", MoreLevelIamPathConverter)
        return self._list_instance_by_policy(
            data_source=self.model,
            # id作为id，id+ticket_type作为display name
            value_list=["id", "id"],
            key_mapping=key_mapping,
            value_hooks=value_hooks,
            filter=filter,
            page=page,
            converter_class=converter_class,
        )
