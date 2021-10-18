from rest_framework import serializers
from authors.models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class InboxSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(read_only=True)
    class Meta:
        model = Inbox
        fields = '__all__'


