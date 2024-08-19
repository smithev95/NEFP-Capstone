import React, { useState, useEffect } from 'react';
import NavbarMenu from './components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TranslateButton from './components/TranslateButton.js';
import TranslatedTextCards from './components/TranslatedTextCards.js';

const AddQuestionPage = () => {
    const [allLanguages, setallLanguages] = useState([]);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");
    const [translatedQuestions, setTranslatedQuestions] = useState({});
    const [translatedAnswers, setTranslatedAnswers] = useState({});
    const [translatedOthers, setTranslatedOther] = useState({});
    const [areQuestionsLoading, setQuestionsLoading] = useState(false);
    const [areAnswersLoading, setAnswersLoading] = useState(false);

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
    const getQuestionTranslations = () => {
        if (question !== "") {
            setQuestionsLoading(true);
            axios.get(`http://127.0.0.1:8000/translations/?question=${question}`)
            .then(response => {
                setTranslatedQuestions(response.data);
                setQuestionsLoading(false);
            })
            .catch(error => {
                setQuestionsLoading(false);
                console.error('Error fetching data:', error);
            });
        }
      };

    // A function to fetch the translations after user enters answer choices
    const getAnswersTranslations = () => {
        if (answers !== "") {
            setAnswersLoading(true);
            axios.get(`http://127.0.0.1:8000/translations/?answers=${answers}`)
            .then(response => {
                setTranslatedAnswers(response.data);
                setAnswersLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setAnswersLoading(false);
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
        }
        else {
            setTranslatedOther({});
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

        axios.post("http://127.0.0.1:8000/addquestion/submit/", jsonData,
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
            alert(error.response.data.message);
        });
    }

    return (
        <>
        <NavbarMenu />
        <Container>
            <Form method="post" onSubmit={handleSubmit}> 
                <Row className="py-3">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="question" column sm="2" lg="1">Question:</Form.Label>
                        <Col sm="10" lg="6">
                            <Form.Control className="mb-3"
                                type="text"
                                id="question"
                                name="question"
                                placeholder="Please enter question here"
                                onBlur={(e) => setQuestion(e.target.value)}   
                            />
                        </Col>
                        <Row>
                            <Col sm="6">
                                <TranslateButton loading={areQuestionsLoading} func={getQuestionTranslations} />
                            </Col>
                        </Row>                                
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="answers" column sm="2" lg="1">Answers:</Form.Label>
                        <Col sm="10" lg="6">
                            <Form.Control className="mb-3"
                                type="text"
                                id="answers"
                                name="answers"
                                placeholder="comma separated: yes, no, maybe"
                                onBlur={(e) => setAnswers(e.target.value)}   
                            />
                        </Col>
                        <Row>
                            <Col sm="6">
                                <TranslateButton loading={areAnswersLoading} func={getAnswersTranslations} />
                            </Col>
                        </Row>                                
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="hasOther" column sm="4">Has Other:</Form.Label>
                        <Form.Check
                            type="radio"
                            htmlFor="has_other_true"
                            id="has_other_true"
                            name="has_other"
                            value="true"
                            label="True"
                            onClick={handleHasOtherClick}  
                        />
                        <Form.Check
                            defaultChecked
                            type="radio"
                            htmlFor="has_other_false"
                            id="has_other_false"
                            name="has_other"
                            value="false"
                            label="False"
                            onClick={handleHasOtherClick}  
                        />                              
                    </Form.Group>
                    <Row>
                        <Col sm="6">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Row>
                <Row className="g-4" xs={1} lg={2} xxl={3}>
                    <TranslatedTextCards 
                        langs={allLanguages} 
                        questions={translatedQuestions}
                        answers={translatedAnswers}
                        others={translatedOthers}
                    />
                </Row>
            </Form>
        </Container>
        </>
    );
}

export default AddQuestionPage;
