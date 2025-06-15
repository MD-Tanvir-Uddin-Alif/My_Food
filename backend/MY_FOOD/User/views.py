from django.shortcuts import render
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser, OrderModel
from .serializers import CustomUserSerializers, CustomUserProfileSerializers, CustomTokenObtailPairSerializer, OrderSerializer
# Create your views here.

class CustomUserModelView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializers
    permission_classes = [AllowAny]


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            # print(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomUserProfileView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserProfileSerializers
    
    def get_object(self):
        return self.request.user


class UpdateCustomUserProfile(RetrieveUpdateAPIView):
    queryset = CustomUser
    serializer_class = CustomUserProfileSerializers
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtailPairSerializer


class OrderViewModel(ModelViewSet):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return OrderModel.objects.all()
        return OrderModel.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)