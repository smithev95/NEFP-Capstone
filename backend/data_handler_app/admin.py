import json
from django.contrib import admin
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os
from .models import ClientData


admin.site.register(ClientData)

def admin_panel(request):
    return render(request, 'admin_panel.html')

def add_question(request):
    if request.method == 'POST':
        try:
            api_token = request.POST.get('api_token')
            question = request.POST.get('question')
            answers = request.POST.get('answers').split(',')
            has_other = request.POST.get('has_other') == 'true'

            data = {
                'api_token': api_token,
                'question': question,
                'answers': answers,
                'hasOther': has_other,
            }
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Error parsing form data: {str(e)}"}, status=400)

        questions_file_path = os.path.join(settings.BASE_DIR, 'frontend', 'public', 'Questions.json')
        #questions_file_path = os.path.join(settings.BASE_DIR, 'backend', 'data_handler_app', 'Data', 'Questions.json')

        print("Questions file path: {questions_file_path}")  # Print the file path

        try:
            with open(questions_file_path, 'r+', encoding='utf8') as file:
                questions = json.load(file)
                questions.append(data)
                file.seek(0)
                json.dump(questions, file, indent=4)
                file.truncate()
            return JsonResponse({"status": "success"}, status=200)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)

def add_question_handler(request):
    return render(request, 'add_question_form.html')


def delete_question_handler(request):
    return render(request, 'delete.html')

def delete_question(request):
    return HttpResponse("Attempting to delete question")

def update_question_handler(request):
    question_file_path = os.path.join(settings.BASE_DIR, 'frontend', 'public', 'Questions.json')
    with open(question_file_path, 'r') as file:
        json_data = json.load(file)

    return render(request, 'update_question_form.html', {'data': json_data})


def update_question(request):
    if request.method == 'POST':
        print("POST data:")
        for key, value in request.POST.items():
            print(f"{key}: {value}")
        
        selected_item = request.POST.get('selected_data')
        print("selected item:",selected_item)
        if selected_item:
            selected_data = json.loads(selected_item)
            print("selected data: ",selected_data)
            return render(request, 'question_editor.html', {'selected_data': selected_data})
        else:
            return HttpResponse("No data received: failed to update question")
    return HttpResponse("Incorrect request method: failed to update question")

def submit_update(request):
    return HttpResponse("Attempting to update question")