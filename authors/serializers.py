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