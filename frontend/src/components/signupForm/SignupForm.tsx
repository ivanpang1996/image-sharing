import React, {useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import axios from "axios";
// import {UserContext} from "../../context/UserContext";
import {useForm} from "react-hook-form";

type FormData = {
    username: string;
    password: string;
    passwordConfirmation: string;
};

function SignupForm() {
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [errorMsg, setErrorMsg] = useState("");
    const [show, setShow] = useState(false);

    const onSubmit = handleSubmit(data => {
        if (data.password !== data.passwordConfirmation) {
            setErrorMsg("The password confirmation does not match.")
            setShow(true)
            return;
        }
        axios.post("/api/signup", data)
            .then((res) => {
                if (res.data.success) {
                    window.location.href = '/login';
                } else {
                    if (res.data.errorCode === "USER_EXIST") {
                        setErrorMsg("This email address is already being used")
                        setShow(true)
                    }
                }
            });
    });

    return (
        <>
            {show ?
                <Alert variant="danger" onClose={() => setShow(false)} >
                    <Alert.Heading>Oops!</Alert.Heading>
                    <p>
                        {errorMsg}
                    </p>
                </Alert> : <></>
            }
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
                    <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control  {...register("passwordConfirmation")} type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default SignupForm;