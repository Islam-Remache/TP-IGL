from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Favories(models.Model):
    listIdsArticles = models.JSONField(default=list)
    #it will have the list of ids of the articles that are stored in Elastic search
    def __str__(self) :
        return f'id : {self.id} , listIdsArticles : {self.listIdsArticles}'


class Utilisateur(models.Model):
    id = models.IntegerField(primary_key = True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    # this user is the refrence of User in django that will be authentificated (its like the user Accout)
    fullname = models.CharField(max_length = 30)
    favorites = models.OneToOneField(Favories, on_delete=models.CASCADE, null=True, blank=True) # Relation one to one
    #id = models.IntegerField(unique = True) => try to link the Utilisateur by it User

    def __str__(self) :
        return f'(id Utilisateur) : {self.id} , Account : [ {self.user.id} , {self.user.email} ] , fullname : {self.fullname}'

class Moderateur(models.Model):
    id = models.IntegerField(primary_key = True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    fullname = models.CharField(max_length = 30)
    imageUrl = models.ImageField(upload_to='moderateurs_images', null=True)
    def __str__(self) :
        return f'(id Moderateur) : {self.id} , Account  : [ {self.user.id} , {self.user.email} ] , fullname : {self.fullname}'
    
class Administrateur(models.Model):
    id = models.IntegerField(primary_key = True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    fullname = models.CharField(max_length = 30)
    def __str__(self) :
        return f'(id Administrateur) : {self.id} , Account : [ {self.user.id} , {self.user.email} ] , fullname : {self.fullname}'
    
class Operation(models.Model):
    moderateurImageUrl = models.ImageField(null=True)
    moderateurFullName = models.TextField(max_length=30)
    titreArticle = models.TextField(max_length=30)
    typeOperation = models.IntegerField()
    def __str__(self):
        return f'moderateurImageUrl: {self.moderateurImageUrl}, moderateurFullName: {self.moderateurFullName}, titreArticle: {self.titreArticle}, typeOperation: {self.typeOperation}'