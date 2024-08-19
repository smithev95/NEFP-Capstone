import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarMenu from './components/Navbar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

const SelectQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionID, setQuestionID] = useState();
  let navigate = useNavigate();
  // Fetch questions from database
  useEffect(() => {
    console.log("App.js useEffect called.");
    axios
      .get("http://127.0.0.1:8000/questions/")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Set the questionID state when a question is selected from the list
  const onOptionChange = (e) => {
    setQuestionID(e.target.id);
  };

  // Navigate to EditQuestionPage and passing the questionID to the component
  const handleSelect = () => {
    navigate("/editQuestion", { state: { id: questionID } });
  };

  function displayQuestions(questions) {
    if (questions.length !== 0) {
        return (
            <Form>
                {questions.map((obj) => (
                    <div key={`${obj.id}`}>
                        <Form.Check
                            type="radio"
                            name="question"
                            label={`${obj.question}`}
                            id={`${obj.id}`}
                            value={`${obj.id}`}
                            onChange={onOptionChange}
                        />
                    </div>
                ))}
            </Form>
        );
    }
  }

  return (
    <>
        <NavbarMenu />
        <Container>
            <Row className="py-3">
                <Col>Select a question to delete or update:</Col>
            </Row>
            <Row>
                <Col>
                    {displayQuestions(questions)}
                </Col>
            </Row>
            <Row className="py-3">
                <Col>
                    <Button onClick={handleSelect}>Select</Button>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default SelectQuestionPage;
