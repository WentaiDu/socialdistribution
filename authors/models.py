from django.db import models
#from django.contrib.postgres.fields import ArrayField
import uuid
from django.contrib.contenttypes.models import ContentType


class Author(models.Model):
    author_type = models.CharField(max_length=30,default="", blank=False)
    author_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4, editable = False)
    host = models.CharField(max_length=20)
    displayName = models.CharField(max_length=30, default="", blank=False)
    url = models.URLField()
    github = models.CharField(null = True,blank=False, max_length=50)
    profileImage = models.URLField()
    def __str__(self):
        return self.displayName+'  ' +str(self.author_id)

class Inbox(models.Model):
    inbox_type = models.CharField(max_length=100, default="", blank=False)
    inbox_author_id = models.CharField(max_length=100, default="", blank=False,primary_key=True)
    #item = models.ManyToManyField(Post,on_delete=models.CASCADE,default='')

class Post(models.Model):
    items = models.ForeignKey(Inbox, related_name='items', on_delete=models.CASCADE)
    post_type = models.CharField(max_length=100, default="", blank=False,verbose_name="type")
    title = models.CharField(max_length=100, default="", blank=False)
    post_id = models.UUIDField(primary_key = True, auto_created = True , default = uuid.uuid4, editable = False,verbose_name="id")
    source = models.URLField(default="")
    origin = models.URLField(default="")
    description = models.TextField(default="")
    contentType = models.ForeignKey(ContentType,on_delete=models.CASCADE)
    image_content = models.FileField(null=True,blank=True)
    text_content = models.CharField(max_length=500, default='',blank=True, null=True)
    post_author = models.ForeignKey(Author,on_delete=models.CASCADE,default='')
    #categories = ArrayField(models.CharField(max_length=200), blank=True)
    #count = models.IntegerField()
    comments = models.URLField()
    published = models.DateTimeField(auto_now_add=True)#USE_TZ=True in settings.py
    #visibility = ArrayField(models.CharField(max_length=200), blank=True)
    unlisted = models.BooleanField(default=False, null=False)

class Comment(models.Model):
    comment_type = models.CharField(max_length=100, default="", blank=False,verbose_name="type")
    comment_author = models.ForeignKey(Author,on_delete=models.CASCADE,default='')
    comment = models.TextField(default="", blank=False)
    contentType = models.ForeignKey(ContentType,on_delete=models.CASCADE)
    published = models.DateTimeField(auto_now_add=True)
    comment_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4, editable = False,verbose_name="id") 
    comment_post = models.ForeignKey(Post,on_delete=models.CASCADE,default='')

class Like(models.Model):
    content = models.URLField(default="", blank=False,verbose_name="@context")
    summary = models.CharField(max_length=100, default="", blank=False)
    type = models.CharField(max_length=100, default="", blank=False)
    like_author = models.OneToOneField(Author,on_delete=models.CASCADE,verbose_name="author")
    object = models.URLField()

