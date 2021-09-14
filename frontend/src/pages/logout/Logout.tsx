import React from 'react';
import NavigationBar from "../../components/navbar/NavigationBar";
import LoginForm from "../../components/loginForm/LoginForm";
import axios from "axios";
import {Button, Form} from "react-bootstrap";


function Logout() {
    const logout = (event: React.FormEvent<HTMLFormElement>) => {
        alert("clicked")
        event.preventDefault();
        axios.post("/api/logout")
            .then(res => alert("logged out"));
    }

    return (

        <Form method="post" onSubmit={logout}>
            <Button variant="primary" type="submit">
                Logout
            </Button>
        </Form>

    );
}

export default Logout;
