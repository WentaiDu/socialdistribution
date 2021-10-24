from django.db.models.query import QuerySet
from django.http.response import Http404
from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import AuthorPagination,CommentPagination
from rest_framework.response import Response
from rest_framework import status
from authors.pagination import *
from rest_framework import permissions

class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        author = self.perform_create(serializer)
        author.type = "author"
        author.host = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()
        author.url = request.getRequestURL()
        author.github = "http://github.com/"+author.github
        author.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)   

class AuthorDetail(generics.RetrieveUpdateAPIView):
    queryset = Author.objects.all()
    lookup_field = 'author_id'
    serializer_class = AuthorSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    lookup_field = 'post_id'
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

class InboxList(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    
    def get_inbox(self,author_id):
        try:
            return Inbox.objects.get(inbox_author_id=author_id)
        except Inbox.DoesNotExist:
            return Http404

    def get(self,request, author_id):
        queryset = self.get_inbox(author_id)
        serializer = InboxSerializer(queryset)
        return Response(serializer.data)

    def post(self,request,author_id):
        inbox = self.get_inbox(author_id)
        items = inbox.data['items']
        inbox_type = inbox.data['inbox_type']
        inbox_author_id = inbox.data['inbox_author_id']
        if request.data['type'] == 'post':
            inbox_post = {}
            inbox_post['inbox_type'] = inbox_type
            inbox_post['inbox_author_id'] = inbox_author_id
            items.append(request.data['post'])
            inbox_post['items'] = items
            inbox_post_serializer = InboxSerializer(data = inbox_post)
            if inbox_post_serializer.is_valid():
                inbox_post_serializer.save()
            else:
                print(inbox_post_serializer.errors)
                
           #if request.data['type'] == 'follow':
           #if request.data['type'] == 'like':
    
    def delete(self,request,author_id):
        inbox = self.get_inbox(author_id)
        inbox.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

            


# class InboxDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Inbox.objects.all()
#     lookup_field = "author_id"
#     serializer_class = InboxSerializer
#     pagination_class = InboxPagination

#     def create(self,request, *args, **kwargs):
#         new_post = request.data
#         queryset = Inbox.objects.filter(inbox_author=self.request.POST.get("author_id"))

    
    
    


