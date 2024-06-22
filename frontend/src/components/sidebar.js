import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import './sidebar.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const style = {

}

// copied from youtube video at the following link
// https://www.youtube.com/watch?v=X9hnBtYQx0A&ab_channel=CodeWithYousaf
function SidebarMenu() {
    return (
        <Container fluid>
            <Row>
                <Col className="bg-dark col-auto col-md-3 min-vh-100 d-flex justify-content-between flex-column">
                    <div>
                        <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-3">
                            <span className="ms-1 fs-4 d-none d-sm-inline">Brand</span>
                        </a>
                        <hr className="text-secondary d-none d-sm-block"/>
                        <ul class="nav nav-pills flex-column mt-3 mt-sm-0">
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className="bi bi-speedometer2"></i>
                                    <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className="bi bi-house"></i>
                                    <span className="ms-3 d-none d-sm-inline">Home</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className="bi bi-table"></i>
                                    <span className="ms-3 d-none d-sm-inline">Orders</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className="bi bi-grid"></i>
                                    <span className="ms-3 d-none d-sm-inline">Products</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className="bi bi-people"></i>
                                    <span className="ms-3 d-none d-sm-inline">Customers</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown open">
                        <a class="text-decoration-none text-white dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bi bi-person-circle"></i><span className="ms-2 d-none d-sm-inline">username</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" href="#">
                                <span className="d-sm-inline">1</span>
                                <span className="d-none d-sm-block">Profile</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <span className="d-sm-inline">2</span>
                                <span className="d-none d-sm-block">Settings</span>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SidebarMenu;