import classes from "../../../styles/Home/hero.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCreative } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function Hero({ slides }) {
  const carouselItems = slides.map((slider) => {
    let src = "https://api.lariran.com" + slider.image;
    return (
      <SwiperSlide key={slider.id}>
        <a
          href={slider.link}
          target="_blank"
          rel="noreferrer"
          className={classes.link}
        >
          <div
            className={classes.holder}
            style={slider.color ? { backgroundColor: slider.color } : {}}
          >
            <img className={classes.image} src={src} alt={slider.persianName} />
          </div>
        </a>
      </SwiperSlide>
    );
  });

  return (
    <div className={classes.hero} dir="ltr">
      <Swiper
        dir="rtl"
        effect={"creative"}
        loop={true}
        navigation={true}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[Autoplay, Navigation, Pagination, EffectCreative]}
        className="heroSwiper"
      >
        {carouselItems}
      </Swiper>
    </div>
  );
}
