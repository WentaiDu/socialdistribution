from rest_framework import serializers
from authors.models import Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["author_type","author_id","host","displayName","github"]