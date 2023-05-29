# Generated by Django 3.2.25 on 2024-06-21 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("db_meta", "0037_auto_20240520_1104"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="proxyinstance",
            options={"verbose_name": "代理实例(ProxyInstance)", "verbose_name_plural": "代理实例(ProxyInstance)"},
        ),
        migrations.AlterModelOptions(
            name="storageinstance",
            options={"verbose_name": "存储实例(StorageInstance)", "verbose_name_plural": "存储实例(StorageInstance)"},
        ),
        migrations.AlterField(
            model_name="clusterentry",
            name="entry",
            field=models.CharField(default="", max_length=200),
        ),
    ]
