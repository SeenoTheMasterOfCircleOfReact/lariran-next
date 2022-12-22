import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import classes from "./User.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Switch,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { LoadingButton } from "@mui/lab";
import Order from "./Order/Order";

export default function User({ user, getUsers, token }) {
  const [ordersOpen, setOrdersOpen] = useState(true);

  function handleTextToggle() {
    setTextOpen((prev) => !prev);
  }

  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
  }

  function handleUserToggle() {
    setUserOpen((prev) => !prev);
  }

  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <div className={classes.name}>{user.name}</div>
        <div className={classes.phone}>{user.phone_number}</div>
      </div>
      <div
        className={classes.bottom}
        onClick={() => setOrdersOpen((prev) => !prev)}
      >
        <div className={classes.title}>سفارشات</div>
        <div>{ordersOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      <div
        className={[
          classes.orders,
          ordersOpen ? classes.open : classes.close,
        ].join(" ")}
      >
        {user.orders.data.map((o) => (
          <Order key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}
