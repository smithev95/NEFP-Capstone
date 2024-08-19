import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMenu from './components/Navbar.js';
import { Container, Button } from 'react-bootstrap';
import LanguageSelect from './components/LanguageDropdown';
import QuestionDataEditor from './components/QuestionDataEditor.js';

// select language
// make sure language was not already added
// load all questions
// load answers for each question
// translate all questions and answers
// add language and question translations to the database
// inform user whether data was added sucessfully
    // if failed, display failure + reason, allow user to edit form
    // if success, display success and refresh page

const AddLanguagePage = () => {
    const [allLanguages, setallLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [translationStatus, setTranslationStatus] = useState(null);  // null, 'success'
    const [errorMessage, setErrorMessage] = useState('');
    const [languageAlreadyAdded, setLanguageAlreadyAdded] = useState(true);
    const labels = [
        'test question 1',
        'test question 2',
        'test question 3',
        'test question 4'
    ];

    // Fetch language data
    useEffect(() => {
        console.log("AddLanguagePage.js fetching languages.");
        axios.get('http://127.0.0.1:8000/languages/')
        .then(response => {
            setallLanguages(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // fetch all questions
    useEffect(() => {
        console.log("AddLanguagePage.js fetching questions.");
        axios.get('http://127.0.0.1:8000/questions/')
        .then(response => {
            setQuestions(response.data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleLanguageSelect = (abbreviation) => {
        const languageInList = allLanguages.some(lang => lang.abbreviation === abbreviation);
        if (!languageInList) {
            setLanguageAlreadyAdded(false);
            setErrorMessage('The selected language has already been added.');
            return;
        }
        setLanguageAlreadyAdded(true);
        setSelectedLanguage(abbreviation);
    };

    const handleSubmit = () => {
        if(!selectedLanguage) {
            setErrorMessage("Please select a language.");
            return;
        }
        // TODO: need to finish submit handler
    }

    return (
        <>
        <NavbarMenu />
        <Container>
            <hr className="my-4" />
            <LanguageSelect onSelect={handleLanguageSelect} />
            <hr className="my-4" />
            <QuestionDataEditor data={questions}/> 
            <hr className="my-4" />
            <Button 
                className="btn btn-primary mt-3" 
                onClick={handleSubmit}
                disabled={languageAlreadyAdded || !selectedLanguage}
            >
                Submit
            </Button> 
        </Container>
        </>
    );
}

export default AddLanguagePage;