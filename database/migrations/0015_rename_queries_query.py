# Generated by Django 3.2 on 2021-10-13 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0014_alter_queries_choice'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Queries',
            new_name='Query',
        ),
    ]
