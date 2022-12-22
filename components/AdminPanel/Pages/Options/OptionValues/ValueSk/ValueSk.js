import React from "react";

import classes from "./ValueSk.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function ValueSk({}) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        <div className={classes.title}>
          <Skeleton variant="text" sx={{ fontSize: ".9rem" }} width="40px" />
        </div>
        <div className={classes.value}>
          <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} width="100px" />
        </div>
      </div>
      <div className={classes.left}>
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
}
