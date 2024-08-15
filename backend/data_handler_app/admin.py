from django.contrib import admin
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Question, Answer, Language, TranslatedQuestion
import json
from django.views.decorators.csrf import csrf_exempt

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Language)
admin.site.register(TranslatedQuestion)

@csrf_exempt
def add_question(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Add a Question object to Question table
            question = data['question'].strip()

            # Check for duplicated question
            if (Question.objects.filter(question=question, deleted=False).exists()):
                return JsonResponse({"status": "error", 
                                     "message": f"Question already exists in the database."}, 
                                    status=405)

            answer_choices = data['answers'].split(',')
            has_other = False if data['has_other'] == 'false' else True

            fields = {
                'deleted': False,
                'question': question,
                'answer_choices': answer_choices,
                'has_other': has_other,
            }
            question = Question(**fields)
            question.save()

            # Add translations to Question to TranslatedQuestion table
            lang_abbrev = list(Language.objects.values("abbreviation", "id"))
            
            for lang in lang_abbrev:
                abbreviation = lang["abbreviation"]
                lang_fk = Language.objects.get(pk=int(lang["id"]))
                translated_q = data[f"{abbreviation}-question"]
                translated_ans = data[f"{abbreviation}-answers"].split(',')
                translated_other = data[f"{abbreviation}-other"]

                translated_fields = {
                    'question_fk': question,
                    'language_fk': lang_fk,
                    'question': translated_q,
                    'answer_choices': translated_ans,
                    'other': translated_other
                }

                translation = TranslatedQuestion(**translated_fields)
                translation.save()
        except Exception as e:
            return JsonResponse({"status": "error", "message":f"Error parsing form data: {str(e)}"}, 
                                status=400)
        except:
            return JsonResponse({'error': 'not valid JSON data'})
        return JsonResponse({'message': 'successfully added a new question'})
    return JsonResponse({'error': 'not POST request'}, status=400)  

@csrf_exempt
def delete_question(request, question_id):
    if request.method == 'POST':
        try:
            # Mark delete field of Question as True
            Question.objects.filter(id=question_id).update(deleted=True)
            
            # Mark delete field of Answers with fk to the Question as True
            Answer.objects.filter(question_fk=question_id).update(deleted=True)
                    
        except Exception as e:
            return JsonResponse({"status": "error", "message":f"Error deleting data: {str(e)}"}, 
                                status=400)
        return JsonResponse({'message': 'successfully deleted question'})  
    return HttpResponse("Incorrect request method: failed to delete question")

@csrf_exempt
def update_question(request, question_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Update question object in Question
            question = data['question']
            answer_choices = data['answers'].split(',')
            has_other = False if data['has_other'] == 'false' else True

            fields = {
                'question': question,
                'answer_choices': answer_choices,
                'has_other': has_other,
            }
        
            Question.objects.filter(id=question_id).update(**fields)

            # TOCHECK: Not sure if we need to update the Answers since they should already be deleted=False
            # Answer.objects.filter(question_fk=question_id).update(deleted=False)
            
            # Update translated texts
            lang_abbrev = list(Language.objects.values("abbreviation", "id"))
            
            for lang in lang_abbrev:
                abbreviation = lang["abbreviation"]
                translated_q = data[f"{abbreviation}-question"]
                translated_ans = data[f"{abbreviation}-answers"].split(',')
                translated_other = data[f"{abbreviation}-other"]

                translated_fields = {
                    'question': translated_q,
                    'answer_choices': translated_ans,
                    'other': translated_other
                }
                
                # Filter the translated question based on question_fk and language_fk
                TranslatedQuestion.objects.filter(question_fk=question_id, 
                language_fk=lang["id"]).update(**translated_fields)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Error updating data: {str(e)}"}, 
                                status=400)
        return JsonResponse({'message': 'successfully updated the question and its translations'})
    return HttpResponse("Incorrect request method: failed to update question")
