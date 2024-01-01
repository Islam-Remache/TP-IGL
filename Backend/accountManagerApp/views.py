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

'''
1- Add status to all rest Responses (in case of error)
2- Add verifications to the User input.
3- Add Operation stuff
4- If they don't need message in response then delete it
'''

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
        if (request.user.is_authenticated) :
            utilisateur = Utilisateur.objects.get(id= request.user.id)
            serializer = UtilisateurSerializer(utilisateur)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else :
            return Response({'message' : 'User is not Authenticated'})
    
class GetFavoriesView(APIView): #*******************************************************************
    def get(self, request):
        if (request.user.is_authenticated) :
            utilisateur = Utilisateur.objects.get(id= request.user.id)
            listIdArticles = utilisateur.favorites.listIdsArticles
            return Response({'listIdsArticles': listIdArticles},status=status.HTTP_200_OK)
        else :
            return Response({'message' : 'User is not Authenticated'})

class SignUpView(APIView): #**********************************************************************
    def post(self, request):
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
        else : 
            return Response({'message': 'Sign up successful but you need to do logIn'})
    
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
        if (request.user.is_authenticated) :
            moderateur = Moderateur.objects.get(id= request.user.id)
            serializer = ModerateurSerializer(moderateur)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else :
            return Response({'message' : 'Moderateur is not Authenticated'})
    
class GetAdministrateurView(APIView): #*************************************************************************
    def get(self, request):
        if (request.user.is_authenticated) :
            administrateur = Administrateur.objects.get(id= request.user.id)
            serializer = AdministrateurSerializer(administrateur)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else :
            return Response({'message' : 'Administrateur is not Authenticated'})


# get all the Moderateurs and display them in the Administrateur page to be able to see, modify or delete them
class GetAllModerateurView(APIView): #**************************************************************************
    def get(self, request):
        allModerateurs = Moderateur.objects.all()
        serializer = ModerateurSerializer(allModerateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# Handel the image  
class CreateModerateurView(APIView): #**************************************************************************
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
        return Response({'nbUtilisateurs': nbUtilisateurs}, status=status.HTTP_200_OK)

class GetNbModerateursView(APIView): #*************************************************************************
    def get(self, request):
        nbmoderateurs = len(Moderateur.objects.all())
        return Response({'nbmoderateurs': nbmoderateurs}, status=status.HTTP_200_OK)
    
class SupprimerModerateur(APIView): #**************************************************************************
    def delete(self, request, idModerateur):
        moderateur = Moderateur.objects.get(id = idModerateur)
        moderateur.delete()
        return Response({'message': f'Moderatuer with id : {idModerateur} Removed successful'}, status=status.HTTP_200_OK)
    
class ModifierModerateurView(APIView): #***********************************************************************
    def put(self, request, idModerateur):
        newFullname = request.data.get('newFullname')
        newEmail = request.data.get('newEmail')
        newImageUrl = request.data.get('newImageUrl')
        moderateur = Moderateur.objects.get(id = idModerateur)
        # if the attribut is None that means that it was not changed
        # change the fullname
        if (newFullname is not None):
            moderateur.fullname = newFullname
        if (newEmail is not None):
            moderateurUser = User.objects.get(username = moderateur.user.username)
            moderateurUser.username = newEmail
            moderateurUser.save()
        if (newImageUrl is not None):
            moderateur.imageUrl = newImageUrl
        moderateur.save()
        return Response({'message': f'Moderatuer with id : {idModerateur} Updated successful'}, status=status.HTTP_200_OK)



'''
Just to create an admin
class SignUpView2(APIView): 
    def post(self, request):
        fullname = request.data.get('fullname')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not all([fullname, email, password]):
            return Response({'message': 'Invalid data. Please provide fullname, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user_to_auth = User.objects.create_user(email, email, password)
        administrateur = Administrateur.objects.create(id=user_to_auth.id, user=user_to_auth, fullname=fullname)
        administrateur_serializer = AdministrateurSerializer(administrateur)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
        return Response({'message': 'Sign up successful', 'Admin': administrateur_serializer.data}, status=status.HTTP_201_CREATED)
'''