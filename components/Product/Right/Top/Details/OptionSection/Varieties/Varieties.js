import React from "react";
import Colors from "./Colors/Colors";

import classes from "./varieties.module.scss";

export default function Varieties({
  option,
  varieties,
  variety,
  selectVariety,
}) {
  return (
    <div className={classes.varieties}>
      {option === "رنگ" && (
        <Colors
          colors={varieties}
          variety={variety}
          selectColor={selectVariety}
        />
      )}
    </div>
  );
}
