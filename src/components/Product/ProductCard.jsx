import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyForamt";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  // Optional chaining (?.) allows you to access deeply nested properties without having to explicitly check if each reference in the chain is valid. If any part of the chain is null or undefined, it will return undefined instead of throwing an error.

  return (
    <div
      style={{
        fontSize: "13px",
        fontFamily: "sans-serif",
        textAlign: "justify",
      }}
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>

      <div>
        <h3>{title}</h3>
        {renderDesc && (
          <div
            style={{
              maxWidth: "600px",
              textAlign: "justify",
              lineHeight: "1.6",
            }}
          >
            {description}
          </div>
        )}
        <div className={classes.rating}>
          {/* //// Default to 0 if rate is undefined */}
          <Rating value={rating?.rate ?? 0} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <br />
        <br />
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
