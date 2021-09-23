import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import AppPagination from "./Pagination";

interface Item {
    imageURL: string
    author: string
    caption: string
}

interface Props {
    items: Array<Item>
    totalPages: number
    currentPage: number
}

function MainApp({items, totalPages, currentPage}: Props) {
    return (
        <>
            <Container className="p-3">
                <Card>
                    <Card.Header as="h5">What is in your mind?</Card.Header>
                    <Card.Body>
                        <Form method="post">
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Control type="text" placeholder="Any caption?"/>
                            </Form.Group>
                            {/*TODO: upload to s3*/}
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
                {items.length > 0 ?
                    <>
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
                        <AppPagination totalPages={totalPages} currentPage={currentPage}/>
                    </>
                    :
                    <Container className="p-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/1278/1278611.png"></img>
                        <p>No images available.</p>
                    </Container>
                }
            </Container>
        </>
    );

}

export default MainApp;