# Generated by Django 3.2 on 2021-10-21 16:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0041_alter_query_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='query',
            options={'ordering': ('created',), 'verbose_name_plural': 'Queries'},
        ),
    ]
