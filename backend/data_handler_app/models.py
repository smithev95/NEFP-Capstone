from django.db import models
from django.contrib.postgres.fields import ArrayField 

class Languages(models.Model):
    id = models.BigIntegerField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    name = models.CharField()
    abreviation = models.CharField()
    prompt = models.CharField()

    def __str__(self):
        return self.name
    
class Clients(models.Model):
    id = models.BigIntegerField(primary_key=True)
    language_id = models.ForeignKey(Languages, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id  
    
class Answers(models.Model):
    id = models.BigIntegerField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    name = models.CharField()

    def __str__(self):
        return self.name

class Questions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    answer_id = models.ForeignKey(Answers, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    name = models.CharField()
    display_on_questionnaire = models.BooleanField(default=True)
    display_order = models.IntegerField()

    def __str__(self):
        return self.name

class ClientData(models.Model):
    client_id = models.ForeignKey(Clients, on_delete=models.CASCADE)
    question_id = models.ForeignKey(Questions, on_delete=models.CASCADE)
    data = models.CharField()

    def __str__(self):
        return self.data
    
class QuestionTranslations(models.Model):
    id = models.BigIntegerField(primary_key=True)
    question_id = models.ForeignKey(Questions, on_delete=models.CASCADE)
    language_id = models.ForeignKey(Languages, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    translation = models.CharField()

    def __str__(self):
        return self.translation 

class AnswerTranslations(models.Model):
    id = models.BigIntegerField(primary_key=True)
    question_id = models.ForeignKey(Questions, on_delete=models.CASCADE)
    language_id = models.ForeignKey(Languages, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    associated_boolean = models.BooleanField(null=True)
    associated_integer = models.IntegerField(null=True)
    associated_text = models.CharField(null=True)
    translation = models.CharField()

    def __str__(self):
        return self.translation  
     

    
    