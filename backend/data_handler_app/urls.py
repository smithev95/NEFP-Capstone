from django.urls import path
from .views import client_data_list, client_data_form, get_questions
from .admin import admin_panel, add_question_handler, add_question

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('questions/', get_questions, name='questions'),
    path('adminpanel', admin_panel, name='admin_panel'),
    path('addquestion/form/', add_question_handler, name = 'add_question_handler'),
    path('addquestion/submit/', add_question, name='add_question'),
]