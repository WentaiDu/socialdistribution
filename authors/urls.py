from django.urls import path,re_path
from authors import views

urlpatterns = [
    path('author/', views.AuthorList.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/', views.AuthorDetail.as_view()),
    re_path(r'author/(?P<author_id>[(-z)]{36})/inbox', views.InboxList.as_view()),
    path('inbox/', views.InboxList.as_view()),
]