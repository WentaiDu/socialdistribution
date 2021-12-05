from django.db.models.query import QuerySet
from django.http.response import Http404
from rest_framework.decorators import api_view

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
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from urllib.parse import urlparse


class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    def post(self, request):
        check_node(request)
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            response = {
                'detail': 'User logs in successfully!',
                'id': user.author_id,
                'token': Token.objects.get_or_create(user=user)[0].key
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)


class SignupAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AuthorSerializer

    def post(self, request, *args, **kwargs):
        check_node(request)
        try:
            PendingAuthor.objects.create(accept='pending',pending_author=json.dumps(request.data))

            response={
                'details': "Thanks for your sign up, please wait for admin's reply.",
            }
            return Response(response,status.HTTP_200_OK)
        except:
            response = {
                'details': "Bad Request!"
            }
            return Response(response, status.HTTP_400_BAD_REQUEST)


class PendingAuthorListAPI(generics.ListCreateAPIView):
    queryset = PendingAuthor.objects.all()
    serializer_class = PendingAuthorSerializer
    permission_classes = [IsAdminUser,IsAuthenticated]

    def post(self, request, *args, **kwargs):
        check_node(request)
        pending_author = PendingAuthorSerializer(request.data)
        if pending_author.data['accept'] == 'accept':
            new_author = json.loads(pending_author.data['pending_author'])
            pending_author_id = pending_author.data['id']
            try:
                author = {}
                author['username'] = new_author['username']
                author['displayName'] = new_author['displayName']
                author['password'] = new_author['password']
                author["author_type"] = 'author'
                author['host'] = request.scheme+'://' + request.get_host() + '/'
                author['url'] = request.build_absolute_uri()
                if new_author['profileImage'] != 'null':
                    author['profileImage'] = new_author['profileImage']
                author['github'] = "https://github.com/" + new_author['github']
            except:
                response = {
                    'detail': 'Bad Input!'
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            author_serializer = AuthorSerializer(data=author)
            if author_serializer.is_valid():
                author_serializer.save()
                new_author = Author.objects.get(username=author['username'])
                new_author.set_password(author['password'])
                id = new_author.author_id
                new_author = Author.objects.filter(username=author['username'])
                a = author['host']+'author/'+str(id)
                new_author.update(id=a)
                new_author.update(url=a)
                new_author = Author.objects.get(username=author['username'])
                response = {
                    'detail': 'User creates succeed!',
                    'id': new_author.author_id,
                    'token': Token.objects.get_or_create(user=new_author)[0].key
                }
                author_request = PendingAuthor.objects.get(id = pending_author_id)
                author_request.delete()
                return Response(response, status=status.HTTP_201_CREATED)

            else:
                print(author_serializer.errors)
                response = {
                    'detail': 'User created failed!'
                }
                return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif pending_author.data['accept'] == 'reject':
            id = request.data['id']
            author = PendingAuthor.objects.get(id=id)
            author.delete()
            response ={
                'details':'This user has been reject to sign up on our server'
            }
            return Response(response, status.HTTP_200_OK)


class AuthorList(generics.ListAPIView):

    # context_object_name = "context_authors"
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination

    def get(self,request):

        check_node(request)
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
    #pagination_class = CommentPagination

    def post(self,request,post_id,author_id):
        try:
            post = Post.objects.get(pk=post_id)
            author = Author.objects.get(pk=author_id)
            comment_id = uuid.uuid4()
            path = request.build_absolute_uri()
            comment = {}
            comment['contentType'] = request.data['contentType']
            # comment['comment_author'] = author
            comment['comment'] = request.data['comment']
            comment['published'] = datetime.today().strftime('%Y-%m-%d %H:%M')
            comment['id']=path+str(comment_id)
            # comment['comment_post'] = post
            serializer = CommentSerializer(data=comment)
            if serializer.is_valid():
                comment = Comment.objects.create(**serializer.validated_data,comment_post=post,comment_author=author,comment_id=comment_id)
                comment.save()
                return Response({'serializer': serializer.data})
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_404_NOT_FOUND)


    def get(self,request, post_id,author_id):
        check_node(request)
        try:
            post=Post.objects.get(pk=post_id)
            author = Author.objects.get(pk=author_id)
            Comments = Comment.objects.filter(comment_post=post)
        except Exception as e:
            return Response(e,status=status.HTTP_404_NOT_FOUND)

        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = CommentSerializer(Comments, many=True)
        return Response({'comments': serializer.data})
        # if serializer.is_valid():
        #     return Response({'comments':serializer.data})
        # else:
        #     return Response(status=status.HTTP_404_NOT_FOUND)


