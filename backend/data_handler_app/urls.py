from django.urls import path
from .views import client_data_list, client_data_form
from .admin import add_question, delete_question, update_question, admin_panel

urlpatterns = [
    path('clientdata/', client_data_list, name='client_data_list'),
    path('newsubmission/', client_data_form, name='new_submission'),
    path('adminpanel', admin_panel, name='admin_panel'),
    path('addquestion', add_question, name='add_question'),
]