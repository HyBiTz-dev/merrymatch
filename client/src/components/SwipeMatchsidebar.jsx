import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authentication";

import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/socketContext";

export default function SwipeMatchsidebar({ matching }) {
  const { state } = useAuth();
  const [merryList, setMerryList] = useState([]);
  const navigate = useNavigate();
  const { setCurrentChat, notifications } = useSocket();

  const handleClickChat = async (userId) => {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_BASE_ENDPOINT}/conversation/${userId}`
    );
    const hasCoversation = result.data.conversation.filter(
      (item) => item.receiver_id === state?.id || item.sender_id === state?.id
    );

    if (hasCoversation.length === 0) {
      const data = await axios.post(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/conversation/`,
        {
          sender_id: state?.id,
          receiver_id: userId,
        }
      );
      setCurrentChat(data.data.data[0]);
      navigate(`/messages/${data.data.data[0].id}`);
    } else {
      setCurrentChat(hasCoversation[0]);
      navigate(`/messages/${hasCoversation[0].id}`);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/merrylist/${state?.id}`
      );
      const Matchlist = result.data.receivedUserProfile.data.filter((item) =>
        result.data.matchedUser_ids.includes(item.user_id)
      );
      setMerryList(Matchlist);
    };
    getData();
  }, [notifications, matching]);
  return (
    <div>
      <Swiper
        spaceBetween={-155}
        slidesPerView={"auto"}
        className="mySwiper relative"
      >
        {merryList.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="cursor-pointer"
              onClick={() => handleClickChat(item.user_id)}
            >
              <img
                src={item?.image_url[0]}
                alt=""
                className="w-[6.25rem] h-[6.25rem] rounded-3xl object-cover "
              />
              <svg
                className="fill-red-400 stroke-[3px] absolute z-10 bottom-0 left-16"
                width="34"
                height="20"
                viewBox="0 0 62 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4665 31.3085L20.4759 31.3135L20.4939 31.3243L20.524 31.3393C20.8568 31.5122 21.2265 31.6023 21.6017 31.6017C21.8868 31.6013 22.1686 31.5486 22.4333 31.447H22.5017L22.7242 31.3135L22.7335 31.3085L22.7406 31.3048L22.7476 31.301C25.2087 29.9551 27.524 28.3584 29.6566 26.5363L29.6599 26.5334C33.0114 23.6443 37 19.1006 37 13.5V13.4999C36.9998 11.6181 36.4163 9.78271 35.3298 8.24634C34.2432 6.70997 32.7071 5.54822 30.9329 4.92105C29.1588 4.29388 27.2338 4.23214 25.4231 4.74434C23.983 5.15169 22.6716 5.90613 21.6 6.93416C20.5285 5.90613 19.217 5.15169 17.7769 4.74434C15.9662 4.23214 14.0413 4.29388 12.2671 4.92105C10.4929 5.54822 8.95681 6.70997 7.87027 8.24634C6.78373 9.78271 6.20019 11.6181 6.20001 13.4999V13.5C6.20001 19.1007 10.1906 23.6445 13.5399 26.5332L13.5433 26.5362C15.0442 27.8188 16.6364 28.9905 18.3074 30.042C19.0092 30.4851 19.7252 30.9053 20.4543 31.302L20.4542 31.3021L20.4665 31.3085Z"
                  stroke="white"
                />
                <path
                  d="M42.0665 31.3085L42.0759 31.3135L42.0939 31.3243L42.124 31.3393C42.4568 31.5122 42.8265 31.6023 43.2017 31.6017C43.4868 31.6013 43.7686 31.5486 44.0333 31.447H44.1017L44.3241 31.3135L44.3335 31.3085L44.3406 31.3048L44.3476 31.301C46.8087 29.9551 49.124 28.3584 51.2566 26.5363L51.2599 26.5334C54.6114 23.6443 58.6 19.1006 58.6 13.5V13.4999C58.5998 11.6181 58.0163 9.78271 56.9297 8.24634C55.8432 6.70997 54.3071 5.54822 52.5329 4.92105C50.7588 4.29388 48.8338 4.23214 47.0231 4.74434C45.583 5.15169 44.2715 5.90613 43.2 6.93416C42.1285 5.90613 40.817 5.15169 39.3769 4.74434C37.5662 4.23214 35.6412 4.29388 33.8671 4.92105C32.0929 5.54822 30.5568 6.70997 29.4703 8.24634C28.3837 9.78271 27.8002 11.6181 27.8 13.4999V13.5C27.8 19.1007 31.7906 23.6445 35.1399 26.5332L35.1433 26.5362C36.6442 27.8188 38.2364 28.9905 39.9074 30.042C40.6092 30.4851 41.3252 30.9053 42.0543 31.302L42.0542 31.3021L42.0665 31.3085Z"
                  stroke="white"
                />
              </svg>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
