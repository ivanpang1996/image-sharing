import React from 'react';
import axios from "axios";
import {Button, Form} from "react-bootstrap";


function Logout() {
    const logout = (event: React.FormEvent<HTMLFormElement>) => {
        alert("clicked")
        event.preventDefault();
        axios.post("/api/logout")
            .then(() => {
                localStorage.removeItem("isLoggedIn")
            });
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
