import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          //console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "15px" }}>You Don't have Orders Yet</div>
          )}
          <div>
            {orders?.map((eachorder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachorder?.id}</p>
                  {eachorder?.data.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
