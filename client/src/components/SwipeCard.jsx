import { Swiper, SwiperSlide } from "swiper/react";
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
                      <div className="flex justify-center items-center gap-4">
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
          modules={[EffectCoverflow]}
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
