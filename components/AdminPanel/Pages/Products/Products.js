import React from "react";

import Product from "./Product/Product";
import AlertBg from "../../../UI/AlertBg/AlertBg";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";

import ErrorIcon from "@mui/icons-material/Error";

import classes from "./Products.module.scss";

export default function Products({ products, loading, error, getProducts }) {
  if (error) {
    return (
      <div className={classes.error}>
        <AlertBg
          refresh
          onRefresh={getProducts}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularLoading />
      </div>
    );
  }

  return (
    <div className={classes.holder}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
