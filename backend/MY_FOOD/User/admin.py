from django.contrib import admin
from .models import CustomUser
# Register your models here.

@admin.register(CustomUser)
class CustomUserModelAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'gender', 'role', 'account_created_at', 'address')
    search_fields = ('email', 'username',)


