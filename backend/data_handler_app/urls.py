from django.urls import path
from .views import client_data_list, client_data_form, get_questions
from .admin import admin_panel, add_question_handler, add_question, update_question_handler, update_question, submit_update

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('questions/', get_questions, name='questions'),
    path('adminpanel/', admin_panel, name='admin_panel'),
    path('addquestion/form/', add_question_handler, name = 'add_question_handler'),
    path('addquestion/submit/', add_question, name='add_question'),
    path('updatequestion/form/', update_question_handler, name='update_question_handler'),
    path('updatequestion/form/update/', update_question, name='update_question'),
    path('updatequestion/submit/update/<int:question_id>/', submit_update, name='submit_update'),
]