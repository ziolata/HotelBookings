# Generated by Django 5.0.2 on 2024-03-28 08:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0009_alter_usercustom_role_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercustom',
            name='role_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Auth.role'),
        ),
    ]
