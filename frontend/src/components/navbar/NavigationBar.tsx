import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {useUser} from "../../context/UserContext";


function NavigationBar() {
    const userContext = useUser();

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">InstaPic</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav>
                        {userContext.user === null ? <Nav.Link eventKey={2} href="/login">Login</Nav.Link> :
                            <Nav.Link eventKey={2} href="/logout">Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
