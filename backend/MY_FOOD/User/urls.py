from django.urls import path
from .import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', views.CustomUserModelView.as_view(), name='user_registration'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh_token/', TokenRefreshView.as_view(), name='refresh_token'),
]
