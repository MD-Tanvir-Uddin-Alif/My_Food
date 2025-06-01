from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
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
        read_only_fields = ['id', 'username', 'email']


class CustomTokenObtailPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.clear()
        self.fields['email'] = serializers.EmailField()
        self.fields['password'] = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = CustomUser.objects.filter(email=email).first()
        
        if user is None or not user.check_password(password):
            raise AuthenticationFailed("No active account found with the given credentials")
        
        if not user.is_active:
            raise AuthenticationFailed("User account is disabled")
        
        refresh = RefreshToken.for_user(user)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token),
            # 'email': user.email,
            # 'username': user.username,
            'role': user.role
        }
        
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['email'] = user.email
        token['role'] = user.role
        
        return token