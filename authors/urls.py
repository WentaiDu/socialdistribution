from django.urls import path,re_path
from authors import views

urlpatterns = [
    path('authors/', views.AuthorList.as_view()),
    re_path(r'authors/(?P<author_id>[(-z)]{36})/', views.AuthorDetail.as_view()),
]