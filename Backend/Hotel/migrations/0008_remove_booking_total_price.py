# Generated by Django 5.0.2 on 2024-03-11 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0007_booking_address_booking_fullname_booking_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='total_price',
        ),
    ]
