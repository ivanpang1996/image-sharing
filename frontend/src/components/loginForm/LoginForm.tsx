import React from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
// import {UserContext} from "../../context/UserContext";
import {useForm} from "react-hook-form";

const loginAction = () => {
    return {
        type: "LOGGED_IN"
    };
};

type FormData = {
    username: string;
    password: string;
};

function LoginForm() {
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<FormData>();
    const onSubmit = handleSubmit(data => {
        const bodyFormData = new FormData();
        bodyFormData.append('username', data.username);
        bodyFormData.append('password', data.password);
        axios.post("/api/login", bodyFormData)
            .then(() => {
                window.location.href = '/';
            });
    });

    return (
        <div className="d-flex justify-content-center">
            <Form method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  {...register("username")} placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  {...register("password")} type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginForm;