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
        data = json.loads(request.body)

        questions_file_path = os.path.join(settings.BASE_DIR, 'frontend','public','Questions.json')

        try:
            with open(questions_file_path, 'r+', encoding='utf8') as file:
                questions = json.load(file)
                questions.append(data)
                file.seek(0)
                json.dump(questions, file, indent=4)
                file.truncate()
            return JsonResponse({"status": "success"}, status = 200)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)


def delete_question(request):
    return HttpResponse("Attempting to delete question")

def update_question(request):
    return HttpResponse("Attempting to update question")