from django.urls import path
from .views import client_data_list
from django.views.generic import TemplateView

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('', TemplateView.as_view(template_name='index.html'))
]