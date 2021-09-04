import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../../pages/home/Home";
import NotFound from "../notFound/404";
import Login from "../../pages/login/Login";

function AppRouter() {
    return (
        <div>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>

                <Route path="/contact/:id">
                    <Contact/>
                </Route>

                <Route exact path="/">
                    <Home/>
                </Route>

                {/*/!* If none of the previous routes render anything,*/}
                {/*  this route acts as a fallback.*/}

                {/*  Important: A route with path="/" will *always* match*/}
                {/*  the URL because all URLs begin with a /. So that's*/}
                {/*  why we put this one last of all *!/*/}
                <Route path="/">
                    <NotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default AppRouter;
