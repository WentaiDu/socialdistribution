# Generated by Django 3.2.8 on 2021-10-17 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='github',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
