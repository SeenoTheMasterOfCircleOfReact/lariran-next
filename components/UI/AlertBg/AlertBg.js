import React from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import Button from "@mui/material/Button";

import classes from "./AlertBg.module.scss";

export default function AlertBg({ refresh, onRefresh, color, title, icon }) {
  const alertClass = [classes.holder];
  if (color === "red") {
    alertClass.push(classes.error);
  } else if (color === "green") {
    alertClass.push(classes.green);
  }

  return (
    <div className={alertClass.join(" ")}>
      <div className={classes.title}>
        {icon}
        <h1>{title}</h1>
      </div>
      {refresh && (
        <Button variant="text" color="white" onClick={onRefresh}>
          <RefreshRoundedIcon sx={{ fontSize: "70px" }} color="main" />
        </Button>
      )}
    </div>
  );
}
