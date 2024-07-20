from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Answer, Question, Language, TranslatedQuestion
import json
import translators as ts

# Create your views here.

@csrf_exempt
def client_data_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
    else:
        return JsonResponse({'error': 'not POST request'}, status=400)
    
    try:
        new_id = 1
        # Check if there's any entries in the table
        if (Answer.objects.count() > 0):
            # Get latest client_id from Answer
            current_id = Answer.objects.latest("client_id").client_id
            new_id = current_id + 1
        
        for key, value in data.items():
            question = Question.objects.filter(deleted__exact=False).get(question=key)
            new_answer = Answer(answer=value, question_fk=question, client_id=new_id)
            new_answer.save()
        return HttpResponse({'successfull'}, status=200)  
    except Exception as e:
        return HttpResponse({"status": "error", "message": f"Error saving data: {str(e)}"}, status=400)
      
def client_data_list(request):
    # This converts a 'QuerySet' to a list of dictionaries.
    questions_fk_values = list(Question.objects.order_by("id").filter(deleted__exact=False).values_list("id", "question"))
    client_ids =  Answer.objects.order_by("client_id").values("client_id").distinct()

    client_data = []
    for id in client_ids:
        client_dict = {}
        client_dict["client_id"] = id["client_id"]
        client_answers = Answer.objects.filter(client_id=id["client_id"], deleted=False).values()

        # Add created_timestamp col using the first answer's created_timestamp 
        # of the client if the queryset is not empty
        client_dict["created_timestamp"] = None
        if (client_answers):
            client_dict["created_timestamp"] = client_answers[0]["created_timestamp"]

        for q_id, question in questions_fk_values:
            for answer in client_answers:
                if (answer["question_fk_id"] == q_id):
                    client_dict[question] = answer["answer"]
            
            # If the question wasn't found in the client_answers, we add a None value to it
            # This fixes the misaligned display of questions in ClientDataTable
            if (question not in client_dict.keys()):
                client_dict[question] = None
        
        client_data.append(client_dict)

    return JsonResponse(client_data, safe=False)

def get_questions(request):
    questions = list(Question.objects.order_by("id").filter(deleted__exact=False).values())
    questions = list(TranslatedQuestion.objects.values())
    return JsonResponse(questions, safe=False)

def get_languages(request):
    languages = list(Language.objects.values())
    return JsonResponse(languages, safe=False)