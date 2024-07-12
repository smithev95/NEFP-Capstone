import React, { useState, useEffect } from 'react';
import NavbarMenu from './components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const AddQuestionPage = () => {
    const [allLanguages, setallLanguages] = useState([]);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");
    const [translatedQuestions, setTranslatedQuestions] = useState({});
    const [translatedAnswers, setTranslatedAnswers] = useState({});
    const [translatedOthers, setTranslatedOther] = useState({});
    const [areQuestionsLoading, setQuestionsLoading] = useState(false);
    const [areAnswerssLoading, setAnswersLoading] = useState(false);

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
        });
    }

    const translateQuestionButton = () =>
    {
        if(areQuestionsLoading)
        {
            return (
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>
            );
        }
        else
        {
            return (
                <Button type="button" onClick={() => getQuestionTranslations()}>Get Translation</Button>
            );
        }
    }

    const translateAnswersButton = () =>
        {
            if(areAnswerssLoading)
            {
                return (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                );
            }
            else
            {
                return (
                    <Button type="button" onClick={() => getAnswersTranslations()}>Get Translation</Button>
                );
            }
        }


    function displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers, translatedOthers) {
        if (allLanguages.length !== 0) {
            return allLanguages.map(obj => {
                return <Row className="py-3" key={`${obj.abbreviation}`}>
                            <Form.Label htmlFor={`${obj.abbreviation}-question`}>{`${obj.name} Question:`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-question`}
                                name={`${obj.abbreviation}-question`}
                                defaultValue={translatedQuestions[obj.abbreviation] ? `${translatedQuestions[obj.abbreviation]}` : ""}
                            />
                            <Form.Label htmlFor={`${obj.abbreviation}-other`}>{`${obj.name} "Other":`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-other`}
                                name={`${obj.abbreviation}-other`}
                                defaultValue={translatedOthers[obj.abbreviation] ? `${translatedOthers[obj.abbreviation]}` : ""}
                            />
                            <Form.Label htmlFor={`${obj.abbreviation}-answers`}>{`${obj.name} Answers:`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-answers`}
                                name={`${obj.abbreviation}-answers`}
                                defaultValue={translatedAnswers[obj.abbreviation] ? `${translatedAnswers[obj.abbreviation]}` : ""}
                            />
                       </Row>
            })
        }
    }

    return (
        <>
        <NavbarMenu />
        <Container>
            <Form method="post" onSubmit={handleSubmit}>
                <Row className="gap-5">
                    <Col>
                        <Row className="py-3">
                            <Form.Label htmlFor="question">Question:</Form.Label>
                            <Form.Control className="mb-3"
                                type="text"
                                id="question"
                                name="question"
                                placeholder="Please enter question here"
                                onBlur={(e) => setQuestion(e.target.value)}   
                            />
                            <Col className="py-3">
                                {translateQuestionButton()}
                            </Col>
                        </Row>
                        <Row className="py-3">
                            <Form.Label htmlFor="answers">Answers (comma-separated):</Form.Label>
                            <Form.Control className="mb-3"
                                type="text"
                                id="answers"
                                name="answers"
                                placeholder="example: yes, no, maybe"
                                onBlur={(e) => setAnswers(e.target.value)}   
                            />
                            <Col className="py-3">
                                {translateAnswersButton()}
                            </Col>
                        </Row>
                        <Row className="py-3">
                            <Col>
                                <Row>
                                    <Form.Label htmlFor="hasOther">Has Other:</Form.Label>
                                </Row>
                                <Col>
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
                                </Col>
                            </Col>
                        </Row>
                        <Row className="py-3">
                            <Col md>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        {displayTranslatedText(allLanguages, translatedQuestions, translatedAnswers, translatedOthers)}
                    </Col>
                </Row>
            </Form>
        </Container>
        </>
    );
}

export default AddQuestionPage;
