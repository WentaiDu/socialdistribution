# Generated by Django 3.2.8 on 2021-11-25 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0007_inbox'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inbox',
            name='items',
            field=models.JSONField(blank=True, null=True),
        ),
    ]