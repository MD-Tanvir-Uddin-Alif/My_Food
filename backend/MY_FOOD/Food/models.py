from django.db import models

# Create your models here.


class CategoryModel(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class FoodModel(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.ForeignKey(CategoryModel, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='food_images/', blank=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name