from django.urls import path,re_path
from django.conf.urls import include
from authors import views
from rest_framework.authtoken import views as drf_auth_views
urlpatterns = [
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/', views.PostDetail.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/', views.PostList.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/posts/(?P<post_id>[(-z)]{36})/comments', views.CommentList.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/inbox', views.InboxList.as_view()),
    re_path(r'author/(?P<author_id1>[(-z)]{36})/followers/(?P<author_id2>[(-z)]{36})/', views.ModifyFollowerDetail.as_view()),
    #re_path(r'author/(?P<author_id>[(-z)]{36})/followers', views.ShowFollower.as_view()),

    re_path(r'author/(?P<author_id>[(-z)]{36})/', views.AuthorDetail.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('author/', views.AuthorList.as_view()),

]
