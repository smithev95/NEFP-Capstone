from django.contrib import admin
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Question, Answer, Language, TranslatedQuestion

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Language)
admin.site.register(TranslatedQuestion)

def admin_panel(request):
    return render(request, 'admin_panel.html')

def add_question_handler(request):
    return render(request, 'add_question_form.html')

def add_question(request):
    if request.method == 'POST':
        try:
            question = request.POST.get('question')
            answer_choices = request.POST.get('answers').split(',')
            has_other = False if request.POST.get('has_other') == 'false' else True

            data = {
                'deleted': False,
                'question': question,
                'answer_choices': answer_choices,
                'has_other': has_other,
            }
            print(data)
        except Exception as e:
            return JsonResponse({"status": "error", "message":f"Error parsing form data: {str(e)}"}, 
                                status=400)
        
        try:
            # Save new question
            question = Question(**data)
            question.save()
        except:
            return JsonResponse({'error': 'not valid JSON data'})
    
    return JsonResponse({'message': 'successfully added a new question'})  

def update_question_handler(request):
    questions = list(Question.objects.values())
    return render(request, 'update_question_form.html', {"data": questions})

def update_question(request):
    if request.method == 'GET':
        try:
            question_obj = Question.objects.get(pk=request.GET["question"])
            return render(request, 'question_editor.html', {"question": question_obj})
        except Exception as e:
            return JsonResponse({"status": "error", "message":f"Error parsing form data: {str(e)}"}, 
                                status=400)
    return HttpResponse("Incorrect request method: failed to update question")

def submit_update(request, question_id):
    if request.method == 'POST':
        button_pressed = request.POST["button"]
        if (button_pressed == "delete"):
            try:
                #Question.objects.filter(id=question_id).delete()
                q = Question.objects.get(id=question_id)
                q.deleted = True
                q.save()
                
                del_answers = list(Answer.objects.filter(question_fk=q.id))
                for a in del_answers:
                    a.deleted = True
                    a.save()
                
            except Exception as e:
                return JsonResponse({"status": "error", "message":f"Error deleting data: {str(e)}"}, 
                                    status=400)
            return JsonResponse({'message': 'successfully deleted question'})  
        
        try:
            question = request.POST.get('question')
            answer_choices = request.POST.get('answers').split(',')
            has_other = False if request.POST.get('has_other') == "false" else True
            Question.objects.filter(id=question_id).update(question=question, 
                                answer_choices=answer_choices, has_other=has_other, deleted=False)
            Answer.objects.filter(question_fk=question_id).update(deleted=False)
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Error updating data: {str(e)}"}, 
                                status=400)
        return JsonResponse({'message': 'successfully updated question'})
    return HttpResponse("Incorrect request method: failed to update question")
