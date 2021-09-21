import React from 'react';
import NavigationBar from "../../components/navbar/NavigationBar";
import LoginForm from "../../components/loginForm/LoginForm";
import SignupForm from "../../components/signupForm/SignupForm";

function Signup() {
    return (
        <>
            <NavigationBar/>
            <SignupForm/>
        </>

    );
}

export default Signup;
