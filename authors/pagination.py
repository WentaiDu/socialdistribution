from django import Request
from rest_framework.pagination  import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict
from models import Post

class AuthorPagination(PageNumberPagination):

    page_size_query_param = "size"
    page_query_param = "page"
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('type', "authors"),
            ('items', data)
         ]))

class CommentPagination(PageNumberPagination):

    page_size_query_param = "size"
    page_query_param = "page"
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('type', "comments"),
            ('page',self.page.paginator.number),
            ('size',self.page.paginator.per_page),
            ('post', Post.url),
            ('id', self.page.paginator.get_posts_page_link()),
            ('items', data)
         ]))