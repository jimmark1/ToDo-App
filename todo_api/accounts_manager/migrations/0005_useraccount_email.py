# Generated by Django 4.1.6 on 2023-03-27 22:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_manager', '0004_remove_useraccount_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='email',
            field=models.EmailField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]