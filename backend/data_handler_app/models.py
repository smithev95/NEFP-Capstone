from django.db import models

# Create your models here.
'''
class ClientData:
    #id
    #date?
    #start time
    #completion time
    #language
    #mouths 
    #zip code
    #snap benefits

'''    

class ClientData(models.Model):
    # id field is automatically generated by django, we
    # can create seperate id's for daily visitors, monthly
    # visitors, etc.
    date = models.DateTimeField(auto_now_add=True)
    start_time = models.TimeField(auto_now_add=True)
    completion_time = models.TimeField(auto_now_add=True)

    LANGUAGE_CHOICES = [
*       ('ES', 'Spanish'),
        ('ZH', 'Traditional Chinese/Simplified Chinese'),
        ('VI', 'Vietnamese'),
        ('EN', 'English'),
        ('UK', 'Ukrainian'),
        ('RU', 'Russian'),
        ('AR', 'Arabic'),
        ('HT', 'Haitian Creole'),
        ('FA', 'Persian'),
        ('LO', 'Lao')
    ]
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)

    FAMILY_SIZE = [(str(i), str(i)) for i in range(1, 10)] + [('Other', 'Other')]
    family_size = models.CharField(max_length=5, choices=MOUTHS_CHOICES)

    SNAP_BENEFITS_CHOICES = [
        ('YES', 'Yes'),
        ('NO', 'No'),
    ]
    snap_benefits = models.CharField(max_length=3, choices=SNAP_BENEFITS_CHOICES)

    ZIP_CODE_CHOICES = [
        ('97206', '97206')
        ('97213', '97213')
        ('97216', '97216')
        ('97218', '97218')
        ('97220', '97220')
        ('97230', '97230')
        ('97233', '97233')
        ('97236', '97236')
        ('97266', '97266')
        ('Other', 'Other')
    ]
    zip_code = models.CharField(max_length=5, choices=ZIP_CODE_CHOICES)

    #snap_benefits = models.BooleanField # require's renaming BooleanField's parameters

    SNAP_BENEFITS_CHOICES = [
        ('YES', 'Yes'),
        ('NO', 'No'),
    ]
    snap_benefits = models.CharField(max_length=3, choices=SNAP_BENEFITS_CHOICES)

    