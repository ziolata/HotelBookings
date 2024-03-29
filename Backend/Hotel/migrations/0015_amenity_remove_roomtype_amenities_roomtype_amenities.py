# Generated by Django 5.0.2 on 2024-03-13 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0014_remove_hotel_number_of_reviews'),
    ]

    operations = [
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('icon', models.ImageField(blank=True, upload_to='amenities/icons')),
            ],
        ),
        migrations.RemoveField(
            model_name='roomtype',
            name='amenities',
        ),
        migrations.AddField(
            model_name='roomtype',
            name='amenities',
            field=models.ManyToManyField(to='Hotel.amenity'),
        ),
    ]
