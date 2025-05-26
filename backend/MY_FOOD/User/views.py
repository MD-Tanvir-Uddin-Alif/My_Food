from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import CustomUserSerializers
# Create your views here.

class CustomUserModelView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializers
    permission_classes = [AllowAny]
