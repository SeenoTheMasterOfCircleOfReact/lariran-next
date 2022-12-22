import { useState, useEffect, forwardRef } from "react";

import classes from "./Order.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import OrderDetail from "../../../Orders/OrdersHolder/OrderDetail/OrderDetail";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Order({ order }) {
  const [open, setOpen] = useState(false);

  function handleDialog(state) {
    setOpen(state);
  }

  return (
    <>
      <div className={classes.holder} onClick={() => handleDialog(true)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "10px",
          }}
        >
          <div className={classes.number}>
            <div className={classes.small}>شماره سفارش : </div>
            <div className={classes.bold}>{order.id}</div>
          </div>
          <div className={classes.date}>
            <div className={classes.small}>تاریخ : </div>
            <div className={classes.bold}>{order.created_at}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "10px",
          }}
        >
          <div className={classes.price}>
            <div className={classes.small}>قیمت : </div>
            <div className={classes.bold}>{order.amount + " تومان "}</div>
          </div>
          <div className={classes.price}>
            <div className={classes.small}>بدون هزینه ارسال : </div>
            <div className={classes.bold}>
              {order.amount_without_shipping_price + " تومان "}
            </div>
          </div>
        </div>
      </div>
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
          action={false}
          tab={null}
          search={null}
          from={null}
          to={null}
        />
      </Dialog>
    </>
  );
}
