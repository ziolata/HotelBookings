# Generated by Django 5.0.2 on 2024-03-28 08:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0017_booking_total_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='total_price',
        ),
    ]
