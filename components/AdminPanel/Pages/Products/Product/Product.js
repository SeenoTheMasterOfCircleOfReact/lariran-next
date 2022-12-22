import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import classes from "./Product.module.scss";
import { Button } from "@mui/material";

export default function Product({ product }) {
  const router = useRouter();

  function handleNavigate() {
    router.push({
      pathname: `/admin-panel/products/${product.id}/${product.title}`,
    });
  }

  const variety = product.varieties.find((v) => v.stock > 0);

  let image = "/images/logo.png";
  if (product.images && product.images.length > 0) {
    image = product.images[0].address;
  }

  const name =
    product.persian_title.length > 45
      ? product.persian_title.slice(0, 45) + "..."
      : product.persian_title;

  return (
    <div className={classes.holder}>
      <Image width={200} height={200} src={image} alt={product.persian_title} />
      <div className={classes.title}>{name}</div>
      {variety ? (
        <div className={classes.price}>{variety.price + " تومان "}</div>
      ) : (
        <div className={classes.outOfStock}>
          <span className={classes.line}></span>
          <span className={classes.text}>ناموجود</span>
          <span className={classes.line}></span>
        </div>
      )}
      <div className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={{ flexGrow: "2" }}
          onClick={handleNavigate}
        >
          ویرایش
        </Button>
        <Button variant="outlined" size="large" sx={{ flexGrow: "2" }}>
          حذف
        </Button>
      </div>
    </div>
  );
}
