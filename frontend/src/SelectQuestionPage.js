import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LanguageContext } from "./Contexts/Contexts";

const SelectQuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [questionID, setQuestionID] = useState();
    let navigate = useNavigate();
    const { language} = useContext(LanguageContext);
    // Fetch questions from database
    useEffect(() => {
        console.log("App.js useEffect called.");
        axios.get('http://127.0.0.1:8000/questions/')
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // Set the questionID state when a question is selected from the list
    const onOptionChange = (e) => {
        setQuestionID(e.target.id)
      }
    
    // Navigate to EditQuestionPage and passing the questionID to the component
    const handleSelect = () => {
        navigate("/editQuestion", {state:{id:questionID}});
    }

    function displayQuestions(questions) {
        if (questions.length !== 0) {
            return questions.map(obj => {
                return  <div className="row py-1" key={`${obj.id}`}>
                            <div className="col">
                                <input type="radio" name="question" id={`${obj.id}`} 
                                    value={`${obj.id}`} onChange={onOptionChange}/>
                                <label htmlFor={`${obj.id}`}> {`${obj.question}`}</label>
                            </div>
                        </div>
            })
        }
    }

    return (
        <div className="container">
            <div className="row py-3">Select a question to delete or update:</div>
            {displayQuestions(questions)}
            <div className="row py-3">
                <div className="col">
                   <button onClick={handleSelect}>Select</button>
                </div>
            </div>
        </div>
    );
}

export default SelectQuestionPage;
