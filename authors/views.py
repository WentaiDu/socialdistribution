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
                'id': user.author_id
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)

class SignupAPI(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AuthorSerializer
    def post(self, request, *args, **kwargs):
        try:
            author = {}
            author['username'] = request.data['username']
            author['displayName'] = request.data['displayName']
            author['password'] = request.data['password']
            author["author_type"] = 'author'
            author['host'] = 'http://'+request.get_host()+'/'
            author['url'] = request.build_absolute_uri()
            if request.data['profileImage'] != 'null':
                author['profileImage'] = request.data['profileImage']
            author['github'] = "http://github.com/"+request.data['github']
        except:
            response = {
                'detail': 'Bad Input!'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
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
            response = {
                'detail':'User created failed!'
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AuthorList(generics.ListAPIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "authors.html"
    # context_object_name = "context_authors"
    # queryset = Author.objects.all()
    # serializer_class = AuthorSerializer
    # pagination_class = AuthorPagination

    def get(self,request):
        authors = Author.objects.all()

        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = AuthorSerializer(authors, many=True)

        return Response({'authors':serializer.data})

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
    serializer_class = InboxPostSerializer
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



class PostList(generics.ListCreateAPIView):
    # permission=[permissions.IsAuthenticatedOrReadOnly]

    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'
    queryset = Post.objects.all()
    serializer_class=PostSerializer

    # def get_queryset(self):
    #     return self.posts


    def get(self,request, author_id):

        try:
            check=Author.objects.get(pk=author_id)
            posts = Post.objects.filter(author_id=author_id)

        except:
            err_msg='Author does not exist.'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)

        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = PostSerializer(posts, many=True)

        return Response({'serializer':serializer.data})


    def post(self,request,author_id):
        post_id=uuid.uuid4()
        return PostDetail().put(request,author_id,post_id)




class PostDetail(generics.RetrieveUpdateAPIView):
    '''

    '''
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
                    serializer = PostSerializer(post, many=False)
                    return Response({'serializer':serializer.data})
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
                    return Response({'serializer':serializer.data})
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
                    return Response({'serializer':serializer.data})
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

class FollowerList(generics.ListAPIView):


    def get(self, request, author_id):
        queryset = Follower.objects.filter(status = True, following=author_id)
        serializer = FollowerSerializer(queryset)
        return Response(serializer.data)

        try:
            serializer.validate()
            return Response(serializer.data)
        except Exception as e:
            err_msg = 'No followers.'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)

#    def get_queryset(self, **kwargs):
#        self.author = get_object_or_404(Author, author_id=self.kwargs['author_id'])
#        return Follower.objects.filter(following_id=self.kwargs['author_id'])

class FollowerDetailView(APIView):
    serializer_class = FollowerSerializer

    def get(self, request, *args, **kwargs):
        try:
            #author1 = Author.objects.get(pk=author_id1)
            #author2 = Author.objects.filter(pk=author_id2)
            follower = Follower.objects.get(status = True, following=self.kwargs['author_id1'], id =self.kwargs['author_id2'])
            serializer = FollowerSerializer(follower)
            serializer.validate()

        except Exception as e:
            err_msg='No following relation'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):

        try:
            author1 = Author.objects.get(pk=author_id1)
            author2 = Author.objects.get(pk=author_id2)
            follower = Follower.objects.filter(status = True, following=self.kwargs['author_id1'], id =self.kwargs['author_id2'])
            assert not follower.exists(), "already following"
            author = {}
            author['username'] = author2['username']
            author['displayName'] = author2['displayName']
            author['password'] = author2['password']
            author["author_type"] = 'author'
            author['host'] = author2['host']
            author['url'] = author2['url']
            author['profileImage'] =author2['profileImage']
            author['github'] = author2['github']
            author['following'] = author1['author_id']
            serializer = FollowerSerializer(data = author)
            serializer.validate()
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            err_msg='No following relation'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            follower = Follower.objects.get(status = True, following=self.kwargs['author_id1'], id =self.kwargs['author_id2'])
            follower.delete()
            return Response()
        except Exception as e:
            return Response(e,status=status.HTTP_404_NOT_FOUND)
