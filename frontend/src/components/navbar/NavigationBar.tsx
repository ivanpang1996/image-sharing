import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">InstaPic</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav>
                        <Nav.Link eventKey={2} href="/login">
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
