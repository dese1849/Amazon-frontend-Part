import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/EndPoints";
import classes from "./Results.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function Results() {
  const [results, setresults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((response) => {
        setresults(response.data);
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
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/{categoryName}</p>
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                renderDesc={false}
                product={product}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Results;
