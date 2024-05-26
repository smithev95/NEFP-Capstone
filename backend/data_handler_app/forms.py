from django import forms
from .models import ClientData

class ClientDataForm(forms.ModelForm):
    class Meta:
        model = ClientData
        fields = '__all__'