# Generated by Django 3.2 on 2021-10-13 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0011_alter_queries_choice'),
    ]

    operations = [
        migrations.AddField(
            model_name='queries',
            name='Query',
            field=models.CharField(default='', max_length=1000),
        ),
        migrations.AlterField(
            model_name='queries',
            name='choice',
            field=models.CharField(choices=[('q1', 'Query 1'), ('q2', 'Query 2'), ('q3', 'Query 3'), ('q4', 'Query 4'), ('q5', 'Query 5'), ('other', 'Other')], max_length=50),
        ),
    ]
