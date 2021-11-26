from django.db.models.query import QuerySet
from django.http.response import Http404
from authors import pagination
from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import *
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework import status
from authors.pagination import *
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import simplejson as json


class AuthorServerAPI(generics.GenericAPIView):

    def get(self,author_id):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)
        author = get_object_or_404(Author, author_id=author_id)
        serializer = AuthorSerializer(data=author)
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            print(serializer.errors)

class AuthorDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Author.objects.all()
    lookup_field = 'author_id'
    serializer_class = AuthorSerializer

class PostServerAPI(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)
        post_id = self.kwargs['']







