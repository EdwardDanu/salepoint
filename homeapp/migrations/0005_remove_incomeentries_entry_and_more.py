# Generated by Django 4.0.6 on 2023-05-20 06:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homeapp', '0004_incomeentries_expenseentries'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incomeentries',
            name='entry',
        ),
        migrations.AlterField(
            model_name='incomeentries',
            name='incomename',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='incomeentred', to='homeapp.incomeacc'),
        ),
    ]