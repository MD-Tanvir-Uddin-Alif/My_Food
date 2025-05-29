from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import CategoryModel, FoodModel
from .permissions import OnlyAdminJob
from .serializers import CategorySerializers, FoodSerializers
# Create your views here.

class CategoryView(ModelViewSet):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [OnlyAdminJob]


class FoodView(ModelViewSet):
    queryset = FoodModel.objects.all()
    serializer_class = FoodSerializers
    permission_classes = [OnlyAdminJob]