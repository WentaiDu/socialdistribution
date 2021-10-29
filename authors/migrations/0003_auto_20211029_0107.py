# Generated by Django 3.2.8 on 2021-10-29 07:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0002_alter_author_displayname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='follower',
            name='author_id',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='author_type',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='displayName',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='github',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='host',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='profileImage',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='url',
        ),
        migrations.AddField(
            model_name='follower',
            name='id',
            field=models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='follower',
            name='following',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='follower',
            name='status',
            field=models.BooleanField(),
        ),
    ]
