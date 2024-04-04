from rest_framework import generics
from Hotel.models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.db.models import Q
from Auth.permissions import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from datetime import datetime
class HotelList(generics.ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.AllowAny]
class HoTelDetail(generics.RetrieveAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.AllowAny]
class HotelCreate(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [AdminGroup]
class HoTelDetailUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [AdminGroup]
class AmenityList(generics.ListCreateAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializers
    permission_classes = [permissions.AllowAny]
#----------------------------------RoomType----------------------------
class RoomTypeList(generics.ListAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [permissions.AllowAny]
class RoomTypeDetail(generics.RetrieveAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [permissions.AllowAny]
class RoomTypeCreate(generics.CreateAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [AdminGroup]
class RoomTypeDetailUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [AdminGroup]

# ----------------------------------Room------------------------------
class RoomList(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]
class RoomListCreate(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AdminGroup]
    
class RoomDetail(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]
class RoomFilterRoomType(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        room_type_id = self.kwargs['room_type_id']  # Lấy room_type_id từ URL
        return Room.objects.filter(room_type_id=room_type_id)
class RoomDetailUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AdminGroup]

# ----------------------------------Booking------------------------------



class BookingViewSet(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        check_in_date = datetime.strptime(request.data['check_in_date'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(request.data['check_out_date'], '%Y-%m-%d').date()
        current_date = timezone.now().date()
        if check_in_date < current_date:
            return Response({"error": "Check-in date must be greater than or equal to the current date."}, status=status.HTTP_400_BAD_REQUEST)
        confirmed_bookings = Booking.objects.filter(status='Confirmed', check_in_date__lte=check_out_date, check_out_date__gte=check_in_date)
        if confirmed_bookings.exists():
            return Response({"error": "Reservations cannot be made because there is a confirmed booking during this time period."}, status=status.HTTP_400_BAD_REQUEST)
        if check_in_date == current_date:
            available_rooms = Room.objects.filter(bookings__check_in_date=current_date, status='available')
            available_rooms.update(status='booked')
        serializer.save(user_id=user)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class BookingDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AdminGroup]

class BookingDateView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingDateSerializer
    permission_classes = [permissions.AllowAny]

class BookingHistoryViewSet(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingHistorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(user_id=user_id)
    