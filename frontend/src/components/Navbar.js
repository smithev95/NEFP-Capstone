import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
                <Navbar.Brand href="#home">
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
                            <NavDropdown.Item href="#action/1.3">Update Question</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.4">Delete Question</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/1.5">Add Language</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.6">Remove Language</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Dataviewer" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1">Custom Data Viewer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/2.2">
                                <Link to="/table">Client Data</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.3">Languages</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Forms" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">View Form 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">View Form 2</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/4.1">Setting 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.2">Setting 2</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/4.3">
                                <Link to="/">Sign-out</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;