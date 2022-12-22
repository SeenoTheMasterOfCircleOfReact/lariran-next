import React from "react";
import Card from "./Card/Card";

import classes from "./left.module.scss";

export default function Left({ product, variety }) {
  return (
    <div className={classes.left}>
      <Card product={product} variety={variety} />
    </div>
  );
}
