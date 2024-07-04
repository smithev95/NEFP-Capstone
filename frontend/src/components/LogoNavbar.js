import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CompanyLogo from "../img/companyLogo50Year.png";

// source: https://react-bootstrap.netlify.app/docs/components/navbar/
function LogoNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/">
                    <Navbar.Brand href="#home">
                        <img 
                            src={CompanyLogo}
                            width="80"
                            height="39"
                            className="d-inline-block aligh-top"
                            alt="NEFP logo"
                        />
                    </Navbar.Brand>
                </Link>
            </Container>
        </Navbar>
    );
}

export default LogoNavbar;