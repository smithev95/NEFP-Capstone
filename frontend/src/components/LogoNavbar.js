import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CompanyLogo from "../img/NEFPLogo.png";

// source: https://react-bootstrap.netlify.app/docs/components/navbar/
function LogoNavbar() {
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
            </Container>
        </Navbar>
    );
}

export default LogoNavbar;