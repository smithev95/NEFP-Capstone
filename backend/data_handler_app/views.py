from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .forms import ClientDataForm
from .models import ClientData
# Create your views here.

@csrf_exempt
def client_data_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
    else:
        return JsonResponse({'error': 'not POST request'}, status=400)
    
    return JsonResponse({'status': 'API recieved information'})

def client_data_list(request):
    #This converts a 'QuerySet' to a list of dictionaries. 
    data = list(ClientData.objects.values())

    return JsonResponse(data, safe=False)
