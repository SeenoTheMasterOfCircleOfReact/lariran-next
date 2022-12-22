import { useState, useEffect, forwardRef } from "react";

import classes from "./Order.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  AppBar,
  Dialog,
  IconButton,
  Paper,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import OrderDetail from "../OrderDetail/OrderDetail";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Order({
  order,
  getOrders,
  token,
  search,
  status,
  from,
  to,
}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDialog = (dialog) => {
    setOpen(dialog);
  };

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
  } else if (order.status.id === 10) {
    icon = <RefreshIcon sx={{ color: "#ccc" }} />;
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
        <img
          src={img}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
          }}
          alt={product.title}
        ></img>
      </Link>
    );
  });

  return (
    <>
      <Paper className={classes.Order} onClick={() => handleDialog(true)}>
        <div className={classes.Top}>
          <div className={classes.Status}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                className={classes.bold}
                style={{
                  fontWeight: "600",
                }}
              >
                {order.id}
              </span>
            </div>
            <div>
              <span className={classes.Small}>سفارش دهنده :</span>
              <span className={classes.Bold}>
                {" " + order.user.name + " "}
              </span>
            </div>
            <div>
              <span className={classes.Small}>مقصد :</span>
              <span className={classes.Bold}>
                {" " + order.shiping.city.name + " "}
              </span>
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
              <span className={classes.Small}>کد رهگیری :</span>
              <span className={classes.Bold}>{" " + trackingCode + " "}</span>
            </div>
            <div>
              <span className={classes.Small}>قیمت :</span>
              <span className={classes.Bold}>
                {" " + order.amount + " تومان "}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.Images}>{products}</div>
      </Paper>
      <Dialog
        open={open}
        onClose={() => handleDialog(false)}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xl"
        style={{
          width: "100%",
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{
                ml: 2,
                flex: 1,
                mr: 2,
                fontFamily: "inherit",
                textAlign: "left",
              }}
              variant="h6"
              component="div"
            >
              جزئیات سفارش
            </Typography>
          </Toolbar>
        </AppBar>
        <OrderDetail
          order={order}
          action={true}
          tab={status}
          search={search}
          from={from}
          to={to}
          getOrders={getOrders}
        />
      </Dialog>
    </>
  );
}
