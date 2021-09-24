import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import AppPagination from "./Pagination";
import Detail from "./Detail";
import { BsEye } from "react-icons/bs";
import {useForm} from "react-hook-form";
import axios from "axios";

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

type FormData = {
    caption: string;
    image: any;
};



function MainApp({items, totalPages, currentPage}: Props) {
    const [show, setShow] = useState(false);
    const [viewItem, setViewItem] = useState<Item>({imageURL: "", author: "", caption: ""});
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<FormData>();
    const handleClose = () => setShow(false);

    const onSubmit = handleSubmit(data => {
        axios.post("/api/image", data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                if (res.data.success) {
                    alert("success")
                } else {
                    console.log(res)
                }
            });
    });

    return (
        <>
            <Container className="p-3">
                <Card>
                    <Card.Header as="h5">What is in your mind?</Card.Header>
                    <Card.Body>
                        <Form method="post" onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Control type="text" {...register("caption")} placeholder="Any caption?"/>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" {...register("image")}/>
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
                                            <Button variant="primary" onClick={() => {
                                                setViewItem(item);
                                                setShow(true);
                                            }}><BsEye/></Button>
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
            <Detail author={viewItem.author} caption={viewItem.caption} imageURL={viewItem.imageURL}
                    handleClose={handleClose} show={show}/>
        </>
    );

}

export default MainApp;