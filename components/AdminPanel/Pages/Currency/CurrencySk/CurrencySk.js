import React from "react";

import classes from "../CurrencyItem/CurrencyItem.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function CurrencySk({}) {
  return (
    <div className={classes.holder}>
      <div className={classes.right}>
        <div className={classes.title}>
          <Skeleton variant="text" sx={{ fontSize: ".9rem" }} width="30px" />
        </div>
        <div className={classes.bottom}>
          <div className={classes.value}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.1rem" }}
              width="100px"
            />
          </div>
        </div>
      </div>
      <div className={classes.left}>
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
}
