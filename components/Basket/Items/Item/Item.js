import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../../../store/auth-context";
import { BasketContext } from "../../../../store/basket-context";

import CircularProgress from "@mui/material/CircularProgress";

import classes from "./Item.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Item({ product }) {
  const authCtx = useContext(AuthContext);
  const basketCtx = useContext(BasketContext);
  const [value, setValue] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(product.quantity);
  }, [product]);

  let option = null;
  if (product.color_id.option_id && product.color_id.option_id.name === "رنگ") {
    option = (
      <div className={classes.optionHolder}>
        <div
          className={classes.circle}
          style={{ backgroundColor: product.color_id.value }}
        ></div>
        <div className={classes.title}>{product.color_id.title}</div>
      </div>
    );
  } else {
    option = (
      <div className={classes.optionHolder}>
        <div className={classes.title}>{product.color_id.title}</div>
      </div>
    );
  }

  const minusQuantityHandler = () => {
    const newValue = value - 1;
    onUpdateBasket(newValue);
  };
  const plusQuantityHandler = () => {
    const newValue = value + 1;
    onUpdateBasket(newValue);
  };
  const onUpdateBasket = (quantity) => {
    setLoading(true);
    const token = authCtx.token;
    axios
      .put(`https://api.lariran.com/api/v1/basket/update/${product.id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          quantity: quantity,
        },
      })
      .then((response) => {
        setLoading(false);
        basketCtx.getBasket(true);
        // toast.success(response.data.data.basket);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const imgSrc = product.image ? product.image.address : null;

  let counter = (
    <div className={classes.counter}>
      <div
        onClick={() => plusQuantityHandler()}
        className={[classes.counterBtn, classes.plus].join(" ")}
      >
        {String.fromCharCode(43)}
      </div>
      <div className={classes.counterInput}>{value}</div>
      <div
        onClick={() => minusQuantityHandler()}
        className={[classes.counterBtn, classes.minus].join(" ")}
      >
        {String.fromCharCode(8722)}
      </div>
    </div>
  );
  if (loading) {
    counter = (
      <div
        style={{
          backgroundColor: "#eee",
          width: "105px",
          height: "35px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.item}>
      <div className={classes.right}>
        <Link
          href={"/product/" + product.product_id + "/" + product.slug}
          className={classes.imgHolder}
        >
          <Image
            width={130}
            height={130}
            src={"https://api.lariran.com/" + imgSrc}
            alt={product.title}
          ></Image>
        </Link>
        <div className={classes.counterHolder}>{counter}</div>
      </div>
      <div className={classes.left}>
        <div className={classes.name}>{product.persian_title}</div>
        {option}
        <div className={classes.price}>
          <div className={classes.showPrice}>
            <div>{product.show_price}</div>
            <div>{product.percent + "%"}</div>
          </div>
          <div className={classes.realPrice}>{product.price + " تومان "}</div>
        </div>
      </div>
    </div>
  );
}
