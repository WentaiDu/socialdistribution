# Generated by Django 3.2.8 on 2021-10-29 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='displayName',
            field=models.CharField(default='', max_length=30),
        ),
    ]