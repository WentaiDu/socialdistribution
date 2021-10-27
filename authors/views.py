from authors.models import *
from authors.serializers import *
from rest_framework import generics
from authors.pagination import AuthorPagination,CommentPagination
from rest_framework.response import Response
from rest_framework import status
from authors.pagination import *
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
import simplejson as json

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



class PostList(generics.ListCreateAPIView):
    # permission=[permissions.IsAuthenticatedOrReadOnly]

    queryset = Post.objects.all()
    serializer_class=PostSerializer

    def get_queryset(self):
        return self.posts


    def get(self, request, author_id):

        try:
            check=Author.objects.get(pk=author_id)
            self.posts = Post.objects.filter(author_id=author_id)

        except:
            err_msg='Author does not exist.'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)

        response = super().list(request,author_id)
        return response

    def post(self,request,author_id):
        post_id=uuid.uuid4()
        return PostDetail().put(request,author_id,post_id)




class PostDetail(generics.RetrieveUpdateAPIView):
    lookup_field = 'post_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
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
        # permission_class=[permissions.IsAuthenticatedOrReadOnly]
        try:

            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk = post_id)
            if author and post:
                serializer = PostSerializer(post, data=request.data, partial=True)
                if serializer.is_valid():
                    post=serializer.save()
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                raise Exception
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def delete(self,request,author_id, post_id):
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



    def put(self, request,author_id,post_id):
        try:
            author = Author.objects.get(pk=author_id)
            try:
                post=Post.objects.get(pk=post_id)
                err_msg = "Post already exists"
                return Response(err_msg, status=status.HTTP_409_CONFLICT)
            except:
                serializer = PostSerializer(data=request.data)
                if serializer.is_valid():
                    post=Post.objects.create(author=author,post_id=post_id)
                    post.save()
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except:
            err_msg="Author is not found"
            return Response(err_msg, status=status.HTTP_404_NOT_FOUND)

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

class Follower(generics.ListAPIView):
    def get(self, request, author_id):
        author = Author.objects.get(pk=author_id)
        followers = []
        result = {"type":"followers","items":followers}
        if author:
            try:
                jsonDec = json.decoder.JSONDecoder()
                temp_list = jsonDec.decode(author.followers)
                for id in temp_list:
                    followers.append(author = Author.objects.get(pk=id))
                return Response(result)
            except Exception:
                error = "This user has no followers"
                return Response(error, status=status.HTTP_404_NOT_FOUND)
