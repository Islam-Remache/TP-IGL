from django.urls import path
from . import views

urlpatterns = [
    path('', views.UtilisateurView.as_view(), name='api view'), 
    path('signUp/', views.SignUpView.as_view(), name='signUp'),
    path('logIn/', views.LogInView.as_view(), name='logIn'),
    path('logout/', views.LogOutView.as_view(), name='logOut'),
    path('getFavories/', views.GetFavoriesView.as_view(), name='GetFavories'), 
    path('getUtilisateur/', views.GetUtilisateurView.as_view(), name='GetUtilisateur'),
    path('test/', views.test, name='test'), 
    path('ajouterAuFavories/<int:idArticle>/',views.AjouterAuFavoriesView.as_view(), name='ajouterAuFavories'),
    path('supprimerDuFavories/int:idArticle>/',views.SupprimerDuFavoriesView.as_view(), name='supprimerDuFavories'),
    path('nbUtilisateurs/', views.GetNbUtilisateursView.as_view(), name='nbUtilisateur'), 
    path('nbModerateurs/', views.GetNbModerateursView.as_view(), name='nbModerateurs'),
    path('getAllModerateurs/', views.GetAllModerateurView.as_view(), name='getAllModrateurs'),
    path('getAdministrateur/', views.GetAdministrateurView.as_view(), name='getAdministrateur'),
]