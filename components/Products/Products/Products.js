import React from "react";
import Product from "./Product/Product";

import classes from "./Products.module.scss";

export default function Products({ products }) {
  return (
    <div className={classes.products}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
