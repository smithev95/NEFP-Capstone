from django.db import models
from django.contrib.postgres.fields import ArrayField

class Question(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)
    question = models.TextField()
    answer_choices = ArrayField(models.CharField(blank=False))
    has_other = models.BooleanField()

    def __str__(self):
        return self.question

class Answer(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    question_fk = models.ForeignKey("Question", on_delete=models.SET_NULL, null=True)
    answer = models.CharField(max_length=255)
    client_fk = models.ForeignKey("ClientLanguage", on_delete=models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)


    def __str__(self):
        return self.answer

class Language(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now_add=True)
    name = models.CharField()
    abbreviation = models.CharField()
    prompt = models.CharField()

    def __str__(self):
        return self.name
    
class TranslatedQuestion(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now_add=True)
    question_fk = models.ForeignKey("Question", on_delete=models.SET_NULL, null=True)
    language_fk = models.ForeignKey("Language", on_delete=models.SET_NULL, null=True)
    question = models.TextField()
    answer_choices = ArrayField(models.CharField(blank=False))
    other = models.CharField()

    def __str__(self):
        return self.question
    
class ClientLanguage(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    #This should really be called `language_fk` for clarity
    language_id = models.ForeignKey("Language", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.language_id.name
    