from authors.models import Author
from authors.serializers import AuthorSerializer
from rest_framework import generics


class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateAPIView):
    queryset = Author.objects.all()
    lookup_field = 'author_id'
    serializer_class = AuthorSerializer