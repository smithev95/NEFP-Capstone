import React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CompanyLogo from "../img/NEFPLogo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginModal from "./LoginModal";

// source: https://react-bootstrap.netlify.app/docs/components/navbar/
function LoginNavbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img 
                        src={CompanyLogo}
                        width="40"
                        className="d-inline-block aligh-top"
                        alt="NEFP logo"
                    />
                </Navbar.Brand>
                <Form className="d-flex">
                    <Button variant="outline-primary" onClick={handleShow}>
                        Sign-in
                    </Button>
                    <LoginModal show={show} onHide={handleClose}/>
                </Form>
            </Container>
        </Navbar>
    );
}

export default LoginNavbar;