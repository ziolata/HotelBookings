from rest_framework import serializers
from Hotel.models import *
from Auth.models import UserCustom
from .validator import CurrentUserDefault 

# from django_filters.rest_framework import FilterSet, filters

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
class AmenitySerializers(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('id','name','icon')
        read_only_fields = ("icon_url",)
        def get_icon_url(self, obj):
            if obj.icon:
                return obj.icon.url
            return None
class RoomTypeSerializer(serializers.ModelSerializer):
    hotel_name = serializers.ReadOnlyField(source='hotel_id.name')
    hotel_adress = serializers.ReadOnlyField(source='hotel_id.address')
    amenities_info = AmenitySerializers(source='amenities', many=True, read_only=True)
    amenities= serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Amenity.objects.all(), 
    )
    province = serializers.ReadOnlyField(source='hotel_id.province')
    
    class Meta:
        model = RoomType
        fields = ('id','name','description','amenities','amenities_info','image','price', 'number_of_rooms','number_of_guest','hotel_id','hotel_name','province','hotel_adress')
class RoomSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='room_type_id.name')
    price = serializers.ReadOnlyField(source='room_type_id.price')
    address = serializers.ReadOnlyField(source='room_type_id.hotel_id.address')
    province = serializers.ReadOnlyField(source='room_type_id.hotel_id.province')
    amenity_data = AmenitySerializers(source='room_type_id.amenities', many=True, read_only=True)
    class Meta:
        model = Room
        fields = ('id','image','room_number','status','room_type_id','check_in_date','check_out_date','name','price','amenity_data','address','province')
class BookingSerializer(serializers.ModelSerializer):
    status = serializers.CharField(required=False)
    price = serializers.ReadOnlyField(source='room_id.room_type_id.price')
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.ReadOnlyField(source="user_id.username")
    room_name = serializers.ReadOnlyField(source="room_id.room_type_id.name")
    room_id = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    def update(self, instance, validated_data):
        status = validated_data.get('status', instance.status)
        if status == 'Confirmed':
            # Gắn check_in_date và check_out_date của Booking vào phòng tương ứng
            room = instance.room_id
            room.check_in_date = instance.check_in_date
            room.check_out_date = instance.check_out_date
            room.status = instance.status = 'Booked'
            room.save()
        return super().update(instance, validated_data)
    
    class Meta:
        model = Booking
        fields = ('id','fullname','phone','address','check_in_date','check_out_date','total_price','number_of_guests','price','room_id','user_id','email','room_name','status')
class BookingDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('check_in_date','check_out_date','room_id')
class BookingHistorySerializer(serializers.ModelSerializer):
    price = serializers.ReadOnlyField(source='room_id.room_type_id.price')
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    room_id = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    class Meta:
        model = Booking
        fields = ('id','fullname','phone','address','check_in_date','check_out_date','total_price','number_of_guests','price','room_id','user_id','status','date_booking')

class AvailableRoomSerializer(serializers.ModelSerializer):
    room_type_name = serializers.CharField(source='room_type_id.name')
    number_of_guest = serializers.CharField(source='room_type_id.number_of_guest')
    check_in_date = serializers.DateField()
    check_out_date = serializers.DateField()
    province = serializers.CharField(source='room_type_id.hotel_id.province')
    image = serializers.CharField(source='room_type_id.image')
    price = serializers.IntegerField(source='room_type_id.price')
    class Meta:
        model = Room
        fields = ('id', 'room_number', 'room_type_id', 'room_type_name','number_of_guest','check_in_date','check_out_date','province','image','price')
