# Generated by Django 3.2 on 2021-10-17 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0013_alter_review_ratings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='ratings',
            field=models.IntegerField(choices=[(1, 0.5), (2, 1), (3, 1.5), (4, 2), (5, 2.5), (6, 3), (7, 3.5), (8, 4), (9, 4.5), (10, 5)]),
        ),
    ]
