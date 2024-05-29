from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse

from .forms import ClientDataForm
from .models import ClientData
# Create your views here.

def client_data_form(request):
    if request.method == 'POST':
        form = ClientDataForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success_add_client')
    else:
        form = ClientDataForm()
    return render(request, 'your_app/client_data_form.html', {'form': form})

def client_data_list(request):
    #This converts a 'QuerySet' to a list of dictionaries. 
    data = list(ClientData.objects.values())

    return JsonResponse(data, safe=False)
