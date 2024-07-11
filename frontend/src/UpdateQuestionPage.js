import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const UpdateQuestionPage = () => {
    const location = useLocation();
    const questionID = location.state.id;
    const [allLanguages, setallLanguages] = useState([]);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");
    const [hasOther, setHasOther] = useState(false);
    const [translatedQuestions, setTranslatedQuestions] = useState({});
    const [translatedAnswers, setTranslatedAnswers] = useState({});
    const [translatedOthers, setTranslatedOther] = useState({});

    // Fetch language data
    useEffect(() => {
        console.log("App.js useEffect called.");
        axios.get('http://127.0.0.1:8000/languages/')
        .then(response => {
            setallLanguages(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        axios.get(`http://127.0.0.1:8000/question/${questionID}`)
        .then(response => {
            const data = response.data;
            // Set data states
            setQuestion(data.question);
            setAnswers(data.answer_choices);
            setHasOther(data.has_other);
            setTranslatedQuestions(data.translated_questions);
            setTranslatedAnswers(data.translated_answers);
            setTranslatedOther(data.translated_others);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [questionID]);

    // A function to fetch the translations after user enters a question
    const getQuestionTranslations = () => {
        if (question !== "") {
            axios.get(`http://127.0.0.1:8000/translations/?question=${question}`)
            .then(response => {
                setTranslatedQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
      };

    // A function to fetch the translations after user enters answer choices
    const getAnswersTranslations = () => {
        if (answers !== "") {
            axios.get(`http://127.0.0.1:8000/translations/?answers=${answers}`)
            .then(response => {
                setTranslatedAnswers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    };

    // A function to fetch the translations for the word "Other"
    const getOtherTranslations = () => {
        axios.get(`http://127.0.0.1:8000/translations/?question=other`)
        .then(response => {
            setTranslatedOther(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    // A function to handle whether to translate "Other" or not
    const handleHasOtherClick = (e) => {
        const val = e.target.value;
        
        if (val === "true") {
            getOtherTranslations();
            setHasOther(true);
        }
        else {
            setTranslatedOther({});
            setHasOther(false);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = {};

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        const jsonData = JSON.stringify(formDataObj);

        axios.post("http://127.0.0.1:8000/updatequestion/submit/", jsonData,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                console.log("status", response.status);
            } 
            else {
                console.log("unsuccessful");
            }
        })
        .catch((error) => {
            console.error("Error sending data", error);
        });
    }

    function displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers, translatedOthers) {
        if (allLanguages.length !== 0) {
            return allLanguages.map(obj => {
                return <div className="row py-3" key={`${obj.abbreviation}`}>
                            <label htmlFor={`${obj.abbreviation}-question`}>{`${obj.name} Question:`}</label>
                            <input type="text" id={`${obj.abbreviation}-question`} name={`${obj.abbreviation}-question`}
                            defaultValue={translatedQuestions[obj.abbreviation] ? `${translatedQuestions[obj.abbreviation]}` : ""}/>
                            <label htmlFor={`${obj.abbreviation}-other`}>{`${obj.name} "Other":`}</label>
                            <input type="text" id={`${obj.abbreviation}-other`} name={`${obj.abbreviation}-other`}
                            defaultValue={translatedOthers[obj.abbreviation] ? `${translatedOthers[obj.abbreviation]}` : ""}/>
                            <label htmlFor={`${obj.abbreviation}-answers`}>{`${obj.name} Answers:`}</label>
                            <input type="text" id={`${obj.abbreviation}-answers`} name={`${obj.abbreviation}-answers`}
                            defaultValue={translatedAnswers[obj.abbreviation] ? `${translatedAnswers[obj.abbreviation]}` : ""}/>
                       </div>
            })
        }
    }

    return (
        <div className="container">
            <form method="post" onSubmit={handleSubmit}>
                <div className="row gap-5">
                    <div className="col">
                        <div className="row py-3">
                            <label htmlFor="question">Question:</label>
                            <input type="text" id="question" name="question" 
                            onBlur={(e) => setQuestion(e.target.value)} defaultValue={question}/>
                            <div className="col py-3">
                                <button type="button" onClick={getQuestionTranslations}>Get Translation</button>
                            </div>
                        </div>
                        <div className="row py-3">
                            <label htmlFor="answers">Answers (comma-separated):</label>
                            <input type="text" id="answers" name="answers" 
                            onBlur={(e) => setAnswers(e.target.value)} defaultValue={answers}/>
                            <div className="col py-3">
                                <button type="button" onClick={getAnswersTranslations}>Get Translation</button>
                            </div>
                        </div>
                        <div className="row py-3">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="hasOther">Has Other:</label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="radio" id="has_other_true" name="has_other" value="true" 
                                        onChange={handleHasOtherClick}
                                        checked={hasOther}/>
                                        <label htmlFor="has_other_true">True</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="radio" id="has_other_false" name="has_other" value="false" 
                                        onChange={handleHasOtherClick} 
                                        checked={!hasOther}/>
                                        <label htmlFor="has_other_false">False</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row py-3">
                            <div className="col">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers, translatedOthers)}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateQuestionPage;
