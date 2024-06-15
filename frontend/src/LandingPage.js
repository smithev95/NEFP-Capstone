import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import CompanyLogo from "./img/companyLogo50Year.png";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function SigninButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeAndLink = () => {
        setShow(false);
        <Link to="http://localhost:8000/adminpanel" />
    }

    return(
        <>
        <Button className="float-end" variant="outline-primary" size="sm" onClick={handleShow}>
        Sign in
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                placeholder="username"
                autoFocus
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Link to="http://localhost:8000/adminpanel">
                <Button variant="primary" onClick={handleClose}>
                    Sign in
                </Button>
            </Link>
        </Modal.Footer>
        </Modal>
        </>
    );
}

function QuestionnaireButton() {
    return (
        <Link to="/form">
            <Button variant="primary" size="lg">
                Open Questionnaire
            </Button>
        </Link>
    );
}

function CenterCard() {
    return (
        <Card>
            <Card.Img src={CompanyLogo}/>
            <Card.Body>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque risus ligula, hendrerit et sem ut, tristique.
                </Card.Text>
                <Card.Body>
                    <QuestionnaireButton />
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

const LandingPage = () => {
    return (
        <Container>
            <Row>
                <Col md="3"/>
                <Col md="6">
                    <SigninButton />
                </Col>
                <Col md="3"/>
            </Row>
            <Row>
                <Col md="3" />
                <Col md="6">
                    <CenterCard />
                </Col>
                <Col md="3" />
            </Row>
        </Container>            
    );
}

export default LandingPage;