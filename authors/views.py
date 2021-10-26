from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import AuthorPagination,CommentPagination
from rest_framework.response import Response
from rest_framework import status,permissions
from authors.pagination import *
import uuid

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

class InboxList(generics.ListCreateAPIView):
    queryset = Inbox.objects.all()
    serializer_class = InboxSerializer

# #class InboxDetail(generics.RetrieveUpdateDestroyAPIView):
   
#     def get(self, request, *args, **kwargs):
#         id = request.data['id']

class PostList(generics.RetrieveUpdateAPIView):
    # permission=[permissions.IsAuthenticatedOrReadOnly]
    posts = Post.objects.all()
    lookup_field='post_id'
    def get(self,request,*args,**kwargs):
        try:
            author_id=kwargs.get("author_id")
            check=Author.objects.get(pk=author_id)
            self.posts=Post.objects.filter(author_id=author_id)
        except Author.DoesNotExist:
            error_msg="Author not exist."
            return Response(error_msg,status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)

    def post(self,request,author_id):
        post_id=uuid.uuid4()
        return PostDetail().put(request)


class PostDetail(generics.RetrieveUpdateAPIView):
    def get(self,request,author_id,post_id):
        try:
            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk = post_id)
            if post and author:
                if post.visibility != 'PUBLIC':
                    return Response(status=status.HTTP_403_FORBIDDEN)
                else:
                    serializer_class = PostSerializer(post, many=False)
                    return Response(serializer_class.data)
            else:
                raise Exception
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self,request,author_id,post_id):
        permission_class=[permissions.IsAuthenticatedOrReadOnly]
        try:
            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk = post_id)
            if author and post:
                serializer = PostSerializer(post, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                raise Exception
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self,request,author_id,post_id):
        try:
            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk = post_id)
            if author and post:
                post.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                raise Exception
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def put(self, request, author_id, post_id):
        try:
            author = Author.objects.get(pk=author_id)
            post=Post.objects.get(pk=post_id)
            if post:
                err_msg="Post already exists"
                return  Response(err_msg,status=status.HTTP_409_CONFLICT)
            else:
                if author:
                    serializer = PostSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    raise Exception

        except:
            err_msg="Author is not found"
            return Response(err_msg, status=status.HTTP_404_NOT_FOUND)












