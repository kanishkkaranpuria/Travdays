# Generated by Django 3.2 on 2021-11-30 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0030_alter_blog_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
