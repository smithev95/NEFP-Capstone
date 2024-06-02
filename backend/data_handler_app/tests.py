from django.test import TestCase
from .models import TestAddTable
import os
import json
from django.conf import settings

# Create your tests here.

class ParseTest(TestCase):
    def test_parse_json(self):
        file = os.path.join(settings.BASE_DIR, 'frontend', 'public', 'Questions.json')
        col_names = []  #names of table's data fields
        with open (file, 'r') as question_file:
            questions = json.load(question_file)    #loading json from file
            for field in questions:     #iterate through dict, get key/value pairs from each json obj
                for key, value in field.items():
                    if key == 'api_token':
                        col_names.append(value)     #save values in list of question names
        print(col_names)
