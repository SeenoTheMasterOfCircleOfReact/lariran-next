import Image from "next/image";
import Link from "next/link";

import classes from "./Product.module.scss";

export default function Product({ product }) {
  let name =
    product.persian_title.length > 45
      ? product.persian_title.slice(0, 45) + "..."
      : product.persian_title;

  return (
    <Link
      className={classes.product}
      href={`/product/${product.id}/${product.persian_title}`}
    >
      <div className={classes.imageHolder}>
        <Image
          src={"https://api.lariran.com" + product.image}
          width={200}
          height={200}
          alt={product.persian_title}
        />
      </div>
      <h3 className={classes.name}>{name}</h3>
      {product.stock > 0 ? (
        <div className={classes.price}>
          <div className={classes.top}>
            <div className={classes.realPrice}>{product.price + " تومان "}</div>
            <div className={classes.percentage}>{"%" + product.percent}</div>
          </div>
          <div className={classes.showPrice}>{product.show_price}</div>
        </div>
      ) : (
        <div className={classes.outOfStock}>
          <span className={classes.line}></span>
          <span className={classes.text}>ناموجود</span>
          <span className={classes.line}></span>
        </div>
      )}
    </Link>
  );
}
