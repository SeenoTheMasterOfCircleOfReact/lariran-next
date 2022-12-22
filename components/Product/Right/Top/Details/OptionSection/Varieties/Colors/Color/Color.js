import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Tooltip from "@mui/material/Tooltip";

import classes from "./color.module.scss";

export default function Color({ color, variety, selectColor }) {
  const selected = variety?.id === color?.id;
  const colorStyles = {
    width: "32px",
    height: "32px",
    borderRadius: "inherit",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: selected ? "#fff" : "#888",
    backgroundColor: color?.color_id?.value,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Tooltip title={color?.color_id?.title} arrow>
      <div
        className={classes.holder}
        style={{ backgroundColor: selected ? "#19bfd3" : "#fff" }}
        onClick={() => selectColor(color)}
      >
        <div style={colorStyles}>
          {selected && (
            <DoneRoundedIcon
              style={{ color: "#fff", mixBlendMode: "difference" }}
            />
          )}
        </div>
      </div>
    </Tooltip>
  );
}
