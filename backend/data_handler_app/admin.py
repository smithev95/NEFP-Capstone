from django.contrib import admin
from django.shortcuts import render
from django.http import JsonResponse
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
            has_other = request.POST.get('has_other') == 'true'

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