class InboxView(generics.GenericAPIView):
    serializer_class = InboxSerializer

    def get(self, request, *args, **kwargs):
        check_node(request)
        author_id = self.kwargs['author_id']

        try:

            queryset = Inbox.objects.get(inbox_author_id=author_id)
            serializer = InboxSerializer(queryset)
            return Response(serializer.data)
        except:
            author = Author.objects.get(author_id=author_id)
            queryset = Inbox.objects.create(inbox_author_id=author_id,author=author.id)
            serializer = InboxSerializer(queryset)
            return Response(serializer.data)


    @swagger_auto_schema(
    request_body= PostSerializer,
       responses = {
            "201" : openapi.Response(
                description = "Create Inbox Post Succeeds",
                examples={
                    'application/json': {
                            "type": "post",
                            "title": "string",
                            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
                            "origin": "http://whereitcamefrom.com/posts/zzzzz",
                            "description": "string",
                            "contentType": "text/markdown",
                            "content": "string",
                            "author": {
                                "username": "string",
                                "password": "string",
                                "author_type": "string",
                                "author_id": "e38e962a-24e9-4199-be01-86eb68114f14",
                                "host": "string",
                                "displayName": "string",
                                "url": "http://127.0.0.1:5454/author/e38e962a-24e9-4199-be01-86eb68114f14",
                                "github": "string"
                            },
                            "comments": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments",
                            "visibility": "PUBLIC",
                            "unlisted": True
                    }
                }
            )
       },
        tags=['Inbox']
    )
    def post(self, request, *args, **kwargs):
        check_node(request)
        author_id = self.kwargs['author_id']
        try:
            inbox = Inbox.objects.get(inbox_author_id=author_id)
            if inbox.items == None:
                items = []
                items.append(request.data)
                items = json.dumps(items)
                inbox.items = items
                inbox.save()
                response = {
                    'detail': 'succeed'
                }
                return Response(response, status=status.HTTP_200_OK)
        except:
            items = []
            items.append(request.data)
            items = json.dumps(items)
            author = Author.objects.get(author_id=author_id)
            a = Inbox.objects.create(inbox_author_id=author_id,author=author.id, items=items)
            print(a)
            if request.data['type'] == 'like':
                author = Author.objects.get(author_id=request.data['author']["author_id"])
                like = Like.objects.create(context=request.data["context"], type=request.data["type"], author=author,
                                           summary=request.data["summary"], object=request.data["object"])
            response = {
                'detail': 'succeed'
            }
            return Response(response, status=status.HTTP_200_OK)

        items = inbox.items
        items = json.loads(items)

        if request.data['type'] == 'like':
            author = Author.objects.get(author_id=request.data['author']["author_id"])
            like = Like.objects.create(context=request.data["context"], type=request.data["type"], author=author,
                                       summary=request.data["summary"], object=request.data["object"])
            serializer = LikeSerializer(data=like.__dict__)


        elif request.data['type'] == 'post':
            serializer = PostSerializer(data=request.data)

        elif request.data['type'] == 'follow':
            serializer = FollowerSerializer(data=request.data)

        if serializer.is_valid():
            items.append(serializer.data)
            items = json.dumps(items)

            inbox = Inbox.objects.filter(inbox_author_id=author_id)
            inbox.update(items=items)
            response = {
                'detail': 'put post succeed'
            }
            return Response(response, status=status.HTTP_200_OK)

        else:
            print(serializer.errors)
            response = {
                'detail': 'put post failed'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        check_node(request)
        author_id = self.kwargs['author_id']
        try:
            inbox = Inbox.objects.get(inbox_author_id=author_id)
            inbox.delete()
            response = {
                'detail': 'Inbox delete succeed'
            }
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = {
                'detail': 'Inbox delete failed'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)





class Likes_list(generics.GenericAPIView):
    """GET a list of likes from other authors on author_id’s post post_id"""
    queryset = Like.objects.all()
    def get(self, request,author_id, post_id):

        post=Post.objects.get(pk=post_id)
        
        author=Author.objects.get(pk=author_id)
        if not author:
            error="Author id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        elif not post:
            error="Post id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)


        path = request.build_absolute_uri()
        a = path[:-6]
        likes = Like.objects.filter(object=a)
        #serializer =PostSerializer(post, many=True)
        
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikesCommentList(generics.GenericAPIView):
    """
    GET a list of likes from other authors on author_id’s post post_id comment comment_id"""
    queryset = Like.objects.all()
    def get(self, request,author_id, post_id, comment_id):
        check_node(request)

        comment_idk = Comment.objects.get(pk=comment_id)
        # if comment_id!=post_id:
        #     error="comment_id and post_id is not match!"
        #     #print(error)
        #     return Response(error, status=status.HTTP_404_NOT_FOUND)
        if not Author.objects.get(pk=author_id):
            error="Author id not found"
            #print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        if not Post.objects.get(pk=post_id):
            error="Post id not found"
            #print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        if not comment_id:
            error="Comment id not found"
            #print(error)
            return Response(error, status=status.HTTP_404_NOT_FOUND)


        path = request.build_absolute_uri()
        a = path[:-9]
        print(a)
        print(a)
        print(a)
        print(a)
        print(a)
        print(a)
        print(a)
        print(a)
        # a="http://127.0.0.1:8000/author/"+author_id+"/posts/"+post_id+"/comments/"+comment_id
        likes = Like.objects.filter(object=a)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikedList(generics.GenericAPIView):
    """
    GET list what public things author_id liked
    """
    def get(self, request,author_id):
        check_node(request)

        author=Author.objects.get(pk=author_id)
        if not author:
            error = "Author not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)

        liked = Like.objects.filter(author_id=author_id)
        serializer = LikeSerializer(liked, many=True)
        response = {
            "type": "liked",
            "items": serializer.data
        }
        return Response(response)


class PostList(generics.ListCreateAPIView):
    # permission=[permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class=PostSerializer

    # def get_queryset(self):
    #     return self.posts

    def get(self,request, author_id):
        check_node(request)

        try:
            check=Author.objects.get(pk=author_id)
            posts = Post.objects.filter(author_id=author_id)

        except:
            err_msg='Author does not exist.'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)

        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = PostSerializer(posts, many=True)

        return Response({'posts':serializer.data})


    def post(self,request,author_id):
        check_node(request)
        post_id=uuid.uuid4()
        return PostDetail().put(request,author_id,post_id)




