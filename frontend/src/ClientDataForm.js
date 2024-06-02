import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const ClientDataForm = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch the JSON data
        axios.get('http://127.0.0.1:8000/questions/')
            .then(response => {
                console.log(response.data);
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });

        console.log('form loaded');
    }, []);

    const log_information = (e) => {
        e.preventDefault();

        const form_data = new FormData(e.target);
        const form_data_object = {};
        
        form_data.forEach((value, key) => {
            form_data_object[key] = value;
        });

        const json_data = JSON.stringify(form_data_object);
        console.log(json_data);

        axios.post('http://127.0.0.1:8000/newsubmission/', json_data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Response', response.data);
        })
        .catch(error => {
            console.error('Error sending data', error);
        });
    };

    const renderQuestion = (question, index) => (
        <div className="row mb-2 border-bottom" key={index}>
            <div className="col mb-2">
                <label className="fs-5 fw-normal">{question.question}:</label>
                <div className="form-check">
                    {question.answer_choices.map((answer, idx) => (
                        <Fragment key={idx}>
                            <input className="form-check-input" type="radio" id={`${question.question}-${answer}`} name={question.question} value={answer} required />
                            <label className="form-check-label">{answer}</label>
                            <br />
                        </Fragment>
                    ))}
                    {question.has_other && (
                        <div className="form-outline w-25 mb-2">
                            <input className="form-control" type="text" id={`${question.question}-other`} name={`${question.question}-other`} placeholder="Other"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="row mb-2 border-bottom">
                <h1>Client Form</h1>
            </div>
            <form method="post" onSubmit={log_information}>
                {questions.map((question, index) => renderQuestion(question, index))}
                <div className="row my-2">
                    <div className="col mb-2" align="center">
                        <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ClientDataForm;
