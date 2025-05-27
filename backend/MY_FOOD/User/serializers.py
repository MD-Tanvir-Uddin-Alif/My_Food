from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class CustomUserSerializers(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = CustomUser
        fields = ['id','first_name', 'last_name', 'username', 'email', 'phone_number', 'profile_image','gender', 'role','address', 'password', 'password2']
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'password':{'write_only':True},
        }
        
    def validate(self, attrs):
        password = attrs.get('password')
        if password != attrs['password2']:
            raise serializers.ValidationError({'password':'password didnot match'})
        validate_password(password)
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomUserProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name', 'last_name', 'username', 'email', 'phone_number', 'profile_image','gender', 'address']
        read_only_field = ['id', 'username', 'email']