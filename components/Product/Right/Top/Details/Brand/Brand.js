import Image from "next/image";
import React from "react";

import classes from "./brand.module.scss";

export default function Brand({ brand }) {
  const src = "https://api.lariran.com" + brand?.image;

  return (
    <div className={classes.brand}>
      <span>{brand?.persian_name}</span>
      <span>|</span>
      <span>{brand?.name}</span>
      {src && (
        <Image
          src={src}
          alt={brand?.persian_name}
          width={20}
          height={20}
          className={classes.image}
        ></Image>
      )}
    </div>
  );
}
