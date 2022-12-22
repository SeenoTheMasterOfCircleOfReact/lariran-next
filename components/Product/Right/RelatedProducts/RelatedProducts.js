import classes from "./relatedProducts.module.scss";

import Product from "../../../Home/Products/Product/Product";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RelatedProducts({ related }) {
  return (
    <div className={classes.holder}>
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
        {related.map((product) => (
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
  );
}
