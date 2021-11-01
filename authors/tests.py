from django.conf.urls import url
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status, response
from django.test import TestCase, Client
from .models import *

# Create your tests here.


class SignUpTest(APITestCase):

    def setUp(self):
        self.request1 = { 'username': "siyuan9", 'displayName': "Rain", 'password': "123", 'github': "rain", 'profileImage': "null" }
        self.request2 = { 'username': "siyuan9", 'displayName': "Rain", 'password': "123", 'github': "rain", 'profileImage': "null" }
        self.request3 = {}
        self.request4 = { 'username': "", 'displayName': "Rain", 'password': "123", 'github': "rain", 'profileImage': "null" }
        self.request5 = {'username': "siyuan9", 'displayName': "", 'password': "123", 'github': "rain", 'profileImage': "null"}
        self.request6 = {'username': "siyuan9", 'displayName': "Rain", 'password': "", 'github': "rain", 'profileImage': "null"}

    def test_Author_create(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request1,
            format='json'
        )
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Author.objects.count(), 1)
        author = Author.objects.get(username='siyuan9')
        self.assertEqual(author.username,'siyuan9')
        self.assertEqual(author.displayName,'Rain')
        self.assertEqual(author.github, 'http://github.com/rain')
        self.assertEqual(author.url, 'http://testserver/author/'+str(author.author_id))


    def test_Author_duplicateUsername(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request1,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request2,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)


    def test_Author_NoInput(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request3,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_Author_BadUsername(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request4,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def test_Author_BadDisplayName(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request5,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def test_Author_NoPassword(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.request6,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogInTest(APITestCase):

    def setUp(self):
        self.signup = {'username': "siyuan9", 'displayName': "Rain", 'password': "123", 'github': "rain",
                         'profileImage': "null"}
        self.login1 = {'username': "siyuan9", 'password': "123"}
        self.login2 = {'username': "siyuan9", 'password': "456"}
        self.login3 = {'username': "", 'password': ""}

    def test_Login(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.signup,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('authors:login')
        response = self.client.post(
            url,
            self.login1,
            format='json'
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_Login_WrongPassword(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.signup,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('authors:login')
        response = self.client.post(
            url,
            self.login2,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_Login_NoInput(self):
        url = reverse('authors:signup')
        response = self.client.post(
            url,
            self.signup,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('authors:login')
        response = self.client.post(
            url,
            self.login3,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)