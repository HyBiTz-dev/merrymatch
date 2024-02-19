import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/zoom";

import { EffectCoverflow } from "swiper/modules";
import Button from "./Button";
import ProfileModal from "../components/Modal/ProfileModal";
import SwipeProfileImages from "./SwipeProfileImages";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";

export default function SwipeCard() {
  const swiperRef = useRef();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [match, setMatch] = useState([]);
  const [profileData, setProfileData] = useState({});

  const { state, setCurrentChat } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const openModal = (item) => {
    setProfileData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickChat = async (userId) => {
    const result = await axios.get(
      `http://localhost:3000/conversation/${userId}`
    );
    if (result.data.conversation.length === 0) {
      const data = await axios.post(`http://localhost:3000/conversation/`, {
        sender_id: state?.id,
        receiver_id: userId,
      });
      setCurrentChat(data.data.data[0]);
      navigate(`/messages/${data.data.data[0].id}`);
    } else {
      setCurrentChat(result.data.conversation[0]);
      navigate(`/messages/${result.data.conversation[0].id}`);
    }
  };

  const handleHeartButton = async (receivedIds) => {
    await axios.post("http://localhost:3000/merrylist", {
      user_id: state?.id,
      receivedIds,
    });

    const result = await axios.get(
      `http://localhost:3000/merrylist/${state?.id}`
    );

    const isMatch = result.data.matchedUser_ids.includes(receivedIds);

    if (isMatch) {
      setMatch(
        result.data.receivedUserProfile.data.filter(
          (item) => item.user_id === receivedIds
        )
      );
    } else {
      const result = users.filter((item) => item.user_id !== receivedIds);
      setUsers(result);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const result = await axios.get("http://localhost:3000/user");
      const matchUser = await axios.get(
        `http://localhost:3000/merrylist/${state?.id}`
      );
      const unMatchUser = result.data.filter(
        (item) =>
          item.role_name !== "Admin" &&
          state.id !== item.user_id &&
          !matchUser.data.received_ids.includes(item.user_id)
      );
      setUsers(unMatchUser);
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center gap-16 ">
      <ProfileModal
        isOpen={showModal}
        onClose={closeModal}
        profileData={profileData}
      />
      {match.length === 0 ? (
        <>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect={"coverflow"}
            grabCursor={false}
            loop={true}
            allowSlidePrev={false}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 150,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper pb-10 pt-10"
          >
            {users.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container relative">
                  <div className="w-[38.75rem] h-[38.75rem] overflow-hidden rounded-[2rem] bg-cover flex flex-col justify-end relative">
                    <SwipeProfileImages user={item.image_url} />
                    <div className="flex justify-between items-center py-14 pr-8 pl-10 bg-gradient-to-t from-[#390741] to-transparent rounded-b-[2rem] z-10">
                      <div className="flex justify-center items-center gap-4">
                        <span className="text-white text-headline3">
                          {item.name}{" "}
                          <span className="text-gray-400 text-headline3">
                            {item.age}
                          </span>
                        </span>
                        <img
                          src="images/eye.svg"
                          className="w-8 h-8 p-2 bg-white bg-opacity-20 shadow-nav rounded-full"
                          alt=""
                          role="button"
                          onClick={() => openModal(item)}
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
                      onClick={() => swiperRef.current.slideNext()}
                    />
                    <img
                      src="/images/match-button.svg"
                      height={110}
                      width={110}
                      role="button"
                      alt=""
                      onClick={() => handleHeartButton(item?.user_id, index)}
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
          {match.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <div className="w-[44.75rem] h-[44.75rem] rounded-[2rem] bg-cover flex flex-col justify-end relative overflow-hidden">
                  <img
                    src={item.image_url[0]}
                    className="absolute object-cover w-[44.75rem] h-[44.75rem]"
                  />
                  <div className="flex justify-between items-center py-14 pr-8 pl-10 bg-gradient-to-t from-[#390741] to-transparent rounded-b-[2rem] z-10">
                    <div className="flex flex-col justify-center items-center gap-14 absolute left-56 top-[22rem]">
                      <img src="/images/MerryMatch-Frame.png" alt="" />
                      <div>
                        <Button
                          secondary
                          onClick={() => handleClickChat(item.user_id)}
                        >
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
