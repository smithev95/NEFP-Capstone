import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuestionPage = () => {
    const [allLanguages, setallLanguages] = useState([]);
    // const [question, setQuestion] = useState("");
    // const [answers, setAnswers] = useState("");
    const [translatedQuestions, setTranslatedQuestions] = useState({});
    const [translatedAnswers, setTranslatedAnswers] = useState({});

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
    }, []);

    // A function to fetch the translations after user enters a question
    const getQuestionTranslations = (e) => {
        const question = e.target.value;
        axios.get(`http://127.0.0.1:8000/translations/question/${question}/`)
        .then(response => {
            setTranslatedQuestions(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      };

    // A function to fetch the translations after user enters answer choices
    const getAnswersTranslations = (e) => {
        const answers = e.target.value;
        // const data = {question: question, answers: answers}
        axios.get(`http://127.0.0.1:8000/translations/answers/${answers}/`)
        .then(response => {
            setTranslatedAnswers(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    function displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers) {
        if (allLanguages.length !== 0) {
            return allLanguages.map(obj => {
                return <div className="row" key={`lang-${obj.abbreviation}`}>
                            <label htmlFor={`lang-${obj.abbreviation}-question`}>{`${obj.name} Question:`}</label>
                            <input type="text" id={`lang-${obj.abbreviation}-question`} name={`lang-${obj.abbreviation}-question`}
                            defaultValue={translatedQuestions[obj.abbreviation] ? `${translatedQuestions[obj.abbreviation]}` : ""}/>
                            <label htmlFor={`lang-${obj.abbreviation}-answers`}>{`${obj.name} Answers:`}</label>
                            <input type="text" id={`lang-${obj.abbreviation}-answers`} name={`lang-${obj.abbreviation}-answers`}
                            defaultValue={translatedAnswers[obj.abbreviation] ? `${translatedAnswers[obj.abbreviation]}` : ""}/>
                       </div>
            })
        }
    }

    return (
        <div className="container">
            <form action="/addquestion/submit/" method="post">
                <div className="row gap-5">
                    <div className="col">
                        <div className="row">
                            <label htmlFor="question">Question:</label>
                            <input type="text" id="question" name="question" onBlur={getQuestionTranslations}/>
                        </div>
                        <div className="row">
                            <label htmlFor="answers">Answers (comma-separated):</label>
                            <input type="text" id="answers" name="answers" onBlur={getAnswersTranslations}/>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="hasOther">Has Other:</label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="radio" id="has_other_true" name="has_other" value="true" />
                                        <label htmlFor="has_other_true">True</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="radio" id="has_other_false" name="has_other" value="false" />
                                        <label htmlFor="has_other_false">False</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button type="submit">Submit</button>
                            </div>
                            {/* <div className="col">
                                <button type="button" onClick={getTranslations}>Get Translation</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="col">
                        {displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers)}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddQuestionPage;
