# Generated by Django 3.2 on 2021-10-28 15:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0010_whitelistedtokens_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='whitelistedtokens',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.user'),
        ),
    ]
