from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Answer, Questions
import json
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
            question = Questions.objects.get(question=key)
            new_answer = Answer(answer=value, question_fk=question, client_id=new_id)
            new_answer.save()
        return JsonResponse({'message': 'successfully submitted response'})  
    except Exception as e:
        return JsonResponse({"status": "error", "message": f"Error saving data: {str(e)}"}, status=400)
      
def client_data_list(request):
    # This converts a 'QuerySet' to a list of dictionaries.
    #questions_fk_values = list(Questions.objects.order_by("id").values_list("id", "question"))
    questions_fk_values = list(Questions.objects.order_by("id").filter(deleted__exact=False).values_list("id", "question")) 
    data = list(Answer.objects.filter(question_fk__isnull=False).order_by("client_id", "question_fk").values())    
    client_ids =  Answer.objects.order_by("client_id").values("client_id").distinct()

    # Map question foreign key to its value
    for row in data:
        for key, val in questions_fk_values:
            if (key == row["question_fk_id"]):
                row["question_value"] = val

    # Group data by client id
    client_data = []
    for id in client_ids:
        client_dict = {}
        client_id = id["client_id"]
        client_dict["client_id"] = client_id
        for row in data:
            if (row["client_id"] == client_id):
                try: 
                    client_dict[row["question_value"]] = row["answer"]
                    client_dict["created_timestamp"] = row["created_timestamp"]
                except Exception as e:
                    print (f"Error: {str(e)} key not in client_dict")
        client_data.append(client_dict)

    # Fill in None value for new columns
    for row in client_data:
        keys = row.keys()
        for key, val in questions_fk_values:
            if (val not in keys):
                row[val] = None

    return JsonResponse(client_data, safe=False)

def get_questions(request):
    questions = list(Questions.objects.values())
    return JsonResponse(questions, safe=False)