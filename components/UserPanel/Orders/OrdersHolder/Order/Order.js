import React from "react";
import classes from "./Order.module.scss";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import Image from "next/image";

export default function Order({ order }) {
  let icon = null;
  if (order.status.id === 100) {
    icon = <HourglassBottomIcon sx={{ color: "#FFA500" }} />;
  } else if (order.status.id === 0) {
    icon = <CancelIcon sx={{ color: "#EB5353" }} />;
  } else if (order.status.id === 1) {
    icon = <CreditScoreIcon sx={{ color: "#14C38E" }} />;
  } else if (order.status.id === 2) {
    icon = <InventoryIcon sx={{ color: "#34B3F1" }} />;
  } else if (order.status.id === 3) {
    icon = <LocalShippingIcon sx={{ color: "#0E3EDA" }} />;
  } else if (order.status.id === -1) {
    icon = <AssignmentReturnedIcon sx={{ color: "#E15FED" }} />;
  }

  let trackingCode = "_";
  if (order.tracking_code) {
    trackingCode = order.tracking_code;
  }

  const products = order.products.map((product) => {
    const img = "https://api.lariran.com" + product.image;

    return (
      <Link
        href={`/product/${product.id}/${product.slug}`}
        className={classes.Product}
        key={product.id}
      >
        <Image
          src={img}
          alt={product.persian_title}
          width={40}
          height={40}
        ></Image>
      </Link>
    );
  });
  return (
    <div className={classes.Order}>
      <Link href={"" + order.id} className={classes.Top}>
        <div className={classes.Status}>
          <div>
            {icon}
            <span>{order.status.name}</span>
          </div>
          <div>
            <ArrowBackIosIcon sx={{ fontSize: ".9rem" }} />
          </div>
        </div>
        <div className={classes.Details}>
          <div>
            <span
              className={classes.Small}
              style={{
                fontWeight: "500",
              }}
            >
              {order.created_at}
            </span>
          </div>
          <div>
            <span className={classes.Small}>کد رهگیری:</span>
            <span className={classes.Bold}>{" " + trackingCode + " "}</span>
          </div>
          <div>
            <span className={classes.Small}>قیمت :</span>
            <span className={classes.Bold}>
              {" " + order.amount + " تومان "}
            </span>
          </div>
        </div>
      </Link>
      <div className={classes.Images}>{products}</div>
    </div>
  );
}
