import React, { useEffect, useState } from "react";
import ImageGroup from "./ImageGroup/ImageGroup";
import MainImage from "./MainImage/MainImage";

import classes from "./photos.module.scss";

export default function Photos({ photos, title }) {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setImages(photos?.filter((photo, index) => index < 5));
    if (photos?.length > 0) {
      setMainImage(photos[0]);
    }
  }, [photos]);

  const changeMainImageHandler = (image) => {
    setMainImage(image);
  };

  return (
    <div className={classes.holder}>
      <MainImage image={mainImage} title={title} />
      <ImageGroup
        images={images}
        title={title}
        changeImage={changeMainImageHandler}
      />
    </div>
  );
}
