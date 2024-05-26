from django.http import JsonResponse
from .models import ClientData

# Create your views here.

def client_data_list(request):
    #This converts a 'QuerySet' to a list of dictionaries. 
    data = list(ClientData.objects.values())

    return JsonResponse(data, safe=False)