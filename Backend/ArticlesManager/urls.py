from django.urls import path
from . import views

urlpatterns = [

    path('save/', views.save_uploaded_article_View.as_view(), name='save'),
    path('search/', views.search_elastic_docs_by_txt_View.as_view(), name='search'),
    path('getFavories/', views.search_elastic_docs_by_id_View.as_view(), name='getFavories'),
    path('getNonValid/', views.get_non_valid_elastic_docs_View.as_view(), name='getNonValid'),
    path('Delete/<str:IdArticle>/', views.delete_elastic_doc_View.as_view(), name='Delete'),
    path('Update/<str:IdArticle>/', views.update_elastic_doc_View.as_view(), name='Update'),

]