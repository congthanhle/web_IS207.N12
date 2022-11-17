import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { URI } from '../../api';


export default function Slide() {
  const [slide, setSlide] = useState([]);
  useEffect(() => {
    const getSlide = async () => {
      const res = await axios.get(`${URI}/slide`);
      setSlide(res.data);
    }
    getSlide();
    const timerId = setTimeout(getSlide, 200);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <Carousel variant="white">
      {
        slide && slide.map((item, index) => (
          <Carousel.Item interval={4000} key={index}>
            <img
              className="d-block w-100"
              src={item.img_link}
              alt={item.name}
            />
          </Carousel.Item>
        ))
      }
    </Carousel>
  )
}
