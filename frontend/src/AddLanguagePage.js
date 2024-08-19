import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMenu from './components/Navbar.js';
import Container from 'react-bootstrap/Container';
import LanguageSelect from './components/LanguageDropdown';
import LabelTextBoxForm from './components/LabelTextBoxForm';

// select language
// make sure language was not already added
// load all questions
// translate all questions
// add language and question translations to the database
// inform user whether data was added sucessfully
    // if failed, display failure + reason, allow user to edit form
    // if success, display success and refresh page

const AddLanguagePage = () => {
    const [allLanguages, setallLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [questions, setQuestions] = useState([]);
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
        if(selectedLanguage) {
            console.log("AddLanguagePage.js fetching questions.");
            axios.get('http://127.0.0.1:8000/questions')
            .then(response => {
                setQuestions(response.data)
            })
            .catch(error => {
                console.error('Error fetching questions', error);
            });
        }
    }, [selectedLanguage]);

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

    // TODO: translate question


    return (
        <>
        <NavbarMenu />
        <Container>
            <hr className="my-4" />
            <LanguageSelect onSelect={handleLanguageSelect} />
            <hr className="my-4" />
            <LabelTextBoxForm labels={labels} />  
        </Container>
        </>
    );
}

export default AddLanguagePage;