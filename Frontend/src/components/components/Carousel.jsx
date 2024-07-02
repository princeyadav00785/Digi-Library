import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import i1 from "../assets/Carousel/1.jpg";
import i2 from "../assets/Carousel/2.jpg";
import i3 from "../assets/Carousel/3.jpg";
import i4 from "../assets/Carousel/4.jpg";
import i5 from "../assets/Carousel/5.jpg";
import i6 from "../assets/Carousel/6.jpg";
import i7 from "../assets/Carousel/7.jpg";

const CarouselComponent = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      <div>
        <img src={i1} alt="Slide 1" className="object-cover max-h-96"  />
      </div>
      <div>
        <img src={i2} alt="Slide 2"  className="object-cover max-h-96"  />
      </div>
      <div>
        <img src={i3} alt="Slide 3"  className="object-cover max-h-96"  />
      </div>
      <div>
        <img src={i4} alt="Slide 4" className="object-cover max-h-96"  />
      </div>
      <div>
        <img src={i5} alt="Slide 5"  className="object-cover max-h-96" />
      </div>
      <div>
        <img src={i6} alt="Slide 6"  className="object-cover max-h-96" />
      </div>
      <div>
        <img src={i7} alt="Slide 7"  className="object-cover max-h-96" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
