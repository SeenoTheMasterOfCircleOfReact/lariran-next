import React from "react";

import classes from "../Attribute/Attribute.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function AttrSk({}) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        <div className={classes.title}>
          <Skeleton variant="text" sx={{ fontSize: ".9rem" }} width="50%" />
        </div>
      </div>
      <div className={classes.left}>
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
}
