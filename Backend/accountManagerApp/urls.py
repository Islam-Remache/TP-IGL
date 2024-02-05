
from django.urls import path
from . import views

urlpatterns = [
    path('', views.UtilisateurView.as_view(), name='api view'), 
    path('signUp/', views.SignUpView.as_view(), name='signUp'),
    path('logIn/', views.LogInView.as_view(), name='logIn'),
    path('logout/', views.LogOutView.as_view(), name='logOut'),
    path('getFavories/<int:idCurrentUser>/', views.GetFavoriesView.as_view(), name='GetFavories'), 
    path('getUtilisateur/<int:idCurrentUser>/', views.GetUtilisateurView.as_view(), name='GetUtilisateur'),
    path('test/', views.test, name='test'), 
    path('ajouterAuFavories/<str:idArticle>/<int:idCurrentUser>/',views.AjouterAuFavoriesView.as_view(), name='ajouterAuFavories'),
    path('supprimerDuFavories/<str:idArticle>/<int:idCurrentUser>/',views.SupprimerDuFavoriesView.as_view(), name='supprimerDuFavories'),
    path('nbUtilisateurs/', views.GetNbUtilisateursView.as_view(), name='nbUtilisateur'), 
    path('nbModerateurs/', views.GetNbModerateursView.as_view(), name='nbModerateurs'),
    path('getAllModerateurs/', views.GetAllModerateurView.as_view(), name='getAllModrateurs'),
    path('getAdministrateur/<int:idCurrentUser>/', views.GetAdministrateurView.as_view(), name='getAdministrateur'),
    path('getModerateur/<int:idCurrentUser>/', views.GetModerateurView.as_view(), name='getModerateur'),
    path('ajouterModerateur/', views.CreateModerateurView.as_view(), name='ajouterModerateur'),
    path('supprimerModerateur/<int:idModerateur>/',views.SupprimerModerateur.as_view(), name='supprimerModerateur'),
    path('modifierModerateur/<int:idModerateur>/',views.ModifierModerateurView.as_view(), name='modifierModerateur'),
    path('creerOperation/<str:titreArticle>/<int:typeOperation>/<int:idCurrentUser>/', views.CreerOperationView.as_view(), name='creerOperation'),
    path('getAllOperations/', views.GetAllOperationsView.as_view(), name='getAllOperations'),
    path('testAuth/', views.test, name='testt'),
]