import React, {useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import axios from "axios";
import {useForm} from "react-hook-form";
import {useUser} from "../../context/UserContext";

type FormData = {
    username: string;
    password: string;
};

function LoginForm() {
    const userContext = useUser();
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [errorMsg, setErrorMsg] = useState("");
    const [show, setShow] = useState(false);
    const onSubmit = handleSubmit(data => {
        const bodyFormData = new FormData();
        bodyFormData.append('username', data.username);
        bodyFormData.append('password', data.password);
        axios.post("/api/login", bodyFormData)
            .then((res) => {
                if (res.request.responseURL.includes("/api/login-success")) {
                    window.location.href = '/';
                } else {
                    setErrorMsg("The username or password is incorrect. Please try again.")
                    setShow(true);
                }
            }).catch(() => {
            setErrorMsg("Something went wrong x_x")
            setShow(true);
        });
    });

    return (
        <>
            {userContext.user !== null ?
                <div className="d-flex justify-content-center">
                    You have logged in already.
                </div> :
                <>
                    <div className="d-flex justify-content-center">
                        <h5>Login</h5>
                    </div>
                    <div className="d-flex justify-content-center">

                        {show ?
                            <Alert variant="danger" onClose={() => setShow(false)}>
                                <Alert.Heading>Oops!</Alert.Heading>
                                <p>
                                    {errorMsg}
                                </p>
                            </Alert> : <></>
                        }
                    </div>
                    <div className="d-flex justify-content-center">
                        <Form method="post" onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"  {...register("username")} placeholder="Enter username"/>
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
                </>
            }
        </>
    );
}

export default LoginForm;