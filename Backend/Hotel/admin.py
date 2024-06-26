from django.contrib import admin
from . import models
# Register your models here.
@admin.register(models.Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('id','name','address','description','image','rating')
@admin.register(models.RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','image','price', 'number_of_rooms','hotel_id')
@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('image','room_number','room_type_id')
@admin.register(models.Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ('name','icon')
   