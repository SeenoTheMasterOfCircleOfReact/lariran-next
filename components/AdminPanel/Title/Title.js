import React from "react";

import classes from "./Title.module.scss";

export default function Title({ title }) {
  return <h1 className={classes.title}>{title}</h1>;
}
