# Generated by Django 3.1.6 on 2021-10-28 02:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0002_auto_20211028_0207'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='post_type',
            new_name='type',
        ),
    ]
