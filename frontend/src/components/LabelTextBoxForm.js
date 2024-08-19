import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const LabelTextBoxForm = ({ labels }) => {
    return (
        <Container>
            <Form>
                {labels.map((label, index) => (
                    <Row key={index} className='mb-3'>
                        <Col sm={3}>
                            <Form.Label>{label}</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control type="text" placeholder={`Enter text for ${label}`} />
                        </Col>
                    </Row>
                ))}
            </Form>
        </Container>
    );
};

export default LabelTextBoxForm;