import React from "react";
import classes from "./OrderSkeleton.module.scss";
import Skeleton from "@mui/material/Skeleton";

export default function OrderSkeleton() {
  return (
    <div className={classes.skeleton}>
      <div className={classes.top}>
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", mb: "10px" }}
          width={80}
        />
        <Skeleton variant="text" sx={{ fontSize: ".6rem" }} width={380} />
      </div>
      <div className={classes.holder}>
        <Skeleton variant="rounded" width={50} height={50} />
      </div>
    </div>
  );
}
