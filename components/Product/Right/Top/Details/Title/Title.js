import React from "react";

import classes from "./title.module.scss";

export default function Title({ title, persianTitle }) {
  return (
    <div className={classes.title}>
      <h1 className={classes.titlePersian}>{persianTitle}</h1>
      <div className={classes.titleEnglish}>
        <span>{title}</span>
        <div className={classes.line}></div>
      </div>
    </div>
  );
}
