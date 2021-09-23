import React, {useState} from 'react';
import {Button, Container, Form, Modal, Nav, Navbar} from 'react-bootstrap';
import {useUser} from "../../context/UserContext";
import axios from "axios";


function NavigationBar() {
    const userContext = useUser();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/logout")
            .then(() => {
                window.location.href = '/';
            });
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">InstaPic</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"/>
                        <Nav>
                            {userContext.user === null ?
                                <>
                                    <Nav.Link eventKey={2} href="/signup">Sign Up</Nav.Link>
                                    <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                                </> :
                                <Nav.Link eventKey={2} onClick={handleShow}> Hi {userContext.user.email},
                                    Logout</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Form method="post" onSubmit={logout}>
                        <Button variant="primary" type="submit">
                            Yes
                        </Button>
                    </Form>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NavigationBar;
