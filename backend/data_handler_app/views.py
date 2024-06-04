from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ClientDataForm
from .models import ClientData, Questions
import json
# Create your views here.

@csrf_exempt
def client_data_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
    else:
        return JsonResponse({'error': 'not POST request'}, status=400)
    
    try:
        new_id = 0
        # Check if there's any entries in the table
        if (ClientData.objects.count() > 0):
            # Get latest client_id from ClientData
            current_id = ClientData.objects.latest("client_id").client_id
            new_id = current_id + 1
        
        for key, value in data.items():
            question = Questions.objects.get(question=key)
            new_answer = ClientData(answer=value, question_fk=question, client_id=new_id)
            new_answer.save()
    except Exception as e:
        return JsonResponse({"status": "error", "message": f"Error saving data: {str(e)}"}, status=400)
    
    return JsonResponse({'message': 'successfully submitted response'})  
      
def client_data_list(request):
    # This converts a 'QuerySet' to a list of dictionaries.
    questions_fk_values = list(Questions.objects.values_list("id", "question")) 
    data = list(ClientData.objects.values())
    client_ids =  ClientData.objects.order_by("client_id").values("client_id").distinct()
    
    # Map question foreign key to its value
    for row in data:
        for key, val in questions_fk_values:
            if (key == row["question_fk_id"]):
                row["question_value"] = val

    return JsonResponse(data, safe=False)

def get_questions(request):
    questions = list(Questions.objects.values())
    return JsonResponse(questions, safe=False)