import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/zoom";

import { EffectCoverflow } from "swiper/modules";
import Button from "./Button";
import ProfileModal from "../components/Modal/ProfileModal";
import SwipeProfileImages from "./SwipeProfileImages";

export default function SwipeCard() {
  const mockdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [match, setMatch] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const swiper = useSwiper();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center gap-16">
      <ProfileModal isOpen={showModal} onClose={closeModal} />
      {!match ? (
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={false}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 150,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper pb-10 pt-10"
          >
            {mockdata.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container relative">
                  <div className="w-[38.75rem] h-[38.75rem] overflow-hidden rounded-[2rem] bg-cover flex flex-col justify-end relative">
                    <SwipeProfileImages />
                    <div className="flex justify-between items-center py-14 pr-8 pl-10 bg-gradient-to-t from-[#390741] to-transparent rounded-b-[2rem] z-10">
                      <div className="flex justify-center items-center gap-4 ">
                        <span className="text-white text-headline3">
                          Danny{" "}
                          <span className="text-gray-400 text-headline3">
                            24
                          </span>
                        </span>
                        <img
                          src="images/eye.svg"
                          className="w-8 h-8 p-2 bg-white bg-opacity-20 shadow-nav rounded-full"
                          alt=""
                          role="button"
                          onClick={openModal}
                        />
                      </div>
                      <div className="flex justify-between gap-5">
                        <svg
                          className=" fill-gray-100"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => swiper.slidePrev()}
                        >
                          <path
                            d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                            fill="#9AA1B9"
                          />
                        </svg>
                        <svg
                          className="rotate-180 fill-gray-100"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          role="button"
                          onClick={() => swiper.slideNext()}
                        >
                          <path
                            d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                            fill="#9AA1B9"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex absolute z-50 -bottom-14 left-90">
                    <img
                      src="/images/cross-button.svg"
                      height={110}
                      width={110}
                      role="button"
                      alt=""
                    />
                    <img
                      src="/images/match-button.svg"
                      height={110}
                      width={110}
                      role="button"
                      alt=""
                      onClick={() => setMatch(true)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex gap-3 py-3 px-6">
            <span className="text-body2 text-gray-700">Merry limit today</span>
            <span className="text-body2 text-red-400">2/20</span>
          </div>
        </>
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={false}
          loop={true}
          zoom={false}
          allowTouchMove={false}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Zoom]}
          className="mySwiper"
        >
          {mockdata.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <div className="bg-[url('/images/matching-test.png')] w-[44.75rem] h-[44.75rem]  rounded-[2rem] bg-cover flex flex-col justify-end relative">
                  <div className="flex justify-between items-center py-14 pr-8 pl-10 bg-gradient-to-t from-[#390741] to-transparent rounded-b-[2rem]">
                    <div className="flex flex-col justify-center items-center gap-14 absolute left-56 top-[22rem]">
                      <img src="/images/MerryMatch-Frame.png" alt="" />
                      <div>
                        <Button secondary onClick={() => setMatch(false)}>
                          Start Conversation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
