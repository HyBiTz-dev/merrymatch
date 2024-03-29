import Tooltip from "./Tooltip";
import { useAuth } from "../context/authentication";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import ProfileModal from "../components/Modal/ProfileModal";
import { useMerryLimit } from "../context/merryLimitContext";

function MerryCard() {
  const [merryList, setMerryList] = useState(null);
  const { state } = useAuth();
  const user_id = state?.id;
  const [matchedUserList, setMatchedUserList] = useState(null);
  const [merryUserList, setMerryUserList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const { setCurrentChat } = useSocket();
  const [userLikeDateList, setUserLikeDateList] = useState();
  const { dailyLimit, setDailyLimit, maxMerryLimit } = useMerryLimit();

  const openModal = (item) => {
    setProfileData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/merrylist/${user_id}`
      );
      const receivedUserData = response.data.receivedUserProfile.data;
      const matchedUserData = response.data.matchedUser_ids;
      const likeUserData = response.data.received_ids;
      const matchedIdsWithTime = response.data.data;

      const mergedAndSortedData = receivedUserData
        .map((item1) => {
          const matchTimeItem = matchedIdsWithTime.find(
            (item2) => item2.user_profile_id_received === item1.user_id
          );
          item1.matchedTime = matchTimeItem ? matchTimeItem.created_at : null;
          return item1;
        })
        .sort((a, b) => new Date(b.matchedTime) - new Date(a.matchedTime));

      setMerryList(mergedAndSortedData);
      setMatchedUserList(matchedUserData);
      setMerryUserList(likeUserData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleMerry = async (receivedIds) => {
    try {
      if (!merryUserList.includes(receivedIds)) {
        if (dailyLimit < maxMerryLimit) {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_ENDPOINT}/merrylist/`,
            {
              user_id: state?.id,
              receivedIds,
            }
          );
          if (response.status === 200) {
            setMerryUserList([...merryUserList, receivedIds]);
          }
          setDailyLimit(dailyLimit + 1);
        }
      } else {
        const result = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_ENDPOINT
          }/conversation/${receivedIds}`
        );
        const hasConversation = result.data.conversation.filter(
          (item) =>
            item.receiver_id === state?.id || item.sender_id === state?.id
        );
        if (hasConversation.length !== 0) {
          const chatId = hasConversation[0].id;
          const response = await axios.delete(
            `${
              import.meta.env.VITE_APP_BASE_ENDPOINT
            }/merrylist/${user_id}/delete`,
            { params: { receivedIds, chatId } }
          );
          if (response.status === 200) {
            setMerryUserList(merryUserList.filter((id) => id !== receivedIds));
          }
        } else {
          const response = await axios.delete(
            `${
              import.meta.env.VITE_APP_BASE_ENDPOINT
            }/merrylist/${user_id}/delete`,
            { params: { receivedIds } }
          );
          if (response.status === 200) {
            setMerryUserList(merryUserList.filter((id) => id !== receivedIds));
          }
        }
      }
    } catch (error) {
      console.error("Error toggling merry status:", error);
    }
  };

  const handleClickChat = async (userId) => {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_BASE_ENDPOINT}/conversation/${userId}`
    );
    const hasConversation = result.data.conversation.filter(
      (item) => item.receiver_id === state?.id || item.sender_id === state?.id
    );

    if (hasConversation.length === 0) {
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
      setCurrentChat(hasConversation[0]);
      navigate(`/messages/${hasConversation[0].id}`);
    }
  };

  useEffect(() => {
    const now = new Date().toISOString();
    const date = now.split("T")[0];
    const fetchMerryToday = async (date) => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_BASE_ENDPOINT
          }/merrylist/${user_id}/merrytoday`,
          {
            today: date,
          }
        );
        setUserLikeDateList(response.data.merryTodayList);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchMerryToday(date);
  }, []);

  const renderList = merryList
    ? merryList.map((user, index) => {
        const isMatched = matchedUserList.includes(user?.user_id);
        const isMerry = merryUserList.includes(user?.user_id);
        const isMerryToday = userLikeDateList.includes(user?.user_id);

        return (
          <div className="flex flex-col items-center " key={index}>
            <div className="w-[62.5rem] h-[15.625rem] bg-main flex items-center justify-between border-b-2 border-gray-300">
              <div className="flex gap-10">
                <ProfileModal
                  isOpen={showModal}
                  onClose={closeModal}
                  profileData={profileData}
                />
                <div className="relative h-fit">
                  <img
                    src={user.image_url[0]}
                    className="w-[200px] h-[200px] rounded-3xl object-cover"
                  ></img>
                  {isMerryToday && (
                    <p className="absolute bottom-0 left-0 bg-purple-100 text-purple-600 rounded-bl-3xl rounded-tr-3xl text-body5 w-20 text-center">
                      Merry today
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <h4 className="text-headline4 inline text-gray-900">
                      {user.name}
                    </h4>
                    <h4 className="text-headline4 inline text-gray-700">
                      {user.age}
                    </h4>
                    <img
                      src="/images/pin.svg"
                      className="inline w-[4%] ml-2"
                    ></img>
                    <p className="text-body4 inline text-gray-700">
                      {user.city_name}, {user.country_name}
                    </p>
                  </div>
                  <div className="grid  grid-cols-[170px_minmax(160px,_1fr)_80px] gap-3">
                    <span className="text-body2 text-gray-900  ">
                      Sexual identities
                    </span>
                    <span className="text-body2 text-gray-700 ">
                      {user.gender_name}
                    </span>
                    <br />
                    <span className="text-body2 text-gray-900 ">
                      Sexual preferences
                    </span>
                    <span className="text-body2 text-gray-700 ">
                      {user.gender_interest_name}
                    </span>
                    <br />
                    <span className="text-body2 text-gray-900 ">
                      Racial preferences
                    </span>
                    <span className="text-body2 text-gray-700 ">
                      {user.racial_name}
                    </span>
                    <br />
                    <span className="text-body2 text-gray-900 ">
                      Meeting interests
                    </span>
                    <span className="text-body2 text-gray-700 ">
                      {user.relation_interest_name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-end">
                {isMatched && (
                  <div className="w-40 h-8 relative border-red-500 border-2 rounded-full">
                    <img
                      src="/images/merry-match.svg"
                      className="absolute top-2 left-3"
                    ></img>
                    <p className="text-body3 text-red-500 text-center font-extrabold ml-5 mt-0.5">
                      Merry Match!
                    </p>
                  </div>
                )}
                {!isMatched && (
                  <div className="w-40 h-8 relative border-gray-500 border-2 rounded-full">
                    <p className="text-body3 text-gray-700 text-center font-extrabold mt-0.5">
                      Not Match Yet
                    </p>
                  </div>
                )}
                <div className="flex gap-4">
                  {isMatched ? (
                    <Tooltip
                      gray
                      text="Go to chat"
                      img="/images/chat.svg"
                      onClick={() => {
                        handleClickChat(user.user_id);
                      }}
                    />
                  ) : null}
                  <Tooltip
                    gray
                    text="See profile"
                    img="/images/Frame.svg"
                    onClick={() => {
                      openModal(user);
                    }}
                  />
                  {isMerry && (
                    <Tooltip
                      merryRed
                      text="Unmerry"
                      img="/images/merry-white.svg"
                      imgHover="/images/merry-red.svg"
                      onClick={() => toggleMerry(user.user_id)}
                    />
                  )}
                  {!isMerry && (
                    <Tooltip
                      merryWhite
                      text="Merry"
                      img="/images/merry-red.svg"
                      imgHover="/images/merry-white.svg"
                      onClick={() => toggleMerry(user.user_id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })
    : null;

  return renderList;
}

export default MerryCard;
