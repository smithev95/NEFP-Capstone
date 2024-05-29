from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ClientDataForm
from .models import ClientData
import json
# Create your views here.

@csrf_exempt
def client_data_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
    else:
        return JsonResponse({'error': 'not POST request'}, status=400)
        
    model = ClientData()
    try: 
        model.language = data.get('language')
        model.family_size = data.get('family_size')
        model.snap_benefits = data.get('snap_benefits')
        model.travel_by_car = data.get('travel_by_car')
        model.zip_code = data.get('zip_code')
        model.save()
        return JsonResponse({'message': 'successfully submitted'})
    except:
        print('not valid JSON data')
        
        return JsonResponse({'error': 'not valid JSON data'})  
      

def client_data_list(request):
    #This converts a 'QuerySet' to a list of dictionaries. 
    data = list(ClientData.objects.values())

    return JsonResponse(data, safe=False)
