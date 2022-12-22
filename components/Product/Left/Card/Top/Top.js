import Image from "next/image";
import React from "react";

import classes from "./top.module.scss";

export default function Top({ product, variety }) {
  const src = product?.images[0]?.address;

  return (
    <div className={classes.top}>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <div>
          {src && (
            <Image
              src={src}
              width="100"
              height="100"
              alt={product?.persian_title}
            />
          )}
        </div>
        <div
          style={{
            padding: "10px 0",
          }}
        >
          <div
            style={{
              fontSize: ".8rem",
            }}
          >
            {product?.persian_title}
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: variety?.color_id?.value,
                width: "25px",
                height: "25px",
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                fontSize: ".8rem",
              }}
            >
              {variety?.color_id?.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
