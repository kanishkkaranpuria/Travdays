# Generated by Django 3.2 on 2021-10-21 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0044_alter_query_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='query',
            name='choice',
            field=models.CharField(choices=[('q1', 'Booking'), ('q2', 'Trip'), ('q3', 'Query 3'), ('q4', 'Query 4'), ('q5', 'Query 5'), ('q6', 'Other')], max_length=50),
        ),
    ]
