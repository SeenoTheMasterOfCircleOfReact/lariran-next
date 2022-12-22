import React from "react";
import Skeleton from "@mui/material/Skeleton";

import classes from "./LikeSkeleton.module.scss";

export default function LikeSkeleton() {
  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <div className={classes.image}>
          <Skeleton variant="rounded" width={100} height={100} />
        </div>
        <div className={classes.details}>
          <Skeleton variant="text" sx={{ fontSize: ".9rem" }} width={120} />
          <Skeleton variant="text" sx={{ fontSize: ".8rem" }} width={70} />
        </div>
      </div>
      <div className={classes.bottom}>
        <Skeleton variant="rounded" sx={{ width: "100%", height: "36.5px" }} />
      </div>
    </div>
  );
}
