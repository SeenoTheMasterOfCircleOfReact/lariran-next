import Image from "next/image";
import React from "react";

import classes from "./Brand.module.scss";

export default function Brand({ brand }) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        {brand.image ? (
          <Image
            src={`https://api.lariran.com${brand.image}`}
            alt={brand.name}
            width={80}
            height={80}
          />
        ) : (
          <Image
            src="/images/no-image.png"
            alt={brand.name}
            width={80}
            height={80}
          />
        )}
      </div>
      <div className={classes.left}>
        <div className={classes.top}>{brand.name}</div>
        <div className={classes.bottom}>{brand.persian_name}</div>
      </div>
    </div>
  );
}
