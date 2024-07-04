import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function TextInput({label_text, placeholder_text}) {
    return (
        
        <Form>
            <Form.Group as={Row} className="mb-3" controlID="plaintext">
                <Form.Label column sm="2">
                    {label_text}
                </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder={placeholder_text} />
                </Col>
            </Form.Group>
        </Form>
        
    );
}

export default TextInput;