import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function Slide() {
  return (
    <Carousel variant="white">
       
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://theme.hstatic.net/200000309869/1000702189/14/slideshow_3.jpg?v=256"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://theme.hstatic.net/200000309869/1000702189/14/slideshow_2.jpg?v=256"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}
