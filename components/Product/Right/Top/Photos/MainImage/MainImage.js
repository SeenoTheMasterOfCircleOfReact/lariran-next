import Image from "next/image";
import React from "react";

import classes from "./mainImage.module.scss";

export default function MainImage({ image, title }) {
  const src = image?.address;

  return (
    <div className={classes.main}>
      {src && (
        <Image
          className={classes.image}
          sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
          fill
          src={src}
          alt={title}
          priority
        />
      )}
    </div>
  );
}
