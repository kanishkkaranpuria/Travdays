# Generated by Django 3.2 on 2021-10-23 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0002_remove_trip_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='location',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
