import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container, Spinner} from "react-bootstrap";
import Welcome from "./Welcome";
import MainApp from "./MainApp";
import {useLocation} from "react-router-dom";


function Index() {
    const search = useLocation().search;
    const pageIndex = new URLSearchParams(search).get('pageIndex') ? Number(new URLSearchParams(search).get('pageIndex')) : 1;
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [welcomePage, setWelcomePage] = useState(false);

    useEffect(() => {
        axios.get(`/api/images?pageIndex=${pageIndex}`)
            .then((res) => {
                if (res.data.images) {
                    setIsLoaded(true);
                    setItems(res.data.images);
                    setTotalPages(res.data.totalPages);
                    setCurrentPage(pageIndex);
                } else {
                    setIsLoaded(true);
                    setWelcomePage(true);
                }
            }).catch(() => {
            setIsLoaded(true);
            setError(true);
        });
    }, [])

    if (error) {
        return (
            <Container className="p-3">
                <img
                    src="https://cdn.systweak.com/content/wp/systweakblogsnew/uploads_new/2018/03/How-to-Fix-Aw-Snap-Error-in-Chrome1.jpg"></img>
                <p>something went wrong x_x</p>
            </Container>
        );
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
            <MainApp items={items} totalPages={totalPages} currentPage={currentPage}/>
        );
    }
}

export default Index;