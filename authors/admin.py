from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin
from .models import Author
from . import models
class UserAdmin(BaseUserAdmin):
  form = UserChangeForm
  fieldsets = (
      (None, {'fields': ('username', 'password', )}),
      (_('Personal info'), {'fields': ('author_type', 'author_id')}),
      (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                     'groups', 'user_permissions')}),
      (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('user_info'), {'fields': ('displayName','host', 'url','github','profileImage')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide', ),
          'fields': ('username', 'password1', 'password2'),
      }),
  )
  list_display = ['username', 'author_type', 'author_id', 'is_staff','displayName','host', 'url','github','profileImage']
  search_fields = ('username', 'author_type', 'author_id')
  ordering = ('username',)
admin.site.register(Author, UserAdmin)
admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.Like)
admin.site.register(models.Liked)
admin.site.register(models.PostInbox)
admin.site.register(models.Follower)
admin.site.register(models.FriendRequest)
