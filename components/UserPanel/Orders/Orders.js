import { useState, useEffect } from "react";
import axios from "axios";

import Title from "../Title/Title";
import OrdersHolder from "./OrdersHolder/OrdersHolder";

import classes from "./Orders.module.scss";

export default function Orders({ token, user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    user && onGetOrders();
  }, [user]);

  const onGetOrders = () => {
    setLoading(true);
    setError(false);
    setErrors([]);
    const url = `https://api.lariran.com/api/v1/${user?.id}/orders`;
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setErrors(errors);
        } else {
          setError(false);
          const newOrders = response.data.data;
          setOrders(newOrders);
        }
      })
      .catch((error) => {
        setError(true);
        setErrors([error.message]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.orders}>
      <Title title="سفارشات" />
      <OrdersHolder
        orders={orders}
        loading={loading}
        error={error}
        errors={errors}
        getOrders={onGetOrders}
      />
    </div>
  );
}
