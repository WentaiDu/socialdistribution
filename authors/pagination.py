from rest_framework.pagination  import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict


class MyCustomPagination(PageNumberPagination):

    page_size_query_param = "size"

    page_query_param = "page"
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('type', "authors"),
            ('items', data)
         ]))