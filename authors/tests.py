from django.conf.urls import url
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status, response
from django.test import TestCase, Client
from .models import *

from django.contrib.auth.models import User
# Create your tests here.


class SignUpAndLogInTest(APITestCase):

    def setUp(self):
        self.request1 = { 'username': "siyuan9", 'displayName': "Rain", 'password': "123", 'github': "rain", 'profileImage': "null" }
        self.login1 = {'username': "admin", 'password': "123"}
        self.login2 = {'username': "siyuan9", 'password': "123"}
        self.pending_author = {
            'id': 1,
            'accept': 'accept',
            'pending_author': '{"username": "siyuan9", "displayName": "Rain", "password": "123", "github": "rain", "profileImage": "null"}'

        }

        # self.pending_author = {''}

    def create_user(self):
        self.username = "admin"
        self.password = '123'
        user, created = Author.objects.get_or_create(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        self.user = user

    def test_Author_create(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request1,
            format='json'
        )
        data = PendingAuthor.objects.get(pk=1)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(PendingAuthor.objects.count(),1)


    def test_pending_author(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request1,
            format='json'
        )
        self.create_user()
        url = reverse('authors:login')
        self.client.post(url, self.login1, format='json')
        url = reverse('authors:pending_signup')
        self.client.post(url,self.pending_author, format='json')
        self.assertEqual(PendingAuthor.objects.count(),0)
        self.assertEqual(Author.objects.count(), 2)

    def test_new_user_login(self):
        url = reverse('authors:signup')
        self.client.post(
            url,
            self.request1,
            format='json'
        )
        self.create_user()
        url = reverse('authors:login')
        self.client.post(url, self.login1, format='json')
        url = reverse('authors:pending_signup')
        self.client.post(url, self.pending_author, format='json')
        url = reverse('authors:login')
        response = self.client.post(url, self.login2, format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)


class PostTest(APITestCase):

    def create_user(self):
        self.username = "admin"
        self.password = '123'
        user, created = Author.objects.get_or_create(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        self.user = user


    def setUp(self):
        self.request1 = {'username': "siyuan9", 'displayName': "Rain", 'password': "123", 'github': "rain",
                         'profileImage': "null"}
        self.login1 = {'username': "admin", 'password': "123"}
        self.login2 = {'username': "siyuan9", 'password': "123"}
        self.pending_author = {
            'id': 1,
            'accept': 'accept',
            'pending_author': '{"username": "siyuan9", "displayName": "Rain", "password": "123", "github": "rain", "profileImage": "null"}'

        }
        self.post = {
                        "type": "post",
                        "title": "post 1",
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

        url = reverse('authors:signup')
        self.client.post(
            url,
            self.request1,
            format='json'
        )
        self.create_user()
        url = reverse('authors:login')
        self.client.post(url, self.login1, format='json')
        url = reverse('authors:pending_signup')
        self.client.post(url, self.pending_author, format='json')
        url = reverse('authors:login')
        self.author = self.client.post(url, self.login2, format='json')
        print(self.author)
        self.author = Author.objects.get(username=self.request1['username'])
        self.author_id = self.author.author_id
        print(self.author_id)

    # def test_create_post(self):
    #     url = reverse('authors:post_a_post', args=[self.author_id])
    #     response = self.client.post(url, self.post1, format='json')
    #     print(response.data)

