import React from "react";

import classes from "./title.module.scss";

export default function Title({ option, variety }) {
  return (
    <div className={classes.title}>
      {option + ": " + variety?.color_id?.title}
    </div>
  );
}
