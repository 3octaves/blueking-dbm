# Generated by Django 3.2.19 on 2024-01-10 08:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("ticket", "0004_alter_instanceoperaterecord_instance_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="AuthorizeRecord",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("user", models.CharField(max_length=255, verbose_name="账号名称")),
                ("source_ips", models.TextField(default="", verbose_name="源ip列表")),
                ("target_instances", models.TextField(verbose_name="目标集群")),
                ("access_dbs", models.TextField(verbose_name="访问DB名列表")),
                ("status", models.BooleanField(default=True, verbose_name="是否授权成功")),
                ("error", models.TextField(default="", verbose_name="错误信息/提示信息")),
                ("record_time", models.DateTimeField(auto_now=True, verbose_name="记录时间")),
                (
                    "ticket",
                    models.ForeignKey(
                        help_text="关联工单",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="authorize_records",
                        to="ticket.ticket",
                    ),
                ),
            ],
            options={
                "verbose_name": "授权记录",
                "verbose_name_plural": "授权记录",
                "ordering": ["-record_time"],
            },
        ),
    ]
