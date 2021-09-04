import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "../about/About";
import Contact from "../contact/Contact";
import App from "../app/App";
import Card from "../card/Card";

function AppRouter() {
    return (
        <div>
            <Switch>
                {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
                <Route path="/about">
                    <About/>
                </Route>

                {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
                <Route path="/contact/:id">
                    <Contact/>
                </Route>

                {/*/!* If none of the previous routes render anything,*/}
                {/*  this route acts as a fallback.*/}

                {/*  Important: A route with path="/" will *always* match*/}
                {/*  the URL because all URLs begin with a /. So that's*/}
                {/*  why we put this one last of all *!/*/}
                <Route path="/">
                    <App/>
                </Route>
            </Switch>
        </div>
    );
}

export default AppRouter;
