import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import { producturl } from "../../Api/EndPoints";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProductss] = useState({});
  const [isLoading, setisLoading] = useState(false);
 
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${producturl}/products/${productId}`)
      .then((response) => {
        setProductss(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderAdd={true}
          renderDesc={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;
