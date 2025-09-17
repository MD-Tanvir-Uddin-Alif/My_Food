from rest_framework import serializers
from .models import CategoryModel, FoodModel


class CategorySerializers(serializers.ModelSerializer):
    food_image_url = serializers.SerializerMethodField()
    class Meta:
        model = CategoryModel
        fields = ['id', 'name', 'food_image', 'food_image_url']
        
    def get_food_image_url(self, obj):
        return obj.food_image.url if obj.food_image else None


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