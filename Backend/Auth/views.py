from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSignupSerializers, UserLoginSerializers, UserProfileSerializers,RoleSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import generics
from Auth.permissions import *
# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        
        return token

class MyTokenObtainView(TokenObtainPairView):
     serializer_class = MyTokenObtainPairSerializer

class UserSignup(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserSignupSerializers(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
# class UserLogin(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def post(self, request):
# 		data = request.data
# 		assert validate_email(data)
# 		assert validate_password(data)
# 		serializer = UserLoginSerializers(data=data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.check_user(data)
# 			login(request, user)
# 			return Response(serializer.data, status=status.HTTP_200_OK)
        
# class UserLogout(APIView):
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)
# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication,)
    # def get(self, request):
    #     serializer = UserSerializers(request.user)
    #     return Response({'user': serializer.data}, status=status.HTTP_200_OK)
class UserProfileView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializers(request.user)
        return Response( serializer.data, status=status.HTTP_200_OK)
class User(generics.ListAPIView):
    queryset = UserCustom.objects.all()
    serializer_class = UserProfileSerializers
    permission_classes = [permissions.IsAuthenticated,]
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserCustom.objects.all()
    serializer_class = UserProfileSerializers
    permission_classes = [IsSuperAdmin]
class RoleView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]
class RoleCRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]
        