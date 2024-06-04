from django.urls import path
from .views import client_data_list, client_data_form
from .admin import add_question, delete_question, update_question, admin_panel, add_question_handler,update_question_handler, delete_question_handler, submit_update 
#from . import admin

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('adminpanel', admin_panel, name='admin_panel'),
    path('addquestion/form/', add_question_handler, name = 'add_question_handler'),
    path('addquestion/submit/', add_question, name='add_question'),
    path('updatequestion/form/', update_question_handler, name='update_question_handler'),
    path('updatequestion/form/update/', update_question, name='update_question'),
    path('updatequestion/submit/update/', submit_update, name='submit_update'),

    path('deletequestion/form', delete_question_handler, name='delete_question_handler'),
    path('deletequestion/submit', delete_question, name='delete_question'),
]