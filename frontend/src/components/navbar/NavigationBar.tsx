import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {RootState} from "../../reducers";


function NavigationBar() {
    const isLoggedIn = useSelector((state: RootState) => {
        return state.isLoggedIn;
    });

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">InstaPic</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav>
                        {isLoggedIn ? <Nav.Link eventKey={2} href="/logout">Logout</Nav.Link> : <Nav.Link eventKey={2} href="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
