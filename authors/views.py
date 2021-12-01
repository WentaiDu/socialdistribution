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
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import simplejson as json
from datetime import datetime


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
                'token': Token.objects.get_or_create(user=user)[0].key
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)


class SignupAPI(generics.GenericAPIView):
    serializer_class = PendingAuthorSerializer

    def post(self, request, *args, **kwargs):
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

    def post(self, request, *args, **kwargs):

        auth_header = request.META.get('HTTP_AUTHORIZATION') # get authorized header from HTTP request
        token = auth_header.split(' ')[1] # get token
        user = get_object_or_404(Author, auth_token = token)
        if user.is_staff:
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
                    author['host'] = 'http://' + request.get_host() + '/'
                    author['url'] = request.build_absolute_uri()
                    if new_author['profileImage'] != 'null':
                        author['profileImage'] = new_author['profileImage']
                    author['github'] = "http://github.com/" + new_author['github']
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
                    new_author.save()
                    new_author = Author.objects.filter(username=author['username'])
                    id = author_serializer.data['author_id']
                    new_author.update(url=author['url'] + id)
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

        else:
            response = {
                'details': "Only Admin can accept/reject sign up requests!"
            }
            return Response(response, status.HTTP_400_BAD_REQUEST)


class AuthorList(generics.ListAPIView):

    # context_object_name = "context_authors"
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination

    def get(self,request):
        # auth_header = request.META.get('HTTP_AUTHORIZATION') # get authorized header from HTTP request
        # token = auth_header.split(' ')[1] # get token
        # user = get_object_or_404(Author, auth_token = token) # validate if the token is valid

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
    permission_classes = [permissions.AllowAny]
    queryset = Comment.objects.all()
    lookup_field = 'post_id'
    serializer_class = CommentSerializer
    #pagination_class = CommentPagination

    # def post(self,request):
    #     try:
    #         if request.data['type'] ==:


class InboxView(generics.GenericAPIView):
    serializer_class = InboxSerializer

    def get(self, request, *args, **kwargs):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

        author_id = self.kwargs['author_id']

        try:
            queryset = Inbox.objects.get(inbox_author_id=author_id)
            serializer = InboxSerializer(queryset)
            return Response(serializer.data)
        except:
            queryset = Inbox.objects.create(inbox_author_id=author_id)
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
            Inbox.objects.create(inbox_author_id=author_id, items=items)
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
            print('1')
            print(serializer.errors)
            response = {
                'detail': 'put post failed'
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

        post=Post.objects.get(pk=post_id)
        
        author=Author.objects.get(pk=author_id)
        if not author:
            error="Author id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        elif not post:
            error="Post id not found"
            return Response(error, status=status.HTTP_404_NOT_FOUND)
        a="http://127.0.0.1:8000/author/"+author_id+"/posts/"+post_id
        likes = Like.objects.filter(object=a)
        #serializer =PostSerializer(post, many=True)
        
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikesCommentList(generics.GenericAPIView):
    """
    GET a list of likes from other authors on author_id’s post post_id comment comment_id"""
    queryset = Like.objects.all()
    def get(self, request,author_id, post_id, comment_id):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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
        a="http://127.0.0.1:8000/author/"+author_id+"/posts/"+post_id+"/comments/"+comment_id
        likes = Like.objects.filter(object=a)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikedList(generics.GenericAPIView):
    """
    GET list what public things author_id liked
    """
    def get(self, request,author_id):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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
    permission_classes = [permissions.AllowAny]
    queryset = Post.objects.all()
    serializer_class=PostSerializer

    # def get_queryset(self):
    #     return self.posts

    def get(self,request, author_id):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid
        post_id=uuid.uuid4()
        return PostDetail().put(request,author_id,post_id)




class PostDetail(generics.RetrieveUpdateAPIView):

    permission_classes = [permissions.AllowAny]


    serializer_class = PostSerializer

    def get(self,request,author_id,post_id):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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
        # permission_class=[permissions.IsAuthenticatedOrReadOnly]

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid


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

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid


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
    # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
    # token = auth_header.split(' ')[1]  # get token
    # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid
        try:

            author = Author.objects.get(pk=author_id)

            try:
                get_post=Post.objects.get(pk=post_id)
                err_msg = "Post already exists"
                return Response(err_msg, status=status.HTTP_409_CONFLICT)
            except:
                post = {}
                path = request.build_absolute_uri()
                pid = path + str(post_id)
                post['title'] = request.data['title']
                # post['post_id'] = pid
                post['source'] = request.data['source']
                post['origin'] = request.data['origin']
                post['description'] = request.data['description']
                post['contentType'] = request.data['contentType']
                post['author'] = author
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

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

        followers = Follower.objects.filter(following_id=author_id)
        # response = super().list(request,author_id)
        # print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',type(response.data))
        serializer = FollowerSerializer(followers, many=True)

        return Response({'followers':serializer.data})

class FollowerDetailView(APIView):
    serializer_class = FollowerSerializer

    def get(self, request, *args, **kwargs):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

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

        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid

        try:
            follower = Follower.objects.get(following=self.kwargs['author_id1'], author_id =self.kwargs['author_id2'])
            follower.delete()
            return HttpResponseRedirect("/authors/")
        except Exception as e:
            return Response("no such following relation",status=status.HTTP_404_NOT_FOUND)

class FriendRequest(generics.GenericAPIView):
    serializer_class = FriendRequestSerializer
    def put(self, request, author_id1, author_id2):
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
        
        # auth_header = request.META.get('HTTP_AUTHORIZATION')  # get authorized header from HTTP request
        # token = auth_header.split(' ')[1]  # get token
        # user = get_object_or_404(Author, auth_token=token)  # validate if the token is valid
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

