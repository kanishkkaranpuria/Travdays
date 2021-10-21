# Generated by Django 3.2 on 2021-10-21 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0033_alter_query_choice'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExplorePageTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userKey', models.CharField(max_length=100)),
                ('previousId', models.CharField(default='', max_length=10000)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
