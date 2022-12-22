import React from "react";
import Actions from "./Actions/Actions";
import Details from "./Details/Details";
import Photos from "./Photos/Photos";

import classes from "./top.module.scss";

export default function Top({ product, varieties, variety, selectVariety }) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        <Actions />
        <Photos photos={product?.images} title={product?.persian_title} />
      </div>
      <Details
        product={product}
        varieties={varieties}
        variety={variety}
        selectVariety={selectVariety}
      />
    </div>
  );
}
