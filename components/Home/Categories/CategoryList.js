import React from "react";

import Category from "./Category";

import classes from "../../../styles/Home/Categories/categoryList.module.scss";

export default function CategoryList({ categories }) {
  return (
    <div className={classes.holder}>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
