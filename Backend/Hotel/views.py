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
class RoomDetailUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AdminGroup]

# ----------------------------------Search------------------------------
class SearchAvailableRoomsView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        # lấy data
        room_type_name = request.query_params.get('room_type_name')
        check_in_date = request.query_params.get('check_in_date')
        check_out_date = request.query_params.get('check_out_date')
        number_of_guest = request.query_params.get('number_of_guest')
        # province = request.query_params.get('province')

        # Filter theo trạng thái phòng 
        available_rooms = Room.objects.filter(
            Q(status='available') &
            (
                Q(booking__isnull=True) |  # No bookings
                Q(  # Bookings outside check-in/check-out window
                    Q(booking__check_out_date__lt=check_in_date) |
                    Q(booking__check_in_date__gt=check_out_date)
                ) if check_in_date and check_out_date else Q()  # No filtering if no dates
            )
        )
        if room_type_name is not None:
            available_rooms = available_rooms.filter(room_type_name__icontains=room_type_name)
        if number_of_guest is not None:
            available_rooms = available_rooms.filter(room_type_id__number_of_guest__gte=number_of_guest)

        # Filter tỉnh thành phố
        # if province is not None:
        #     available_rooms = available_rooms.filter(room_type_id__hotel_id__province=province)

        # Filter check_in và check_out
        if check_in_date and check_out_date:
            booked_rooms = Room.objects.filter(
                Q(status='booked') &
                Q(booking__isnull=False) &
                ~Q(
                    booking__check_out_date__lt=check_in_date,
                    booking__check_in_date__gt=check_out_date
                )
            )
            available_rooms = available_rooms.difference(booked_rooms)

        #data
        serializer = AvailableRoomSerializer(available_rooms, many=True)
        return Response(serializer.data)
class AvailableRoomsDetailsListView(generics.RetrieveAPIView):
    queryset = Room.objects.all() 
    serializer_class = AvailableRoomSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            return self.queryset.filter(pk=pk)
        return super().get_queryset()

class BookingViewSet(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        serializer.save(user_id=user)  
        check_in_date = datetime.strptime(request.data['check_in_date'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(request.data['check_out_date'], '%Y-%m-%d').date()
        current_date = timezone.now().date()
        if check_in_date < current_date:
            return Response({"error": "Ngày check-in phải lớn hơn hoặc bằng ngày hiện tại."}, status=status.HTTP_400_BAD_REQUEST)
        confirmed_bookings = Booking.objects.filter(status='Confirmed', check_in_date__lte=check_out_date, check_out_date__gte=check_in_date)
        if confirmed_bookings.exists():
            return Response({"error": "Không thể đặt phòng vì có đơn booking đã xác nhận trong khoảng thời gian này."}, status=status.HTTP_400_BAD_REQUEST)
        if check_in_date == current_date:
            available_rooms = Room.objects.filter(bookings__check_in_date=current_date, status='available')
            available_rooms.update(status='booked')
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def perform_create(self, serializer,request):
    #     room_price = serializer.validated_data['room_id'].room_type_id.price
    #     number_of_nights = (serializer.validated_data['check_out_date'] - serializer.validated_data['check_in_date']).days
    #     total_price = room_price * number_of_nights
    #     serializer.validated_data['total_price'] = total_price
    #     serializer.save() 
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = self.get_queryset()
        check_in_date = request.query_params.get('check_in_date', None)
        check_out_date = request.query_params.get('check_out_date', None)
        hotel_id = request.query_params.get('hotel_id', None)
        if check_in_date and check_out_date:
            check_in_date = datetime.strptime(check_in_date, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out_date, '%Y-%m-%d').date()
            queryset = queryset.filter(check_in_date__gte=check_in_date, check_out_date__lte=check_out_date)
        if hotel_id:
            queryset = queryset.filter(room_id__hotel_id=hotel_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
class BookingDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AdminGroup]
class AvailableRoomsDetailsListView(generics.ListAPIView):
    queryset = Room.objects.all() 
    serializer_class = AvailableRoomSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk is not None:
            return self.queryset.filter(pk=pk)
        return super().get_queryset()
    def getRoom(request):
        serializer = AvailableRoomSerializer
        return Response(serializer.data)
class BookingHistoryViewSet(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingHistorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(user_id=user_id)
    