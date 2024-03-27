from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id.name == 'SuperAdmin'
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id.name == 'Admin'
class IsMod(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id.name == 'Mod'
class AdminGroup(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role_id.name == 'Admin' or request.user.role_id.name == 'SuperAdmin' 
