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
import pytest

from backend.configuration.models import Profile
from backend.tests.constants import TEST_ADMIN_USERNAME
from backend.ticket.constants import TicketType


@pytest.fixture
def profile():
    Profile.objects.create(username=TEST_ADMIN_USERNAME, label="biz", values=["biz-1", "biz-2"])
    Profile.objects.create(
        username=TEST_ADMIN_USERNAME,
        label="ticket_type",
        values=[TicketType.MYSQL_SINGLE_APPLY, TicketType.MYSQL_HA_APPLY],
    )
