from django.contrib import admin
from .models import CategoryModel, FoodModel
# Register your models here.

@admin.register(CategoryModel)
class CategoryModelAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(FoodModel)
class FoodModelAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'price', 'category', 'created_at', 'updated_at')
    search_fields = ('name', 'category',)
