from rest_framework import serializers
from .models import *

class FavoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favories
        fields = ['id', 'listIdsArticles']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class UtilisateurSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    favorites = FavoriesSerializer()

    class Meta:
        model = Utilisateur
        fields = ['user', 'fullname', 'favorites']

class AdministrateurSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Administrateur
        fields = ['user', 'fullname']

class ModerateurSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Moderateur
        fields = ['user', 'fullname', 'imageUrl']
