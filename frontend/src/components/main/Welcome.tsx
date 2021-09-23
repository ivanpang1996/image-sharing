import React from 'react';
import {Carousel, Container} from "react-bootstrap";

function Welcome() {
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

}

export default Welcome;