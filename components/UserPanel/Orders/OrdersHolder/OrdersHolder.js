import React from "react";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";
import Order from "./Order/Order";

import AlertBg from "../../../UI/AlertBg/AlertBg";
import ErrorIcon from "@mui/icons-material/Error";

import classes from "./OrdersHolder.module.scss";
import OrderSkeleton from "./OrderSkeleton/OrderSkeleton";

export default function OrdersHolder({
  orders,
  loading,
  error,
  errors,
  getOrders,
}) {
  if (loading) {
    return (
      <div className={classes.holder}>
        {[1, 2, 3, 4, 5].map((o, i) => (
          <OrderSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className={classes.error}>
        <AlertBg
          refresh={true}
          onRefresh={getOrders}
          color="red"
          title="مشکلی پیش آمده است. لطفا دوباره امتحان نمایید"
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }
  return (
    <div className={classes.holder}>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}
