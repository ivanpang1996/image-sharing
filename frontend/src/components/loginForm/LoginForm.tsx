import React from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";

function LoginForm() {

    const login = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        alert(event.target)

        fetch('/api/login', {
            method: 'POST',
            body: null,
        }).then(res => res.json())
            .then(
                (response) => {
                    alert(response.aaa);
                },
                (error) => {
                    alert("error")
                }
            );
    }


    //
    // const login = async (data: string) => {
    //     const success = await axios.put("/api/login", data);
    //     success ? alert("Profile successfully updated!") : alert("Error updating profile. Please try again later.");
    // };

    return (
        <div className="d-flex justify-content-center">
            <Form method="post" onSubmit={login}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginForm;