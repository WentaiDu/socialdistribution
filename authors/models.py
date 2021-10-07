from django.db import models
import uuid
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import fields
from django.http import HttpRequest
'''
class Type(models.Model):
    TYPE_CHOICES=["author","Follow","post","comment","Like","liked","inbox"]
    type = models.CharField(choices =TYPE_CHOICES)
'''

class Author(models.Model):
    author_type = models.CharField(max_length=30,default="", blank=False,verbose_name="type")
    author_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4, editable = False )
    host = models.CharField(max_length=20,default='127.0.0.1:5454',editable = False)
    displayName = models.CharField(max_length=30, default="", blank=False)
    github = models.SlugField(unique=True, blank=False)




class Comment(models.Model):
    comment_type = models.CharField(max_length=100, default="", blank=False,verbose_name="type")
    comment_author = models.ForeignKey(Author,on_delete=models.CASCADE,verbose_name="author")
    comment = models.TextField(default="", blank=False)
    contentType = models.ForeignKey(ContentType,on_delete=models.CASCADE)
    published = models.DateTimeField(auto_now_add=True)
    comment_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4, editable = False,verbose_name="id")
    comment_object= fields.GenericForeignKey('contentType','comment_id')


class Category(models.Model):
    category = models.CharField(max_length=100)

    def __str__(self):
       return self.category

#Confused about which part should be in post and which part should be shown by pagination.
class Post(models.Model):
    post_type = models.CharField(max_length=100, default="", blank=False,verbose_name="type")
    title = models.CharField(max_length=100, default="", blank=False)
    post_id = models.UUIDField(primary_key = True, auto_created = True , default = uuid.uuid4, editable = False,verbose_name="id")
    source = models.URLField(default="")
    origin = models.URLField(default="")
    description = models.TextField(default="")
    contentType = models.ForeignKey(ContentType,on_delete=models.CASCADE,)
    content = models.FileField()
    post_author = models.ForeignKey(Author,on_delete=models.CASCADE,verbose_name="author")
    category = models.ManyToManyField(Category)


class Like(models.Model):
    content = models.URLField(default="", blank=False,verbose_name="@context")
    summary = models.CharField(max_length=100, default="", blank=False)
    type = models.CharField(max_length=100, default="", blank=False)
    like_author = models.ForeignKey(Author,on_delete=models.CASCADE,verbose_name="author")
    object = models.ForeignKey(Post,on_delete=models.CASCADE)

class Inbox(models.Model):
    inbox_type = models.CharField(max_length=100, default="", blank=False,verbose_name="type")
    inbox_author = models.ForeignKey(Author,on_delete=models.CASCADE,verbose_name="author")
    items = models.ForeignKey(Post,on_delete=models.CASCADE)