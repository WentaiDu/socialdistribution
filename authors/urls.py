from django.urls import path,re_path
from django.conf.urls import include
from authors import views
from rest_framework.authtoken import views as drf_auth_views

app_name = 'authors'
urlpatterns = [


    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/likes',views.Likes_list.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/liked',views.LikedList.as_view()),



    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/comments/(?P<comment_id>[(-z)]{36})/likes', views.LikesCommentList.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/comments', views.CommentList.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})', views.PostDetail.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/', views.PostList.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/inbox', views.InboxView.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/followers/(?P<foreign_author_id>[(-z)]{36})', views.FriendRequestAPI.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/followers/', views.FollowerListAPI.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/friends/', views.Myfriend.as_view()),

    re_path(r'public', views.publicpost.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/', views.AuthorDetail.as_view()),

    path('login/',views.LoginAPI.as_view(),name='login'),
    path('author/',views.SignupAPI.as_view(),name='signup'),
    path('auth/', include('rest_auth.urls')),
    path('authors/', views.AuthorList.as_view()),
    #path('nodes/',views.ServerNodesAPI.as_view(), name = 'server_nodes'),
    #path('delete_nodes/',views.DeleteNodesAPI.as_view(), name ='delete_nodes')
    path('pendingsignup/',views.PendingAuthorListAPI.as_view(),name='pending_signup'),
]
