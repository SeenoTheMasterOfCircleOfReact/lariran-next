import React from "react";
import classes from "./CircularLoading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoading() {
  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
}
