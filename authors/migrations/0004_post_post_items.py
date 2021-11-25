# Generated by Django 3.2.8 on 2021-11-24 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0003_alter_postinbox_inbox_author_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='post_items',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='post_items', to='authors.postinbox'),
        ),
    ]
