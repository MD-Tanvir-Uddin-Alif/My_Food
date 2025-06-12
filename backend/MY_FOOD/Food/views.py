from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .models import CategoryModel, FoodModel
from .permissions import OnlyAdminJob
from .serializers import CategorySerializers, FoodSerializers
# Create your views here.

class CategoryView(ModelViewSet):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializers
    # permission_classes = [OnlyAdminJob]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [OnlyAdminJob()]


class FoodView(ModelViewSet):
    queryset = FoodModel.objects.all()
    serializer_class = FoodSerializers
    # permission_classes = [OnlyAdminJob]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [OnlyAdminJob()]