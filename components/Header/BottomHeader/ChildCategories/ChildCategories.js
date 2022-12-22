import React from "react";
import Child from "./Child/Child";

import classes from "./ChildCategories.module.scss";

export default function ChildCategories({ categories, width }) {
  return (
    <div
      className={classes.child}
      style={{
        width: width + "px",
      }}
    >
      {categories.map((c) => (
        <Child key={c.id} category={c} />
      ))}
    </div>
  );
}
