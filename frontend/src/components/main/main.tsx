import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Carousel, Col, Container, Form, Row, Spinner} from "react-bootstrap";

function Main() {
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
            <>
                <Container className="p-3">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.iwanderlista.com/wp-content/uploads/2020/09/Attitude-captions-for-instagram.jpg"
                                alt="Be Awesome"
                            />

                            <Carousel.Caption>
                                <h3>Be Awesome</h3>
                                <p>.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://lysefjorden.com/wp-content/uploads/2018/03/travel-landscape-01.jpg"
                                alt="Share happiness"
                            />
                            <Carousel.Caption>
                                <h3>Share happiness!</h3>
                                <p>.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </>
        );
    } else {
        return (
            <>
                <Container className="p-3">
                    <Card>
                        <Card.Header as="h5">What is your mind?</Card.Header>
                        <Card.Body>
                            <Form method="post">
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Control type="text" placeholder="Any caption?"/>
                                </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file"/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Row xs={1} md={4} className="g-4">
                        {items.map((item, idx) => (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={item.imageURL}/>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">@{item.author}</Card.Subtitle>
                                        <Card.Text>
                                            {item.caption}
                                        </Card.Text>
                                        <Button variant="primary"><i className=""></i></Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

            </>
        );
    }
}

export default Main;