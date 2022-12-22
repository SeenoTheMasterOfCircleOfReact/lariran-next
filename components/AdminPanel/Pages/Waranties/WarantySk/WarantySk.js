import React from "react";

import classes from "../Waranty/Waranty.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function WarantySk({}) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        <div className={classes.title}>
          <Skeleton variant="text" sx={{ fontSize: ".9rem" }} width="70%" />
        </div>
      </div>
      <div className={classes.left}>
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
}
