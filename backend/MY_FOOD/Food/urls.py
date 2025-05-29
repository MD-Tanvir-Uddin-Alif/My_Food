from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryView, FoodView

router = DefaultRouter()
router.register('category',CategoryView)
router.register('food',FoodView)

urlpatterns = [
    path('', include(router.urls)),
]
