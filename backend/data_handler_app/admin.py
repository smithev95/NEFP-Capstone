from django.contrib import admin
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Questions, ClientData 

admin.site.register(Questions)
admin.site.register(ClientData)

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
            return JsonResponse({"status": "error", "message": f"Error parsing form data: {str(e)}"}, status=400)
        
        try:
            # Save new question
            question = Questions(**data)
            question.save()
        except:
            return JsonResponse({'error': 'not valid JSON data'})
    
    return JsonResponse({'message': 'successfully added a new question'})  

def update_question_handler(request):
    questions = list(Questions.objects.values())
    return render(request, 'update_question_form.html', {"data": questions})

def update_question(request):
    if request.method == 'GET':
            try:
                question_obj = Questions.objects.get(pk=request.GET["question"])
                return render(request, 'question_editor.html', {"question": question_obj})
            except Exception as e:
                return JsonResponse({"status": "error", "message": f"Error parsing form data: {str(e)}"}, status=400)
    return HttpResponse("Incorrect request method: failed to update question")

def submit_update(request, question_id):
    if request.method == 'POST':
        try:
            question = request.POST.get('question')
            answer_choices = request.POST.get('answers').split(',')
            has_other = False if request.POST.get('has_other') == "false" else True
            Questions.objects.filter(id=question_id).update(question=question, answer_choices=answer_choices, has_other=has_other)
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Error parsing form data: {str(e)}"}, status=400)
    
    return JsonResponse({'message': 'successfully updated question'})  