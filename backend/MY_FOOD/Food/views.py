from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
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
        if self.action in ['list', 'retrieve', 'by_category']:
            return [AllowAny()]
        return [OnlyAdminJob()]
    
    @action(detail=False, url_path='category/(?P<category_name>[^/.]+)', methods=['get'])
    @permission_classes([AllowAny])
    def by_category(self, request, category_name=None):
        category = get_object_or_404(CategoryModel, name__iexact=category_name)
        foods = FoodModel.objects.filter(category=category)
        serializer = self.get_serializer(foods, many=True)
        return Response(serializer.data)