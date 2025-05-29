from django.urls import path
from .import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', views.CustomUserModelView.as_view(), name='user_registration'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='Custom_login'),
    path('refresh_token/', TokenRefreshView.as_view(), name='refresh_token'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/', views.CustomUserProfileView.as_view(), name='user_profile'),
    path('profile/update/', views.UpdateCustomUserProfile.as_view(), name='profile_update'),
]
