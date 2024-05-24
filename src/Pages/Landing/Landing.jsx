import React from "react";
import Layout from "../../components/Layout/Layout";
import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";

function Landing() {
  return (
    <div>
      <Layout>
        <CarouselEffect />
        <Category />
        <Product />
      </Layout>
    </div>
  );
}

export default Landing;
