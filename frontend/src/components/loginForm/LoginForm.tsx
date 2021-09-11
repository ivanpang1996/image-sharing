import React from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import cookie from 'js-cookie'

function LoginForm() {

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        alert("clicked")
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('username', event.currentTarget.username.value);
        bodyFormData.append('password', event.currentTarget.password.value);

        axios.post("/api/login", bodyFormData,
            {
            headers: {
                "X-CSRFToken": cookie.get('XSRF-TOKEN'),
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            }
        }
        )
            .then(res => alert(res.data.message))
    }

    return (
        <div className="d-flex justify-content-center">
            <Form method="post" onSubmit={login}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="username" type="email" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginForm;