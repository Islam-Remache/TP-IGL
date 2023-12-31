from django.http import HttpResponse
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
############################################
from rest_framework.views import APIView
from rest_framework.response import Response
from . serializer import *
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
############################################
# Create your views here.


def test(request): #********************************************************************************
    if request.user.is_authenticated:
        return HttpResponse(f'User auth is : [ id = {request.user.id} , email = {request.user.username}]')
    else :
        return HttpResponse('No user is Authenticated')

class UtilisateurView(ListCreateAPIView): #*********************************************************
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer

class GetUtilisateurView(APIView): #****************************************************************
    def get(self, request):
        utilisateur = Utilisateur.objects.get(id= request.user.id)
        serializer = UtilisateurSerializer(utilisateur)
        return Response(serializer.data)
    
class GetFavoriesView(APIView): #*******************************************************************
    def get(self, request):
        utilisateur = Utilisateur.objects.get(id= request.user.id)
        listIdArticles = utilisateur.favorites.listIdsArticles
        return Response({'listIdsArticles': listIdArticles})

class SignUpView(APIView): #**********************************************************************
    def post(self, request):
        if request.method != 'POST':
            print("***********************")
            print("Get is not Allowd")
            print("***********************")
            return Response({'message': 'Invalid method. This endpoint only accepts POST requests.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        fullname = request.data.get('fullname')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not all([fullname, email, password]):
            return Response({'message': 'Invalid data. Please provide fullname, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user_to_auth = User.objects.create_user(email, email, password)
        favorites = Favories.objects.create(listIdsArticles=[])
        utilisateur = Utilisateur.objects.create(id=user_to_auth.id, user=user_to_auth, fullname=fullname, favorites=favorites)
        utilisateur_serializer = UtilisateurSerializer(utilisateur)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
        return Response({'message': 'Sign up successful', 'user': utilisateur_serializer.data}, status=status.HTTP_201_CREATED)
    
class LogInView(APIView): #******************************************************************************
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful', 'id': user.id , 'email': user.email}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Login failed. Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogOutView(APIView): #*********************************************************************************
    def get(self, request):
        try:
            # Attempt to log out the user
            logout(request)
            return Response({'message': 'LogOut successfuly !!'}, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle any exceptions that may occur during logout
            return Response({'message': f'Error during logout: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AjouterAuFavoriesView(APIView): #**************************************************************************
    def post(self, request, idArticle):
        try:
            user_id = request.user.id
            utilisateur = Utilisateur.objects.get(id=user_id)
            fav_item = utilisateur.favorites
            if not idArticle in fav_item.listIdsArticles:
                fav_item.listIdsArticles.append(idArticle)
                fav_item.save()
                return Response({'message': 'Add to favories successful'}, status=status.HTTP_200_OK)
            else :
                return Response({'message': 'Item Already exists in favories'}, status=status.HTTP_200_OK)
        except Utilisateur.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Favories.DoesNotExist:
            return Response({'message': 'Favorites not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SupprimerDuFavoriesView(APIView): #***********************************************************************
    def post(self, request, idArticle):
        try:
            user_id = request.user.id
            utilisateur = Utilisateur.objects.get(id=user_id)
            fav_item = utilisateur.favorites
            if idArticle in fav_item.listIdsArticles:
                fav_item.listIdsArticles.remove(idArticle)
                fav_item.save()
                return Response({'message': 'Remove from favories successful'}, status=status.HTTP_200_OK)
            else :
                return Response({'message': 'Item does not exists in favories'}, status=status.HTTP_200_OK)
        except Utilisateur.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Favories.DoesNotExist:
            return Response({'message': 'Favorites not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# this function will show the Moderatuer it self his data (in the Side bar), so the Moderateur is authenticated
class GetModerateurView(APIView):
    def get(self, request):
        moderateur = Moderateur.objects.get(id= request.user.id)
        serializer = UtilisateurSerializer(moderateur)
        return Response(serializer.data)
    
class GetAdministrateurView(APIView):
    def get(self, request):
        administrateur = Administrateur.objects.get(id= request.user.id)
        serializer = Administrateur(administrateur)
        return Response(serializer.data)


# get all the Moderateurs and display them in the Administrateur page to be able to see, modify or delete them
class GetAllModerateurView(APIView):
    def get(self, request):
        allModerateurs = Moderateur.objects.all()
        serializer = ModerateurSerializer(allModerateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# Handel the image  
class CreateModerateurView(APIView): 
    def post(self, request):
        fullname = request.data.get('fullname')
        email = request.data.get('email')
        password = request.data.get('password')
        #imageUrl = request.data.get('imageUrl')
        if not all([fullname, email, password]):
            return Response({'message': 'Invalid data. Please provide fullname, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)
        moderateur_to_auth = User.objects.create_user(email, email, password)
        moderateur = Moderateur.objects.create(id=moderateur_to_auth.id, user=moderateur_to_auth, fullname=fullname)
        #moderateur = Moderateur.objects.create(id=moderateur_to_auth.id, user=moderateur_to_auth, fullname=fullname, imageUrl=imageUrl)
        moderateur_serializer = ModerateurSerializer(moderateur)
        return Response({'message': 'Create Moderateur successful', 'Moderateur': moderateur_serializer.data}, status=status.HTTP_201_CREATED)
    
class GetNbUtilisateursView(APIView): #************************************************************************
    def get(self, request):
        nbUtilisateurs = len(Utilisateur.objects.all())
        return Response({'nbUtilisateurs': nbUtilisateurs})

class GetNbModerateursView(APIView): #*************************************************************************
    def get(self, request):
        nbmoderateurs = len(Moderateur.objects.all())
        return Response({'nbmoderateurs': nbmoderateurs})