class PostDetail(generics.RetrieveUpdateAPIView):

    permission_classes = [permissions.AllowAny]


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
                    return Response({'post':serializer.data})
            else:
                raise Exception
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def post(self,request,author_id,post_id):

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
                get_post=Post.objects.get(pk=post_id)
                err_msg = "Post already exists"
                return Response(err_msg, status=status.HTTP_409_CONFLICT)
            except:
                post = {}
                path = request.build_absolute_uri()
                pid = path + str(post_id)+'/'
                post['title'] = request.data['title']
                # post['post_id'] = pid
                post['source'] = pid
                post['origin'] = pid
                post['description'] = request.data['description']
                post['contentType'] = request.data['contentType']
                post['author'] = author
                post['id'] = pid
                post['content'] = request.data['content']
                post['comments'] = pid+'/comments'
                post['published'] = datetime.today().strftime('%Y-%m-%d %H:%M')
                post['visibility'] = request.data['visibility']
                post['unlisted'] = request.data['unlisted']
                serializer = PostSerializer(data=post)
                if serializer.is_valid():
                    post = Post.objects.create(**serializer.validated_data, author=author, post_id=post_id)
                    post.save()
                    return Response({'serializer': serializer.data})
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        except Exception as e:
            err_msg="Author is not found"
            return Response(err_msg, status=status.HTTP_404_NOT_FOUND)


class FollowerList(generics.ListAPIView):

    # serializer_class = FollowerSerializer
    # context_object_name = "authors"
    # def get_queryset(self, **kwargs):
    #    return Follower.objects.filter(following_id=self.kwargs['author_id'])

    def get(self,request, author_id):

        followers = Follower.objects.filter(following_id=author_id)
        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = FollowerSerializer(followers, many=True)

        return Response({'followers':serializer.data})

