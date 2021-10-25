from rest_framework import serializers
from authors.models import Author
class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = Author
      fields = "__all__"