# Generated by Django 3.2.8 on 2021-11-24 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0002_alter_postinbox_inbox_author_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postinbox',
            name='inbox_author_id',
            field=models.CharField(default='', max_length=100, primary_key=True, serialize=False),
        ),
    ]