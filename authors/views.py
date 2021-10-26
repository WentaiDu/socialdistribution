from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import AuthorPagination,CommentPagination
from rest_framework.response import Response
from rest_framework import status
from authors.pagination import *
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        displayName = request.data["displayName"]
        password = request.data["password"]
        user = authenticate(displayName=displayName, password=password)
        if user is not None:
            login(request,user)
            response = {
                'detail': 'User logs in successfully!',
                'id': user.id,
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)

class Signup(generics.CreateAPIView):
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

class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination

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
class Like(APIView):
    """GET a list of likes from other authors on author_id’s post post_id"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination
    def get(self, author_id, post_id):
        post=Post.objects.get(pk=post_id)
        if not Author.objects.get(pk=author_id):
            
            error="Author id not found"
            print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        elif not post:
            error="Post id not found"
            print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        
        likes = Like.objects.filter(object=post.url)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

class LikesCommentList(APIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination

    """
    GET a list of likes from other authors on author_id’s post post_id comment comment_id"""

    def get(self, author_id, post_id, comment_id):
        comment_id = Comment.objects.get(pk=comment_id)
        if not Author.objects.get(pk=author_id):
            error="Author id not found"
            print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        if not Post.objects.get(pk=post_id):
            error="Post id not found"
            print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        if not comment_id:     
            error="Comment id not found"
            print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)      
        
        likes = Like.objects.filter(object=comment_id.url)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikedList(APIView):
    
    """
    GET list what public things author_id liked
    """
    def get(self, author_id):
        author=Author.objects.get(pk=author_id)
        if not author:
            error = "Author not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        
        likes = Like.objects.filter(author_id=author_id)
        serializer = LikeSerializer(likes, many=True)
        response = {
            "type": "liked",
            "items": serializer.data
        }
        return Response(response)

