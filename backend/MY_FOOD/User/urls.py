from django.urls import path
from .import views

urlpatterns = [
    path('register/', views.CustomUserModelView.as_view(), name='user_registration'),
]
