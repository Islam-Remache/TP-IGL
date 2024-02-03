from django.test import TestCase
from django.urls import reverse, resolve
from .views import *
from rest_framework import status
from rest_framework.test import APIClient

# Create your tests here.
class TestUrls(TestCase):
    def test_url_currentAuth(self):
        url = reverse('test')
        self.assertEqual(resolve(url).func, test)

class TestApi(TestCase):
    def test_GET(self):
        client = APIClient()
        url = 'http://127.0.0.1:8000/nbUtilisateurs/' 
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestUtilisateurModel(TestCase):
    def setUp(self):
        favorites = Favories.objects.create(listIdsArticles=[])
        user = User.objects.create_user('test@example.com2', 'test@example.com2', '1234')
        Utilisateur.objects.create(id=user.id, user=user, fullname='testFullName2', favorites=favorites)

    def test_utilisateurfullname_field(self):
        utilisateur = Utilisateur.objects.get(fullname='testFullName2')
        self.assertEqual(utilisateur.fullname, 'testFullName2')