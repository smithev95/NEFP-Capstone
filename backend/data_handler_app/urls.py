from django.urls import path
from .views import client_data_list
from .views import client_data_form

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission')
]