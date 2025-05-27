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
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/', views.CustomUserProfileView.as_view(), name='user_profile'),
    path('profile/update/', views.UpdateCustomUserProfile.as_view(), name='profile_update'),
]
