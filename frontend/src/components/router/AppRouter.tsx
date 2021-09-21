import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../../pages/home/Home";
import NotFound from "../notFound/404";
import Login from "../../pages/login/Login";
import Logout from "../../pages/logout/Logout";
import Signup from "../../pages/signup/Signup";

function AppRouter() {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/about" component={About}/>
                <Route path="/contact/:id" component={Contact}/>
                <Route exact path="/" component={Home}/>

                {/*/!* If none of the previous routes render anything,*/}
                {/*  this route acts as a fallback.*/}

                {/*  Important: A route with path="/" will *always* match*/}
                {/*  the URL because all URLs begin with a /. So that's*/}
                {/*  why we put this one last of all *!/*/}
                <Route path="/" component={NotFound}/>
            </Switch>
        </div>
    );
}

export default AppRouter;
