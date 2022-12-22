import React from "react";
import Item from "./Item/Item";

import classes from "./Items.module.scss";

export default function Items({ products }) {
  return (
    <div className={classes.holder}>
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}
