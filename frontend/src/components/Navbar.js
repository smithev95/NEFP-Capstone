import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CompanyLogo from "../img/companyLogo50Year.png";

// source: https://react-bootstrap.netlify.app/docs/components/navbar/
function NavbarMenu() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                    <Navbar.Brand href="/">
                        <img 
                            src={CompanyLogo}
                            width="80"
                            height="39"
                            className="d-inline-block aligh-top"
                            alt="NEFP logo"
                        />
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Editor" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/1.1">Adjust Questionnaire</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/1.2">Add Question</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.3">Edit Question</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.4">Delete Question</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/1.5">Add Language</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.6">Delete Language</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Dataviewer" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1">Custom Data Viewer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/table">Client Data</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;