from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Favories)
admin.site.register(Utilisateur)
admin.site.register(Administrateur)
admin.site.register(Moderateur)
admin.site.register(Operation)