from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    GENDER = [
        ('M','Male'),
        ('F','Female'),
        ('O','Other'),
    ]

    ROLE = [
        ('ADMIN', 'Admin'),
        ('CUSTOMER', 'Customer'),
    ]

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=12, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER, blank=True)
    address = models.TextField()
    role = models.CharField(max_length=1, choices=ROLE, default='Customer')
    account_created_at = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username