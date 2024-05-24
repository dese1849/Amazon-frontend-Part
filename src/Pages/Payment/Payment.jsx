import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyForamt";
import { CircleLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/Action.type";
function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // Backend || function --> contact to get cleient secret
    // after the confirmation order/ firestore save, clear basket
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // React side confirmation using stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // create users
      // then bezi id document create endaregalen
      // letefeterew deoc bcha order trakc yemidergbet document
      //bzu order linoru slemichil bekelalu be id indetify endinareg doc enfetralen
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({
        type: Type.EMPTY_BASKET,
      });

      // console.log(paymentIntent);
      setProcessing(false);
      navigate("/orders", { state: { message: "You have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <Layout>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chigago,Il</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Reveiw items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}> {cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <CircleLoader color="gray" size={12} />
                        <p>Please Wait..</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
