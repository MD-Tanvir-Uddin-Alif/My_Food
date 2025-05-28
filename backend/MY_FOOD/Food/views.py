from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import CategoryModel
from .permissions import OnlyAdminJob
from .serializers import CategorySerializers
# Create your views here.

class CategoryView(ModelViewSet):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [OnlyAdminJob]
