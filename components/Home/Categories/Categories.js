import React from "react";

import CategoryList from "./CategoryList";

import classes from "../../../styles/Home/Categories/categories.module.scss";

export default function Categories({ categories }) {
  return (
    <div className={classes.holder}>
      <div className={classes.border}>
        <div className={classes.right}>
          <h2 className={classes.title}>دسته بندی ها</h2>
        </div>
      </div>
      <CategoryList categories={categories} />
    </div>
  );
}
