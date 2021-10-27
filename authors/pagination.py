from rest_framework.pagination  import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict

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
            ('items', data)
         ]))
    
class PostPagination(PageNumberPagination):

    page_size_query_param = "size"
    page_query_param = "page"
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('type', "posts"),
            ('page',self.page.paginator.number),
            ('size',self.page.paginator.per_page),
            ('items', data)
         ]))
