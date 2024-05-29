from django.urls import path
from .views import client_data_list

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
]