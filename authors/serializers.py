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

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# class PostImageSerializer(serializers.ModelSerializer):
#     post_author = AuthorSerializer(read_only=True)
#     class Meta:
#         model = Post
#         fields = ['post_type','title','post_id','source','origin','description','contentType','image_content'
#         ,'post_author','comments','published','unlisted']

# class PostTextSerializer(serializers.ModelSerializer):
#     post_author = AuthorSerializer(read_only=True)
#     class Meta:
#         model = Post
#         fields = ['post_type','title','post_id','source','origin','description','contentType','text_content'
#         ,'post_author','comments','published','unlisted']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # commentsSrc = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = ['type','title','post_id','source','origin','description','contentType','content'
        ,'author','comments','published','visibility','unlisted']


class LikeSerializer(serializers.ModelSerializer):
    # type is only provided to satisfy API format
    #type = serializers.CharField(default="Like", source="get_api_type", read_only=True)

    # author will be created and validated separately
    #author = AuthorSerializer(required=False)
    class Meta:
        model = Like
        fields = '__all__'
        # fields = [
        #     "type",
        #     "summary",
        #     "author",
        #     "object"
        # ]

class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = '__all__'