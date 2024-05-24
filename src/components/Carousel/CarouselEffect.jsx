import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";
import { renderArrowPrev, renderArrowNext } from "./CustomArrows";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
      >
        {img.map((imagitemlink, index) => {
          return <img key={index} src={imagitemlink} />;
        })}
      </Carousel>
      <div className={classes.hero_image}></div>
    </div>
  );
}

export default CarouselEffect;
