import Link from "next/link";
import React from "react";

import classes from "../../../../styles/Home/Products/product.module.scss";

export default function Product({ product }) {
  let variety = product.varieties.find((v) => v.stock > 0);

  return (
    <Link
      href={`/product/${product.id}/${product.slug}`}
      className={classes.holder}
    >
      <img
        className={classes.img}
        alt={product.title}
        src={product?.images?.[0]?.address}
      />
      <div className={classes.title}>{product.persian_title}</div>
      {variety ? (
        <div className={classes.price}>
          <div className={classes.show}>
            <div className={classes.right}>{variety.show_price}</div>
            <div className={classes.percent}>{`%` + variety.percent}</div>
          </div>
          <div className={classes.real}>{variety.price + " تومان "}</div>
        </div>
      ) : (
        <div className={classes.outOfStock}>ناموجود</div>
      )}
    </Link>
  );
}
