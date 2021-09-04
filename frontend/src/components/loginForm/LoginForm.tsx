import React from 'react';
import {Card, Col, Form, Row} from 'react-bootstrap';

function LoginForm() {
    return (
        // TODO: center card
        <Card>
            <Form>
                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="email@example.com"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Password"/>
                    </Col>
                </Form.Group>
            </Form>
        </Card>
    );
}

export default LoginForm;