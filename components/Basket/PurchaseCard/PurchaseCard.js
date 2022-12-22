import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./Card.module.scss";
import { useRouter } from "next/router";

export default function PurchaseCard({ total }) {
  const router = useRouter();

  function handleNavigateToCheckout() {
    router.push("/checkout");
  }

  return (
    <div className={classes.card}>
      <Card
        sx={{
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, mb: 2 }}
            color="text.secondary"
            gutterBottom
          >
            تکمیل خرید
          </Typography>
          <div className={classes.totalPrice}>
            <div>مبلغ قابل پرداخت :</div>
            <div>{total + " تومان "}</div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleNavigateToCheckout}>
            پرداخت
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
