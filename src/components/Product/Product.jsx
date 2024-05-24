import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  //state with an empty array
  useEffect(() => {
    setisLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setproducts(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {products.map((singleproduct) => {
            return (
              <ProductCard
                renderAdd={true}
                key={singleproduct.id}
                product={singleproduct}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Product;
