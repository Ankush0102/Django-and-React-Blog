from django.urls import path, include
from .views import ArticleLIst, ArticleDetails, UserViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('articles/', ArticleLIst.as_view()),
    path('articles/<int:id>/', ArticleDetails.as_view()),





    # path('articles/', article_list),
    # path('articles/<int:pk>/', article_details),
]
