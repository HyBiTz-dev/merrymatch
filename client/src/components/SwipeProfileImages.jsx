import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Mousewheel, Navigation } from "swiper/modules";

export default function SwipeProfileImages() {
  return (
    <div className="absolute  w-[38.75rem] h-[38.75rem]">
      <Swiper
        allowTouchMove={false}
        mousewheel={true}
        navigation={{
          nextEl: "#next",
          prevEl: "#prev",
        }}
        modules={[Mousewheel, Navigation]}
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
      <div className="flex justify-between gap-5 absolute z-50 bottom-[4.2rem] right-10">
        <svg
          id="prev"
          className=" fill-gray-100"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
            fill="#9AA1B9"
          />
        </svg>
        <svg
          id="next"
          className="rotate-180 fill-gray-100"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="button"
        >
          <path
            d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
            fill="#9AA1B9"
          />
        </svg>
      </div>
    </div>
  );
}
