import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import classes from "./actions.module.scss";

export default function Actions() {
  return (
    <div className={classes.actions}>
      <div
        style={{
          cursor: "pointer",
        }}
      >
        <FavoriteBorderIcon />
      </div>
      <div
        style={{
          cursor: "pointer",
        }}
      >
        <ShareOutlinedIcon />
      </div>
      <div
        style={{
          cursor: "pointer",
        }}
      >
        <ContentCopyOutlinedIcon />
      </div>
    </div>
  );
}
