from django.db import models
from django.contrib.postgres.fields import ArrayField

class Questions(models.Model):
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
    question_fk = models.ForeignKey("Questions", on_delete=models.SET_NULL, null=True)
    answer = models.CharField(max_length=255)
    client_id = models.IntegerField()
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.answer

class Languages(models.Model):
    id = models.BigIntegerField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    name = models.CharField()
    abreviation = models.CharField()
    prompt = models.CharField()

    def __str__(self):
        return self.name
    
class TranslatedQuestions(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now_add=True)
    # does this need 'deleted' if the question row in 'Questions' has it?
    question_fk = models.ForeignKey("Questions", on_delete=models.SET_NULL, null=True)
    language_id = models.ForeignKey("Languages", on_delete=models.SET_NULL, null=True)
    question = models.TextField()
    answer_choices = ArrayField(models.CharField(blank=False))

    def __str__(self):
        return self.question
