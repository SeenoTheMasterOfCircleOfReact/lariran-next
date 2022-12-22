import React from "react";
import ImageItem from "./ImageItem/ImageItem";

import classes from "./imageGroup.module.scss";

export default function ImageGroup({ images, title, changeImage }) {
  return (
    <div className={classes.holder}>
      {images?.map((image, index) => {
        const more = index === 4 ? true : false;
        return (
          <ImageItem
            key={image.id}
            image={image}
            title={title}
            more={more}
            changeImage={changeImage}
          />
        );
      })}
    </div>
  );
}
