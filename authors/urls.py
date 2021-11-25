from django.urls import path,re_path
from django.conf.urls import include
from authors import views
from rest_framework.authtoken import views as drf_auth_views

app_name = 'authors'
urlpatterns = [


    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/likes',views.Likes_list.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/liked',views.LikedList.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/', views.PostDetail.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/', views.PostList.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/comments/(?P<comment_id>[(-z)]{36})/likes', views.LikesCommentList.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/comments', views.CommentList.as_view()),
  

    re_path(r'author/(?P<author_id>[(-z)]{36})/inbox', views.InboxList.as_view()),
    re_path(r'author/(?P<author_id1>[(-z)]{36})/followers/(?P<author_id2>[(-z)]{36})', views.FollowerDetailView.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/followers', views.FollowerList.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/', views.AuthorDetail.as_view()),

    path('login/',views.LoginAPI.as_view(),name='login'),
    path('author/',views.SignupAPI.as_view(),name='signup'),
    path('auth/', include('rest_auth.urls')),
    path('authors/', views.AuthorList.as_view()),
]
