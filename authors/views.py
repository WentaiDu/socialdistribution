from authors.models import Author
from authors.serializers import AuthorSerializer
from rest_framework import generics
from http import Response,status


class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)   

class AuthorDetail(generics.RetrieveUpdateAPIView):
    queryset = Author.objects.all()
    lookup_field = 'author_id'
    serializer_class = AuthorSerializer