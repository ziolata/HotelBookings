from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainView
app_name = 'Auth'

urlpatterns = [
    # path('<int:pk>/',PostDetail.as_view,name=detailcreate),
    # path('',PostList.as_view(),name='listcreate')
    path('token/', MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.UserSignup.as_view(),name='signup'),
    path('role/',views.RoleView.as_view(),name='Role'),
    path('role/<int:pk>/',views.RoleCRUDView.as_view(),name='RoleDetail'),

    # path('login/', views.UserLogin.as_view(),name='login'),
    # path('logout/', views.UserLogout.as_view(), name='logout'),
    path('userprofile/', views.UserProfileView.as_view(),name='userprofile'),
    path('user/', views.User.as_view(),name='User'),
    path('user/<int:pk>/', views.UserDetail.as_view(),name='UserDetail'),
    path('hotel/', include('Hotel.urls'))
]

