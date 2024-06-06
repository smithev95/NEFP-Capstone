from django import forms
from .models import Answer

class ClientDataForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = '__all__'