from rest_framework import serializers
from .models import CategoryModel, FoodModel


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = '__all__'


class FoodSerializers(serializers.ModelSerializer):
    category = CategorySerializers(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=CategoryModel.objects.all(),
        source='category',
        write_only=True
    )
    
    class Meta:
        model = FoodModel
        fields = ['id', 'name', 'description', 'price', 'image', 'created_at', 'updated_at', 'category', 'category_id']