# Generated by Django 3.2 on 2021-10-23 16:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='location',
        ),
    ]
