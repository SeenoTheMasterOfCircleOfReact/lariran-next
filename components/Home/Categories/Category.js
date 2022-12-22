import Image from "next/image";
import React from "react";

import classes from "../../../styles/Home/Categories/category.module.scss";

export default function Category({ category }) {
  return (
    <div className={classes.holder}>
      <Image
        src={`https://api.lariran.com${category.image}`}
        alt={category.persian_name}
        width={80}
        height={80}
      />
      <div
        style={{
          fontWeight: "600",
        }}
      >
        {category.persian_name}
      </div>
    </div>
  );
}
