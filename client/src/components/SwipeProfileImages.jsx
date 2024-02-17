import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Mousewheel, Navigation } from "swiper/modules";

export default function SwipeProfileImages({ prevClick, nextClick }) {
  return (
    <div className="absolute w-[38.75rem] h-[38.75rem]">
      <Swiper
        allowTouchMove={false}
        mousewheel={true}
        navigation={false}
        modules={[Mousewheel]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="/images/matching-test.png"
            alt=""
            className="w-[38.75rem] h-[38.75rem] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/matching-test.png"
            alt=""
            className="w-[38.75rem] h-[38.75rem] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/matching-test.png"
            alt=""
            className="w-[38.75rem] h-[38.75rem] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/matching-test.png"
            alt=""
            className="w-[38.75rem] h-[38.75rem] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/matching-test.png"
            alt=""
            className="w-[38.75rem] h-[38.75rem] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
