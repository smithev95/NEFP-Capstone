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
    
    for key, value in data.items():
        try: 
            question = Questions.objects.get(question=key)
            new_answer = ClientData(answer=value, question_fk=question)
            new_answer.save()
        except:
            return JsonResponse({'error': 'not valid JSON data'})
    
    return JsonResponse({'message': 'successfully submitted'})  
      
def client_data_list(request):
    # This converts a 'QuerySet' to a list of dictionaries.
    questions_fk_values = list(Questions.objects.values_list("id", "question")) 
    data = list(ClientData.objects.values())
    
    # Map question foreign key to its value
    for row in data:
        for key, val in questions_fk_values:
            if (key == row["question_fk_id"]):
                row["question_value"] = val

    return JsonResponse(data, safe=False)

def get_questions(request):
    questions = list(Questions.objects.values())
    return JsonResponse(questions, safe=False)