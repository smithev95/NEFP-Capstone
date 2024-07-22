from django.urls import path
from .views import client_data_list, client_data_form, get_questions, get_question, get_languages, get_translations
from .admin import add_question, update_question, delete_question

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('languages/', get_languages, name='languages'),
    path('questions/', get_questions, name='questions'),
    path('question/<int:question_id>', get_question, name='get_question'),
    path('languages/', get_languages, name='get_languages'),
    path('translations/', get_translations, name='get_translations'),
    path('addquestion/submit/', add_question, name='add_question'),
    path('updatequestion/submit/<int:question_id>', update_question, name='update_question'),
    path('deletequestion/submit/<int:question_id>', delete_question, name='delete_question'),
]