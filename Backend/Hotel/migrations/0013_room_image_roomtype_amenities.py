# Generated by Django 5.0.2 on 2024-03-13 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0012_delete_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='image',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='roomtype',
            name='amenities',
            field=models.CharField(default=2, max_length=255),
            preserve_default=False,
        ),
    ]