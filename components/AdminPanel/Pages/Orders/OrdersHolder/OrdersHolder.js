import React from "react";
import Order from "./Order/Order";

import classes from "./OrdersHolder.module.scss";

export default function OrdersHolder({
  orders,
  loading,
  error,
  getOrders,
  token,
  status,
  search,
  from,
  to,
}) {
  return (
    <div className={classes.holder}>
      {orders.map((order) => (
        <Order
          key={order.id}
          order={order}
          getOrders={getOrders}
          token={token}
          status={status}
          search={search}
          from={from}
          to={to}
        />
      ))}
    </div>
  );
}
