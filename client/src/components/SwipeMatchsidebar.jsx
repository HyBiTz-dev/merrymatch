import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function SwipeMatchsidebar() {
  return (
    <div>
      <Swiper spaceBetween={-155} slidesPerView={"auto"} className="mySwiper">
        <SwiperSlide>
          <img src="/images/test-match.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/test-match2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/test-match2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/test-match2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/test-match2.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
