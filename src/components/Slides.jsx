import React from 'react';
import Slider from 'react-slick';
import './Slides.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slides = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div className="slider-wrapper">
      <h2>Hello Everyone — Our Featured Products</h2>
      <Slider {...settings}>
        <div className="slide">
          <img src="banner1.jpeg" alt="Product 1" />
          <h3>Product 1</h3>
          <p>Description of Product 1</p>
        </div>
        <div className="slide">
          <img src="banner2.jpeg" alt="Product 2" />
          <h3>Product 2</h3>
          <p>Description of Product 2</p>
        </div>
        <div className="slide">
          <img src="banner3.jpeg" alt="Product 3" />
          <h3>Product 3</h3>
          <p>Description of Product 3</p>
        </div>
        <div className="slide">
          <img src="banner4.jpeg" alt="Product 4" />
          <h3>Product 4</h3>
          <p>Description of Product 4</p>
        </div>
      </Slider>
    </div>
  );
};

export default Slides;