class FollowerDetailView(APIView):
    serializer_class = FollowerSerializer

    def get(self, request, *args, **kwargs):
        check_node(request)
        try:
            #author1 = Author.objects.get(pk=author_id1)
            #author2 = Author.objects.filter(pk=author_id2)
            follower = Follower.objects.get(following=self.kwargs['author_id1'], author_id =self.kwargs['author_id2'])
            serializer = FollowerSerializer(follower)

        except Exception as e:
            err_msg='No following relation'
            return Response(err_msg,status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        check_node(request)

        try:
            author1 = Author.objects.get(author_id=self.kwargs['author_id1'])
            author2 = Author.objects.get(author_id=self.kwargs['author_id2'])
            follower = Follower.objects.filter(following=self.kwargs['author_id1'], author_id =self.kwargs['author_id2'])
            assert len(follower) == 0, "have relation"

            author = {}
            author['author_id'] = author2.author_id
            author["author_type"] = 'author'
            author['displayName'] = author2.displayName
            author['host'] = author2.host
            author['url'] = author2.url
            author['github'] = author2.github
            author['profileImage'] =author2.profileImage
            author['following'] = author1.author_id
            serializer = FollowerSerializer(data = author)
            serializer.is_valid()
            serializer.save()

            return Response(serializer.data)
        except Exception as e:
            err_msg='No following relation'
            
            return Response(str(e),status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        check_node(request)

        try:
            follower = Follower.objects.get(following=self.kwargs['author_id1'], author_id =self.kwargs['author_id2'])
            follower.delete()
            return HttpResponseRedirect("/authors/")
        except Exception as e:
            return Response("no such following relation",status=status.HTTP_404_NOT_FOUND)

class FriendRequest(generics.GenericAPIView):
    serializer_class = FriendRequestSerializer
    def put(self, request, author_id1, author_id2):
        check_node(request)
    # def put(self, request, *args, **kwargs):
        # author1 = Author.objects.get(author_id=self.kwargs['author_id1'])
        # author2 = Author.objects.get(author_id=self.kwargs['author_id2'])
        # follow_request = Follower.objects.filter(following=self.kwargs['author_id1'], author_id =self.kwargs['author_id2'])
        author1 = Author.objects.get(id=author_id1)
        author2 = Author.objects.get(id=author_id2)

        follow_request = FriendRequest_M.objects.get(actor=author1,object=author2,  status=FriendRequest_M.State.PENDING)
        if not follow_request:
            error="Author not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        else:
            follow_request.friend_state=FriendRequest_M.State.APPROVE
            serializer = FriendRequestSerializer(follow_request, many=True)
            serializer.is_valid()
            serializer.save()
            return Response(serializer.data)


    def delete(self, request, author_id1, author_id2):
        # check_node(request)
        author1 = Author.objects.get(id=author_id1)
        author2 = Author.objects.get(id=author_id2)
        follow_request = FriendRequest_M.objects.get(actor=author1,object=author2,  status=FriendRequest_M.State.PENDING)
        if not follow_request:
            error="Author not found OR no FriendRequest"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        follow_request.delete()
        response = {
            'response': 'Friend Request delete succeed'
        }
        return Response(response, status=status.HTTP_200_OK)
    def get(self, request, author_id1, author_id2):
        # check_node(request)
        author1 = Author.objects.get(id=author_id1)
        author2 = Author.objects.get(id=author_id2)
        if not author1:
            error="Author 1 id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        elif not author2:
            error="Author 2 id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        follow_request = FriendRequest_M.objects.filter(actor=author1, object =author2,status=FriendRequest_M.State.PENDING)

        #serializer =PostSerializer(post, many=True)
        
        serializer = FriendRequestSerializer(follow_request, many=True)
        return Response(serializer.data)


class publicpost(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Post.objects.all()
    serializer_class=PostSerializer


# class ServerNodesAPI(generics.ListCreateAPIView):
#     serializer_class = ServerNodesSerializer
#     queryset = ServerNodes.objects.all()
#     permission_classes = [IsAdminUser,IsAuthenticated]
#
#     def post(self, request):
#         check_node(request)
#         try:
#             url = request.data["node"]
#             url = url.split('/')
#             node = url[2]
#             ServerNodes.objects.create(node=node)
#             response = {
#                 'details': 'Add server node succeed!'
#             }
#             return Response(response, status.HTTP_200_OK)
#         except:
#             response = {
#                 'details': 'Add server node failed!'
#             }
#             return Response(response, status.HTTP_400_BAD_REQUEST)
#
#
# class DeleteNodesAPI(generics.GenericAPIView):
#     serializer_class = ServerNodesSerializer
#     permission_classes = [IsAdminUser, IsAuthenticated]
#
#     @swagger_auto_schema(
#         request_body=ServerNodesSerializer,
#         responses={
#             "201": openapi.Response(
#                 description="Create Inbox Post Succeeds",
#                 examples={
#                     'application/json': {
#                         "node": 'node'
#                     }
#                 }
#             )
#         },
#         tags=['delete_node']
#     )
#     def delete(self, request):
#         check_node(request)
#         try:
#             url = request.data["node"]
#             url = url.split('/')
#             node = url[2]
#             node = ServerNodes.objects.get(node=node)
#             node.delete()
#             response = {
#                 'details': 'Delete server node succeed!'
#             }
#             return Response(response, status.HTTP_200_OK)
#         except:
#             response = {
#                 'details': 'Delete server node failed or node not exist!'
#             }
#             return Response(response, status.HTTP_400_BAD_REQUEST)
#
#
def check_node(request):
    # meta = request.META
    # print('meta is', meta)
    # url = request.META['HTTP_REFERER']
    # url_li = url.split('/')
    # node = url_li[2]
    # print('url is', url)
    # print('node is', node)
    # get_object_or_404(ServerNodes, node=node)
    pass
@api_view(['POST'])

def Share(request, author_id,post_id):
    try:
        post=Post.objects.get(pk=post_id)
        author = Author.objects.get(pk=author_id)


    except Exception as e:
        return Response(str(e), status.HTTP_400_BAD_REQUEST)
