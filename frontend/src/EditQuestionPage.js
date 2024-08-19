import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarMenu from './components/Navbar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TranslateButton from './components/TranslateButton.js';
import TranslatedTextCards from './components/TranslatedTextCards.js';

const EditQuestionPage = () => {
    const location = useLocation();
    const questionID = location.state.id;
    const [allLanguages, setallLanguages] = useState([]);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");
    const [hasOther, setHasOther] = useState(false);
    const [translatedQuestions, setTranslatedQuestions] = useState({});
    const [translatedAnswers, setTranslatedAnswers] = useState({});
    const [translatedOthers, setTranslatedOther] = useState({});
    const [areQuestionsLoading, setQuestionsLoading] = useState(false);
    const [areAnswersLoading, setAnswersLoading] = useState(false);
    let navigate = useNavigate();

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
                setAnswersLoading(false);
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

        const button = e.nativeEvent.submitter.value;
        const formData = new FormData(e.target);
        const formDataObj = {};

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        const jsonData = JSON.stringify(formDataObj);
        
        // Update question
        if (button === "update") {
            axios.post(`http://127.0.0.1:8000/updatequestion/submit/${questionID}`, jsonData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log("status", response.status);
                    navigate("/selectQuestion");
                } 
                else {
                    console.log("unsuccessful");
                }
            })
            .catch((error) => {
                console.error("Error sending data", error);
            });
        }

        // Delete question
        else if (button === "delete") {
            axios.post(`http://127.0.0.1:8000/deletequestion/submit/${questionID}`, jsonData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log("status", response.status);
                    navigate("/selectQuestion");
                } 
                else {
                    console.log("unsuccessful");
                }
            })
            .catch((error) => {
                console.error("Error sending data", error);
            });
        }
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
                                    defaultValue={question}
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
                                    defaultValue={answers}
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
                                checked={hasOther}
                                type="radio"
                                htmlFor="has_other_true"
                                id="has_other_true"
                                name="has_other"
                                value="true"
                                label="True"
                                onClick={handleHasOtherClick}  
                            />
                            <Form.Check
                                checked={!hasOther}
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
                                <Button className="me-4" type="submit" value="update">Update</Button>
                                <Button type="submit" value="delete">Delete</Button>
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

export default EditQuestionPage;
