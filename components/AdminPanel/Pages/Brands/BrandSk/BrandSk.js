import React from "react";

import classes from "../Brand/Brand.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function BrandSk({}) {
  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <div className={classes.item}>
          <div className={classes.data}>
            <div className={classes.right}>
              <Skeleton variant="rectangular" width="50px" height="50px" />
            </div>
            <div className={classes.left}>
              <div className={classes.name}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: ".9rem" }}
                  width="30%"
                />
              </div>
              <div className={classes.persianName}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.1rem" }}
                  width="50%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Skeleton variant="circular" width="24px" height="24px" />
          <Skeleton variant="circular" width="24px" height="24px" />
        </div>
      </div>
      <div className={classes.bottom}>
        <Skeleton
          variant="rounded"
          width="40px"
          height="20px"
          sx={{ margin: "10px" }}
        />
      </div>
    </div>
  );
}
