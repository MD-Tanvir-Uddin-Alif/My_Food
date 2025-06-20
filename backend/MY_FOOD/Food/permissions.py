from rest_framework.permissions import BasePermission, SAFE_METHODS



class OnlyAdminJob(BasePermission):
    def has_permission(self, request, view):
        if request.method is SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role =='ADMIN'