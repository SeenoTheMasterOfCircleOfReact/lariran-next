import { useState } from "react";
import axios from "axios";

import classes from "./Like.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";

export default function Like({ like, token, getLikes }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = () => {
    setDeleteLoading(true);
    const url = `https://api.lariran.com/api/v1/favorite/add`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          product_id: like.product.id,
        },
      })
      .then((response) => {
        getLikes();
      })
      .catch((error) => {})
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  let image = null;
  if (like.product.images && like.product.images.length > 0) {
    image = like.product.images[0].address;
  }
  let price = "ناموجود";
  if (like.product.varieties && like.product.varieties.length > 0) {
    price = like.product.varieties[0].price + " تومان ";
  }

  let name = like.product.persian_title;
  if (like.product.persian_title.length > 40) {
    name = like.product.persian_title.slice(0, 37) + "...";
  }

  return (
    <div className={classes.holder}>
      <Link
        href={"/product/" + like.product.id + "/" + like.product.slug}
        className={classes.top}
      >
        <div className={classes.image}>
          <Image
            src={image}
            alt={like.product.persian_title}
            width={100}
            height={100}
          ></Image>
        </div>
        <div className={classes.details}>
          <div className={classes.name}>{name}</div>
          <div className={classes.price}>{price}</div>
        </div>
      </Link>
      <div className={classes.bottom}>
        <LoadingButton
          onClick={handleDelete}
          loading={deleteLoading}
          variant="outlined"
          sx={{
            fontFamily: "inherit",
            width: "100%",
          }}
        >
          حذف
        </LoadingButton>
      </div>
    </div>
  );
}
