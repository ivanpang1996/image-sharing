import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container, Spinner} from "react-bootstrap";
import Welcome from "./welcome";
import Main from "./main";

function Index() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [welcomePage, setWelcomePage] = useState(false);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        axios.get("/api/images?pageIndex=1")
            .then((res) => {
                if (res.data.images) {
                    setIsLoaded(true);
                    setItems(res.data.images);
                } else {
                    setIsLoaded(true);
                    setWelcomePage(true);
                }
            }).catch(() => {
            setIsLoaded(true);
            setWelcomePage(true);
        });
    }, [])

    if (error) {
        return <div>Error: </div>;
    } else if (!isLoaded) {
        return (
            <Container className="p-3">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    } else if (welcomePage) {
        return (
            <Welcome/>
        );
    } else {
        return (
            <Main items={items}/>
        );
    }
}

export default Index;