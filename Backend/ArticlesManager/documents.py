from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Article

####   Defining the article document for elastic search index
####   Since elastic search is nosql we have to denormalize data
  
@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'articles_index'


    Auteurs = fields.NestedField(properties={
        'NomComplet': fields.TextField(),
        'Institutions': fields.NestedField(
            properties={
                'Nom': fields.TextField(),
                'Email': fields.TextField()
            }
        ),
        
    })

    MotsCle = fields.Keyword(multi=True)
    References = fields.TextField(multi=True)

 
    class Django:
        model = Article
        fields = ['Titre', 'Resume', 'TextIntegral', 'Url', 'DatePublication', 'estValidee']