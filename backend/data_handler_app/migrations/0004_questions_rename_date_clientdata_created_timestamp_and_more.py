# Generated by Django 4.2.13 on 2024-05-31 23:37

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data_handler_app', '0003_alter_clientdata_zip_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_timestamp', models.DateTimeField(auto_now_add=True)),
                ('modified_timestamp', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.BooleanField(default=False)),
                ('question', models.TextField()),
                ('answer_choices', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(), size=None)),
                ('has_other', models.BooleanField()),
            ],
        ),
        migrations.RenameField(
            model_name='clientdata',
            old_name='date',
            new_name='created_timestamp',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='completion_time',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='family_size',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='language',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='snap_benefits',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='start_time',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='travel_by_car',
        ),
        migrations.RemoveField(
            model_name='clientdata',
            name='zip_code',
        ),
        migrations.AddField(
            model_name='clientdata',
            name='answer',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='clientdata',
            name='question_fk',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='data_handler_app.questions'),
        ),
    ]