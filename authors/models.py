from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
import uuid
from django.contrib.contenttypes.models import ContentType
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

class Author(AbstractUser):
    author_type = models.CharField(max_length=30,default="author", blank=False)
    author_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    displayName = models.CharField(max_length=30, default="", blank=False)
    host = models.CharField(max_length=50)
    url = models.CharField(max_length=100000,default='',blank=True,null=True)
    github = models.CharField(null = True,blank=False, max_length=50)
    profileImage = models.ImageField(blank = True, null = True,default = 'user.jpg')


class PendingAuthor(models.Model):
    # The default value is 'pending', if admin accept user sign up to server, change the accept to 'accept', if admin
    # reject, then change the accept to 'reject'.
    accept = models.CharField(max_length=100, default='pending')
    pending_author = models.JSONField(blank=True,null=True,verbose_name="pending_author")


class ServerNodes(models.Model):
    node = models.CharField(max_length=1000,primary_key=True,verbose_name="server_node")


class Post(models.Model):
    class Visibility(models.TextChoices):
        PUBLIC='PUBLIC'
        PRIVATE='PRIVATE'
        FRIENDONLY='FRIENDS'

    class ContentType(models.TextChoices):
        MARKDOWN = 'text/markdown'
        PLAIN = 'text/plain'
        APPLICATION = 'application/base64'
        IMAGE_PNG = 'image/png;base64'
        IMAGE_JPEG = 'image/jpeg;base64'

    # items = models.ForeignKey(Inbox, related_name='items', on_delete=models.CASCADE)
    type = models.CharField(max_length=100,editable=False,default="post", blank=False,verbose_name="type")
    title = models.CharField(max_length=100, default="", blank=False)
    post_id = models.UUIDField(primary_key = True,auto_created = True,verbose_name="id",default=uuid.uuid4)
    source = models.URLField(default="")
    origin = models.URLField(default="")
    description = models.TextField(default="")
    contentType = models.CharField(max_length=20, choices=ContentType.choices, default=ContentType.PLAIN)
    # image_content = models.FileField()
    # text_content = models.CharField(max_length=500, default='',blank=True, null=True)
    author = models.ForeignKey(Author,related_name='author',on_delete=models.CASCADE,default='')
    content=models.TextField(blank=True)
    #categories = ArrayField(models.CharField(max_length=200), blank=True)
    #count = models.IntegerField()
    #scrcomment
    comments = models.URLField()
    published = models.DateTimeField(auto_now_add=True)#USE_TZ=True in settings.py
    visibility = models.CharField(max_length=20,choices=Visibility.choices , default=Visibility.PUBLIC)
    unlisted = models.BooleanField(default=False, null=False)

class Comment(models.Model):
    class ContentType(models.TextChoices):
        MARKDOWN = 'text/markdown'
        PLAIN = 'text/plain'
        APPLICATION = 'application/base64'
        IMAGE_PNG = 'image/png;base64'
        IMAGE_JPEG = 'image/jpeg;base64'

    comment_type = models.CharField(max_length=100, default="comment", editable=False,blank=False,verbose_name="type")
    comment_author = models.ForeignKey(Author,on_delete=models.CASCADE,default='',related_name='authors')
    comment = models.TextField(default="", blank=False)
    contentType = models.CharField(max_length=20, choices=ContentType.choices, default=ContentType.PLAIN)
    published = models.DateTimeField(auto_now_add=True)
    comment_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4, editable = False,verbose_name="id")
    comment_post = models.ForeignKey(Post,on_delete=models.CASCADE,default='',related_name='commentsSrc')

class Like(models.Model):
    #items = models.ForeignKey(LikeInbox, related_name='likes_items', on_delete=models.CASCADE)
    context = models.URLField(default="", blank=False,verbose_name="@context")
    summary = models.CharField(max_length=100, default="", blank=False)
    type = models.CharField(max_length=100, default="", blank=False)
    author = models.ForeignKey(Author,related_name='authors_list_lalal',on_delete=models.CASCADE,default='')
    object = models.URLField()

class Liked(models.Model):
    #item = models.ForeignKey(LikeInbox, related_name='liked_items', on_delete=models.CASCADE)
    # context = models.URLField(default="", blank=False,verbose_name="@context")
    # summary = models.CharField(max_length=100, default="", blank=False)
    # type = models.CharField(max_length=100, default="", blank=False)
    # author = models.ForeignKey(Author,related_name='authors_list',on_delete=models.CASCADE,default='')
    # object = models.URLField()
    type= models.CharField(max_length=100, default="", blank=False)
    items=models.ForeignKey(Like,related_name='liked_detail',on_delete=models.CASCADE,default='')
class Follower(models.Model):
    following = models.ForeignKey(Author,to_field = "author_id",on_delete=models.CASCADE,related_name='following')
    author_type = models.CharField(max_length=30,default="author", blank=False)
    author_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    displayName = models.CharField(max_length=30, default="", blank=False)
    host = models.CharField(max_length=50)
    url = models.CharField(max_length=100000,default='',blank=True,null=True)
    github = models.CharField(null = True,blank=False, max_length=50)
    profileImage = models.ImageField(blank = True, null = True,default = 'user.jpg')

class FriendRequest_M(models.Model):
    class State(models.TextChoices):
        PENDING = "PENDING"
        APPROVE = "APPROVE"
    friend_state = models.CharField(max_length=50, choices=State.choices, default=State.PENDING)
    type = models.CharField(max_length=100, default="", blank=False)
    summary = models.CharField(max_length=50,default="", blank=False)
    actor = models.ForeignKey(Author, related_name='actor', on_delete=models.CASCADE)
    object = models.ForeignKey(Author, related_name='object', on_delete=models.CASCADE)

    def __str__(self):
        return self.summary


class Inbox(models.Model):
    inbox_type = models.CharField(max_length=100, default="inbox", blank=False)
    inbox_author_id = models.CharField(max_length=100, default="", blank=False, primary_key=True)
    items = models.JSONField(blank=True,null=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def created_auth_token(sender, instance=None, created=False, **kwargs):
    # Create Token whenever a user is created
    if created:
        Token.objects.create(user=instance)