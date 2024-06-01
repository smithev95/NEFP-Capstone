from django.urls import path
from .views import client_data_list, client_data_form, get_questions

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('questions/', get_questions, name='questions')
]