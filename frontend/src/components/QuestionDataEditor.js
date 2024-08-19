import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Form } from 'react-bootstrap'

const QuestionDataEditor = ({ data }) => {
    return (
        <Container>
            {data.map((item) => (
                <Form key={item.id} className="mb-3">
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>
                            {item.question}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" /> 
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={6}>
                            {item.answer_choices.join(', ')}
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    
                    {item.has_other && (
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label column sm={2}>
                                Has "Other" Field:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" />
                            </Col>
                        </Form.Group>
                    )} 
                </Form>
            ))}
        </Container>
    );
};

export default QuestionDataEditor;