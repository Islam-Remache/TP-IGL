"""
this module contains the views for the ArticlesManager app
it contains the following classes:
    - save_uploaded_article_View: a class to save the uploaded articles to the elastic search server
    - search_elastic_docs_by_txt_View: a class to search articles by text
    - search_elastic_docs_by_id_View: a class to search articles by document id
    - get_non_valid_elastic_docs_View: a class to get the not valid articles for the moderateur
    - delete_elastic_doc_View: a class to delete an article with its Id
    - update_elastic_doc_View: a class to update some article fields (or all of them) and estValidee <--- 1
    - get_nb_articles: a class to get the number of articles in the elastic search server
    - ConnectToES: a function to connect to the elastic search server
    - process_pdf_file: a function to extract the data from a pdf file
    - get_env_variables: a function to get the environment variables

"""

from elasticsearch import Elasticsearch, exceptions
from .models import Auteur
from .documents import ArticleDocument
import ssl
import os
#from dotenv import Dotenv
from dotenv import main
from ssl import create_default_context
from django.http import HttpResponse
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .extruct import process_pdf_file



#######   get env variables    #######
main.load_dotenv()

ELASTIC_USER_NAME= os.getenv('ELASTIC_USER_NAME')
ELASTIC_USER_PASSWORD= os.getenv('ELASTIC_USER_PASSWORD')
ELASTIC_HOST= os.getenv('ELASTIC_HOST')
CERT_PATH= os.getenv('CERT_PATH')
INDEX_NAME= os.getenv('INDEX_NAME')



###### Connect to Elastic Search server #####

def ConnectToES():

    context = create_default_context(cafile=CERT_PATH)
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE
    es = Elasticsearch(
        
        hosts=[f'{ELASTIC_HOST}'],
        basic_auth=(ELASTIC_USER_NAME, ELASTIC_USER_PASSWORD),
        ssl_context=context,
        verify_certs=False,
    )
    return es


######   Save Uploaded articles To Elastic Search #######

class save_uploaded_article_View(APIView):
    def post(self,request):
        try:
            es = ConnectToES()
            pdf_url =json.loads(request.body.decode('utf-8')) 
            print(pdf_url['Url'])
            data= process_pdf_file(pdf_url['Url'])  # Actually here will go the extraction function
            print(data)
            auteur_instances= []
        
            for auteur in data['Auteurs']:
                auteur_instance = Auteur(
                    NomComplet=auteur['NomComplet'],
                    Institutions = auteur['Institutions']
                    
                    )

                instance_dict=auteur_instance.__dict__  
                instance_dict.pop('_state', None)
                instance_dict.pop('id', None)
                
                
                auteur_instances.append(instance_dict)
            
            article_document = ArticleDocument(
                Titre=data['Titre'],
                Resume = data['Resume'],
                TextIntegral = data['TextIntegral'],
                Url = data['Url'],
                DatePublication = data['DatePublication'],
                estValidee = data['estValidee'],
                Auteurs = auteur_instances,
                MotsCle = data['MotsCle'],
                References = data['References']
            
            )

            create = article_document.save(refresh=True)

            if create == 'created':
                return Response({"message": 'Document created successfully.'})
            else:
                return Response({"message":"Failed to create document"})

        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})


###### Search articles by text #########

class search_elastic_docs_by_txt_View(APIView):
    def get(self,request):
        try:
            es = ConnectToES()
            query= request.GET.get('text', '')
            query_list = query.split()
            print(query_list,' ,text: ',query)

            if(query == ''):
                search_body={
                "query": {
                    "match_all": {}
                },
                "sort": [
                    {
                    "DatePublication": {
                        "order": "desc"
                    }
                    }
                ],
                "size":1000
                }
            else:

                search_body = {
                "query":{
                        "bool": {
                            "filter": [
                                    {
                                    "term": {
                                                "estValidee": 1
                                    }
                                    }
                            ],

                            "must":[{
                                "bool":{
                                    "should": [
                                        {
                                        "multi_match": {
                                            "query": query,
                                            "fields": ["Titre", "Resume", "TextIntegral", "Auteurs.NomComplet"]
                                        }
                                        },
                                        {
                                        "terms": {
                                            "MotsCle": query_list
                                        }
                                        },
                                        {
                                        'nested': {
                                            'path': 'Auteurs',
                                            'query': {
                                                'match': {
                                                    'Auteurs.NomComplet': query
                                                }
                                            }
                                        }
                                        },
                                        
                                    ]
                                }
                            }]
                        }
                },

                "sort": [
                        {
                        "DatePublication": {
                            "order": "desc"
                        }
                        }
                    ],

                'size':1000
            }

            results = es.search(index=INDEX_NAME, body=search_body)
            return Response({ 'Articles Found': results['hits']['hits']})
        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})


###### Search articles by document id // return Favories #####

class search_elastic_docs_by_id_View(APIView):
    def get(self,request):
        try:
            es = ConnectToES()
            ids = request.GET.getlist('ids[]', [])
            search_body = {
                    "query" : {
                        "terms" : {
                            "_id" : ids
                        }
                    },
                    'size':1000
            }

        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})
            

        results = es.search(index=INDEX_NAME, body=search_body)
        return Response({ 'Articles Found': results['hits']['hits']})


###### get the not valid articles for the moderateur #######

class get_non_valid_elastic_docs_View(APIView):
    def get(self,request):
        try:
            es = ConnectToES()

            search_body = {
                "query": {
                        "match": {
                            "estValidee": 0
                        }
            
                    },
                    'size':100
                }
                

            results = es.search(index=INDEX_NAME, body=search_body)
            return Response({ 'Articles Found': results['hits']['hits']})
        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})


###### delete an article with its Id ########

class delete_elastic_doc_View(APIView):
    def delete(self,request,IdArticle):
        
        try:
            es = ConnectToES()
            delet = es.delete(index=INDEX_NAME, id=IdArticle)

            if delet.get('result') == 'deleted':
                return Response({"message": f'Document with ID {IdArticle} deleted successfully.'})
            else:
                return Response({"message":f"Failed to delete document with ID {IdArticle}"})

        except exceptions.NotFoundError:
            return Response({"message":f"Document with ID {IdArticle} not found."})
        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})

##### Update some article fields (or all of them) and estValidee <--- 1 ######

class update_elastic_doc_View(APIView):
    def post(self,request,IdArticle):
        try:
            es = ConnectToES()
            updated_data =json.loads(request.body.decode('utf-8')) 

            update_script_source = ""
            prefix = "ctx._source."

            for key, value in updated_data.items():
                if isinstance(value, list):
                    
                    update_script_source += f"{prefix}{key} = params.{key};"
                else:
                    
                    update_script_source += f"{prefix}{key} = params.{key};"
                
            update_script = {
                "script": {
                    "source": update_script_source,
                    "lang": "painless",
                    "params": updated_data
                }
            }

        
            response = es.update(index=INDEX_NAME, id=IdArticle, body=update_script)

            if response.get('result') == 'updated':
                return Response({"message":f"Document with ID {IdArticle} updated successfully."})
            else:
                return Response({"message":f"Failed to update document with ID {IdArticle}."})
        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})


class get_nb_articles(APIView):
    def get(self,request):
        try:
            es = ConnectToES()
            nb = es.count(index=INDEX_NAME)['count']
            return Response({"nb": nb})
        except Exception as e:
            return Response({"message":f"An error occurred: {str(e)}"})
