import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import classes from "../../../styles/Home/Products/products.module.scss";
import Product from "./Product/Product";

export default function Products({ type, products }) {
  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <div className={classes.label}>
          <div className={classes.inner}>{type}</div>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.right}>
          <span className={classes.mainTitle}>
            {type === "HOT" ? "پرفروش" : "جدید"}
          </span>
          <br></br>
          <span className={classes.restTitle}>ترین ها</span>
        </div>
        <div className={classes.left}>
          <Swiper
            dir="rtl"
            slidesPerView={"auto"}
            spaceBetween={3}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="newSwiper"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                style={{
                  width: "150px",
                }}
              >
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
