# Generated by Django 3.2 on 2022-02-04 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0034_alter_query_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='query',
            name='choice',
            field=models.CharField(choices=[('1', 'Booking'), ('2', 'Trip'), ('3', 'Queryyyyyyyyyyyyyyyyyyyyyyyyy 3'), ('4', 'Query 4'), ('5', 'Query 5'), ('6', 'Other')], max_length=8),
        ),
    ]
