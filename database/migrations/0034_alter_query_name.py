# Generated by Django 3.2 on 2022-01-22 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0033_alter_booking_query'),
    ]

    operations = [
        migrations.AlterField(
            model_name='query',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]