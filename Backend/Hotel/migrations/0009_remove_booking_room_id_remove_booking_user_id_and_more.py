# Generated by Django 5.0.2 on 2024-03-13 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0008_remove_booking_total_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='room_id',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='bookinghistory',
            name='booking_id',
        ),
        migrations.DeleteModel(
            name='City',
        ),
        migrations.RemoveField(
            model_name='roomtype',
            name='hotel_id',
        ),
        migrations.RemoveField(
            model_name='room',
            name='room_type_id',
        ),
        migrations.DeleteModel(
            name='Booking',
        ),
        migrations.DeleteModel(
            name='BookingHistory',
        ),
        migrations.DeleteModel(
            name='Hotel',
        ),
        migrations.DeleteModel(
            name='Room',
        ),
        migrations.DeleteModel(
            name='RoomType',
        ),
    ]
