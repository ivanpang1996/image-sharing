import {Badge, Button, Image, Modal} from "react-bootstrap";
import React from "react";

interface Props {
    author: string
    caption: string
    imageURL: string
    show: boolean
    handleClose: any
}

function Detail({author, caption, imageURL, show, handleClose}: Props) {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>@{author}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={imageURL} fluid />
                {caption}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Detail;