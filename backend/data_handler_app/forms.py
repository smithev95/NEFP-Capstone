from django import forms
from .models import ClientData1

class ClientDataForm(forms.ModelForm):
    class Meta:
        model = ClientData1
        fields = '__all__'