# Generated by Django 3.2 on 2021-11-02 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0018_alter_booking_phonenumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='query',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
