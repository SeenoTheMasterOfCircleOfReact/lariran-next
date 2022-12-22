import Image from "next/image";
import React from "react";

import classes from "./imageItem.module.scss";

export default function ImageItem({ image, title, more, changeImage }) {
  const src = image?.address;

  return (
    <div
      className={classes.holder}
      onClick={() => (more ? null : changeImage(image))}
    >
      {src && <Image src={src} alt={title} width={60} height={60} />}
      {more && <div className={classes.more}></div>}
      {more && <div className={classes.text}>بیشتر</div>}
    </div>
  );
}
