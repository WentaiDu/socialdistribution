from django.db.models import fields
from rest_framework import serializers
from authors.models import *

class AuthorSerializer(serializers.ModelSerializer):
  class Meta:
      model = Author
      fields = ['username','password','author_type','author_id','host','displayName','url','github','profileImage']

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = Author
        ref_name = 'LogIn'
        fields = ['username','password']

        
class PendingAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingAuthor
        fields = ['id', 'accept','pending_author']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # commentsSrc = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = ['type','title','post_id','source','origin','description','contentType','content'
        ,'author','comments','published','visibility','unlisted']

class LikeSerializer(serializers.ModelSerializer):
    #author = AuthorSerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    object = serializers.URLField()
    class Meta:
        model = Like
        fields = ["context","type","summary","author","object"]
class LikedSerializer(serializers.ModelSerializer):
    item=LikeSerializer(read_only=True)
    object = serializers.URLField()
    class Meta:
        model = Liked
        fields = ["type","item"]


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest_M
        fields = '__all__'


class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = '__all__'