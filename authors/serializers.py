from django.db.models import fields
from rest_framework import serializers
from authors.models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    post_author = AuthorSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['post_type','title','post_id','source','origin','description','contentType','content'
        ,'post_author','comments','published','unlisted']


# class PostTextSerializer(serializers.ModelSerializer):
#     post_author = AuthorSerializer(read_only=True)
#     class Meta:
#         model = Post
#         fields = ['post_type','title','post_id','source','origin','description','contentType','text_content'
#         ,'post_author','comments','published','unlisted']





class InboxSerializer(serializers.ModelSerializer):
    items = PostSerializer(many=True,read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'