from django.db.models.query import QuerySet
from django.http.response import Http404
from authors import pagination
from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import *
from rest_framework.response import Response
from rest_framework import status
from authors.pagination import *
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions


class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            response = {
                'detail': 'User logs in successfully!',
                'id': user.author_id,
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)


class SignupAPI(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        print(request.data)
        author = {}
        author['username'] = request.data['username']
        author['displayName'] = request.data['displayName']
        author['password'] = request.data['password']
        author["author_type"] = 'author'
        author['host'] = 'http://'+request.get_host()+'/'
        author['url'] = request.build_absolute_uri()
        author['github'] = "http://github.com/"+request.data['github']
        # author['profileImage'] = author.profileImage
        author_serializer = AuthorSerializer(data=author)
        if author_serializer.is_valid():
            author_serializer.save()
            new_author = Author.objects.get(username=author['username'])
            new_author.set_password(author['password'])
            new_author.save()
            new_author = Author.objects.filter(username=author['username'])
            id = author_serializer.data['author_id']
            new_author.update(url=author['url']+id)
            response = {
                'detail':'User created successfully!'
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else :
            print(author_serializer.errors)

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

    # def post(self,request):
    #     try:
    #         if request.data['type'] == comment:
                

        


class InboxList(generics.GenericAPIView):
    #permission_classes = [permissions.AllowAny]
    
    def get_inbox(self,author_id,request):
        try:
            return PostInbox.objects.get(inbox_author_id=author_id)
        except PostInbox.DoesNotExist:
            return Http404

    def get(self,request, author_id):
        queryset = self.get_inbox(author_id)
        serializer = InboxPostSerializer(queryset)
        return Response(serializer.data)

    def post(self,request,author_id):
        inbox = self.get_inbox(author_id)
        inbox_type = inbox.data['inbox_type']
        inbox_author_id = inbox.data['inbox_author_id']
        if request.data['type'] == 'post':
            items = inbox.data['post_items']
            inbox_post = {}
            inbox_post['inbox_type'] = inbox_type
            inbox_post['inbox_author_id'] = inbox_author_id
            items.append(request.data['post'])
            inbox_post['items'] = items
            inbox_post_serializer = InboxPostSerializer(data = inbox_post)
            if inbox_post_serializer.is_valid():
                inbox_post_serializer.save()
            else:
                print(inbox_post_serializer.errors)
                
        # if request.data['type'] == 'follow':
        #     items = inbox.data['follow_items']
        #     inbox_follow = {}
        #     inbox_follow['inbox_type'] = inbox_type
        #     inbox_follow['inbox_author_id'] = inbox_author_id
        #     items.append(request.data['post'])
        #     inbox_follow['items'] = items
        #     inbox_follow_serializer = InboxFollowSerializer(data = inbox_follow)
        #     if inbox_follow_serializer.is_valid():
        #         inbox_follow_serializer.save()
        #     else:
        #         print(inbox_follow_serializer.errors)

        if request.data['type'] == 'like':
            items = inbox.data['like_items']
            inbox_like = {}
            inbox_like['inbox_type'] = inbox_type
            inbox_like['inbox_author_id'] = inbox_author_id
            items.append(request.data['like'])
            inbox_like['items'] = items
            inbox_like_serializer = InboxLikeSerializer(data = inbox_like)
            if inbox_like_serializer.is_valid():
                inbox_like_serializer.save()
            else:
                print(inbox_like_serializer.errors)
    
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

