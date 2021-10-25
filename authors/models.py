from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
import uuid
class Author(AbstractUser):
  author_type = models.CharField(max_length=30,default="author", blank=False)
  author_id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
  displayName = models.CharField(max_length=30, default="", blank=False, unique = True)
  host = models.CharField(max_length=20)
  url = models.URLField()
  github = models.CharField(null = True,blank=False, max_length=50)
  profileImage = models.URLField()

  USERNAME_FIELD = 'displayName'
  REQUIRED_FIELDS = ['username']

