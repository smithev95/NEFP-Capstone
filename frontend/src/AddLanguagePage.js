import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMenu from './components/Navbar.js';
import Container from 'react-bootstrap/Container';
import LanguageSelect from './components/LanguageDropdown.js';

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

    // Fetch language data
    useEffect(() => {
        console.log("AddLanguagePage.js useEffect called.");
        axios.get('http://127.0.0.1:8000/languages/')
        .then(response => {
            setallLanguages(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <>
        <NavbarMenu />
        <Container>
            <p>Add a language page</p>
            <LanguageSelect />
        </Container>
        </>
    );
}

export default AddLanguagePage;