# Generated by Django 3.2.7 on 2021-10-18 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0006_auto_20211018_1233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='host',
            field=models.CharField(max_length=20),
        ),
    ]
