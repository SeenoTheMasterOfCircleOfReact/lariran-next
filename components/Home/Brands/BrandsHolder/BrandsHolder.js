import classes from "../../../../styles/Home/brandsHolder.module.scss";

import Brand from "./Brand/Brand";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Holder({ brands }) {
  return (
    <div className={classes.holder}>
      <Swiper
        dir="rtl"
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="brandsSwiper"
      >
        {brands.map((brand) => (
          <SwiperSlide
            key={brand.id}
            style={{
              width: "120px",
            }}
          >
            <Brand brand={brand} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
