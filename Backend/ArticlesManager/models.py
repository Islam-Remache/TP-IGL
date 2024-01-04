from django.db import models

#### Since the extracted infos will be stored in ES 
#### we have to denormalize data
#### So we will use nested documents
#### instead of sql relations


class Institution(models.Model):
    Nom= models.CharField(max_length=255)
    Email = models.CharField(max_length=255)



class Auteur(models.Model):
    NomComplet= models.CharField(max_length=255)
    Institutions= models.JSONField(
        models.JSONField(
            default=dict, 
            blank=True, 
            null=True
        ),
        default=list,
        blank=True,
        null=True
    )


class Article(models.Model):
    Titre= models.CharField(max_length=255)
    Resume= models.TextField()
    TextIntegral= models.TextField()
    Url= models.CharField(max_length=255)
    DatePublication = models.DateTimeField()
    estValidee = models.IntegerField()


class MotCle(models.Model):
    Designation= models.CharField(max_length=255)
    Article = models.ForeignKey(Article, on_delete=models.CASCADE)


class Reference(models.Model):
    Designation= models.CharField(max_length=255)
    Article = models.ForeignKey(Article, on_delete=models.CASCADE)

