# Generated by Django 3.1.6 on 2021-11-30 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0006_auto_20211126_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendrequest_m',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='like',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='liked',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
