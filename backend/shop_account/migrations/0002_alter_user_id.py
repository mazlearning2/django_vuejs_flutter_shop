# Generated by Django 5.1.1 on 2024-09-28 19:59

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop_account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
