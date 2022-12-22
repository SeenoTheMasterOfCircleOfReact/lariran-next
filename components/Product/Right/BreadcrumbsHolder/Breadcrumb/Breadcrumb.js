import Link from "next/link";
import classes from "./breadcrumb.module.scss";

export default function Breadcrumb({ category, current }) {
  return (
    <div
      style={{
        fontWeight: current ? "500" : "400",
        // backgroundColor: current ? "#ffe4dd" : "#ddd",
        color: current ? "#d52901" : "#333",
        border: current ? "1px solid #d52901" : "1px solid #333",
        fontSize: "0.85rem",
        borderRadius: "40px",
        padding: "2px 10px",
      }}
      className={classes.breadcrumb}
    >
      {category.persian_name}
    </div>
  );
}
