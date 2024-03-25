from django.db import models
from django.contrib.auth.models import AbstractUser
from Auth.models import UserCustom
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
from django.utils import timezone

class Hotel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, null = True)
    address = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="Hotel")
    rating = models.FloatField()
    
    def __str__(self):
        return f"{self.name}"
class Amenity(models.Model):
    name = models.CharField(max_length=255, unique=True)
    icon = models.ImageField(upload_to="amenities/icons", blank=True)
    def __str__(self):
        return f"{self.name}"
class RoomType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    amenities = models.ManyToManyField(Amenity)
    image = models.ImageField(upload_to="RoomType")
    price = models.IntegerField()
    number_of_rooms = models.IntegerField()
    number_of_guest = models.IntegerField()
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.name}"

class Room(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to="Room")
    room_number = models.CharField(max_length=255)
    status = models.CharField(max_length=255, choices=[('available', 'Available'), ('booked', 'Booked')])
    room_type_id = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    check_in_date = models.DateField(null=True, blank=True)
    check_out_date = models.DateField(null=True, blank=True)
    def __str__(self):
        return f"{self.room_number}"
class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    fullname = models.CharField()
    phone = models.IntegerField()
    address = models.CharField(max_length=255)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    number_of_guests = models.IntegerField()
    total_price = models.IntegerField()
    status = models.CharField(max_length=255, choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled')])
    user_id = models.ForeignKey(UserCustom, on_delete=models.CASCADE)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    date_booking = models.DateTimeField(default=timezone.now)
    @property
    def total_price(self):
        room_price = self.room_id.room_type_id.price
        number_of_nights = (self.check_out_date - self.check_in_date).days
        total_price = room_price * number_of_nights
        return total_price

    @total_price.setter
    def total_price(self, value):
        # Optional validation or logic before assigning the value
        self._total_price = value  # Use a private variable to store

    def save(self, *args, **kwargs):
        # No changes needed here
        super().save(*args, **kwargs)
