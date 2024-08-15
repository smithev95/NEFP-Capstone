from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Answer, Question, Language, TranslatedQuestion, ClientLanguage
import json
import translators as ts

# Create your views here.

@csrf_exempt
def client_data_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
    else:
        return JsonResponse({'error': 'not POST request'}, status=400)
    
    try:
        new_id = 1
        #Check if there's any entries in the table
        if (ClientLanguage.objects.count() > 0):
            # Get latest client_id from Answer
            current_id = ClientLanguage.objects.latest("id").id
            new_id = current_id + 1
            print('new id: ', new_id)

        for key, value in data.items():
            if (key == 'language'):
                lang = Language.objects.get(id=value)
                new_record = ClientLanguage(language_id=lang)
                #new_record.save()
                continue

            # Get the OG question from the translated question
            translated_question = TranslatedQuestion.objects.get(question=key)

            question = Question.objects.get(question=translated_question.question_fk)
            
            # Get index of answer from translated answer choices
            answer_index = translated_question.answer_choices.index(value)
            
            #Get english answer using same index
            new_answer = Answer(answer=question.answer_choices[answer_index], question_fk=question, 
                                client_fk=new_id)
            
            new_answer.save()
        return HttpResponse({'successfull'}, status=200)  

    except Exception as e:
        return HttpResponse({"status": "error", "message": f"Error saving data: {str(e)}"}, 
                            status=400)

def client_data_list(request):
    # This converts a 'QuerySet' to a list of dictionaries.
    questions_fk_values = list(Question.objects.order_by("id").filter(deleted__exact=False).
                               values_list("id", "question"))
    client_ids =  Answer.objects.order_by("client_id").values("client_id").distinct()

    client_data = []
    for id in client_ids:
        client_dict = {}
        client_dict["client_id"] = id["client_id"]
        client_answers = Answer.objects.filter(client_id=id["client_id"], deleted=False).values()

        # Add created_timestamp col using the first answer's created_timestamp 
        # of the client if the queryset is not empty
        client_dict["created_timestamp"] = None
        if (client_answers):
            client_dict["created_timestamp"] = client_answers[0]["created_timestamp"]

        for q_id, question in questions_fk_values:
            for answer in client_answers:
                if (answer["question_fk_id"] == q_id):
                    client_dict[question] = answer["answer"]
            
            # If the question wasn't found in the client_answers, we add a None value to it
            # This fixes the misaligned display of questions in ClientDataTable
            if (question not in client_dict.keys()):
                client_dict[question] = None
        
        client_data.append(client_dict)

    return JsonResponse(client_data, safe=False)

def get_questions(request):
    questions = list(Question.objects.order_by("id").filter(deleted__exact=False).values())
    return JsonResponse(questions, safe=False)

def get_translated_questions(request):
    questions = list(TranslatedQuestion.objects.order_by("id").
                     filter(question_fk__deleted__exact=False).values())
    return JsonResponse(questions, safe=False)

def get_question(request, question_id):
    try:
        data = {}

        # Get the question object with the id
        question_obj = Question.objects.get(pk=question_id)

        data["question"] = question_obj.question
        data["answer_choices"] = question_obj.answer_choices
        data["has_other"] = question_obj.has_other

        # Get the translated texts of the question
        translations = TranslatedQuestion.objects.filter(question_fk=question_obj)
        
        translated_questions = {}
        translated_answers = {}
        translated_others = {}

        for obj in translations:
            # Get language abbreviation
            abbreviation = Language.objects.get(name=obj.language_fk).abbreviation

            translated_questions[abbreviation] = obj.question
            translated_answers[abbreviation] = obj.answer_choices

            if (data["has_other"]):
                # translated_others[abbreviation] = fields_dict["other"]
                translated_others[abbreviation] = obj.other
        
        data["translated_questions"] = translated_questions
        data["translated_answers"] = translated_answers
        data["translated_others"] = translated_others

        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({"status": "error", 
                "message":f"Error fetching question and its translations: {str(e)}"}, status=400)
    
def get_languages(request):
    languages = list(Language.objects.values())
    return JsonResponse(languages, safe=False)

"""
This endpoint gets translations for questions and answer choices in
AddQuestionPage.js
"""
def get_translations(request):
    # Fetch the query parameters
    question = request.GET.get('question')
    answers = request.GET.get('answers')

    lang_abbrev = list(Language.objects.values("abbreviation"))
    translation_dict = {}

    if (question):
        for lang in lang_abbrev:
            translation = ts.translate_text(question, translator="google", 
                                            to_language=lang['abbreviation'].lower())
            translation_dict[lang['abbreviation']] = translation
    
    elif (answers):
        answers = answers.strip().split(",")

        for lang in lang_abbrev:
            translation_arr = []
            for answer in answers:
                translation = ts.translate_text(answer, translator="google", 
                                                to_language=lang['abbreviation'].lower())
                translation_arr.append(translation)
            translation_str = ','.join(translation_arr)
            translation_dict[lang['abbreviation']] = translation_str

    return JsonResponse(translation_dict, safe=False)