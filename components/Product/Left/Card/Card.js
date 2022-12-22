import React from "react";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

import Top from "./Top/Top";

import classes from "./card.module.scss";

export default function Card({ product, variety }) {
  return (
    <div className={classes.card}>
      {variety && (
        <div>
          <Top product={product} variety={variety} />
          <div className={classes.guarantee}>
            <GppGoodOutlinedIcon />
            <span
              style={{
                fontWeight: "400",
              }}
            >
              {variety?.waranty_id?.name}
            </span>
          </div>
          <div
            style={{
              fontSize: ".8rem",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ textDecoration: "line-through", color: "#555" }}>
                {variety?.show_price}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#d52901",
                  fontWeight: "800",
                }}
              >
                {"%" + variety?.percent}
              </span>
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: "700" }}>
              {variety?.price + " تومان "}
            </div>
          </div>
          <div className={classes.btn}>افزودن به سبد خرید</div>
        </div>
      )}
      {!variety && (
        <div className={classes.outOfStock}>
          <div className={classes.top}>
            <div className={classes.line}></div>
            <div className={classes.title}>ناموجود</div>
            <div className={classes.line}></div>
          </div>
          <div className={classes.bottom}>
            محصول مورد نظر درحال حاضر موجود نیست
          </div>
        </div>
      )}
    </div>
  );
}
