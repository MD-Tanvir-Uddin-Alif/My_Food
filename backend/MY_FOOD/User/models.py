from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from Food.models import FoodModel
from cloudinary.models import CloudinaryField
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
    # profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    profile_image = CloudinaryField('profile_image',folder='profile_images/', blank=True, null=True)
    address = models.TextField()
    role = models.CharField(max_length=20, choices=ROLE, default='Customer')
    account_created_at = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = 'Custom User'
        verbose_name_plural = 'Custom Users'
    
    def __str__(self):
        return self.username




class OrderModel(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Cash on Delivery'),
        ('bkash', 'bKash'),
        ('nagad', 'Nagad'),
        ('visa', 'Visa'),
    ]

    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    subtotal =models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"order {self.id} by {self.user.email}"


class OrderItemModel(models.Model):
    order = models.ForeignKey(OrderModel, related_name='items', on_delete=models.CASCADE)
    food = models.ForeignKey(FoodModel, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity} X {self.food.name}"