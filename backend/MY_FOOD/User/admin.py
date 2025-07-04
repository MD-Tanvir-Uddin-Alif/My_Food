from django.contrib import admin
from .models import CustomUser, OrderItemModel, OrderModel
# Register your models here.

@admin.register(CustomUser)
class CustomUserModelAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ('id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'gender', 'role', 'account_created_at', 'address')
    search_fields = ('email', 'username',)
    
    def save_model(self, request, obj, form, change):
        raw_password = form.cleaned_data.get("password")
        if raw_password and not raw_password.startswith('pbkdf2_'):  # Already hashed passwords start with this
            obj.set_password(raw_password)
        super().save_model(request, obj, form, change)

class OrderItemInline(admin.TabularInline):
    model = OrderItemModel
    extra = 0


@admin.register(OrderModel)
class OrderModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'payment_method', 'total', 'status', 'created_at']
    list_filter = ['payment_method', 'status', 'created_at']
    search_fields = ['user__email', 'transaction_id']
    inlines = [OrderItemInline]


@admin.register(OrderItemModel)
class OrderItemModelAdmin(admin.ModelAdmin):
    list_display = ['order', 'food', 'quantity', 'price']