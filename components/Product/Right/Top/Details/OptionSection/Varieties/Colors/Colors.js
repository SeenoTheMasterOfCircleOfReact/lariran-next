import React from "react";
import Color from "./Color/Color";

import classes from "./colors.module.scss";

export default function Colors({ colors, variety, selectColor }) {
  return (
    <div className={classes.colors}>
      {colors.map((color) => (
        <Color
          key={color.id}
          color={color}
          variety={variety}
          selectColor={selectColor}
        />
      ))}
    </div>
  );
}
