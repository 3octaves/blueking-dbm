# Generated by Django 3.2.19 on 2023-11-21 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("configuration", "0006_auto_20231104_2023"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bizsettings",
            name="value",
            field=models.JSONField(blank=True, null=True, verbose_name="系统设置值"),
        ),
        migrations.AlterField(
            model_name="systemsettings",
            name="value",
            field=models.JSONField(blank=True, null=True, verbose_name="系统设置值"),
        ),
    ]
