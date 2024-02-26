import axios from "axios";
import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { state } = useAuth();
  const user_id = state?.id;
  const { notifications, setCurrentChat } = useSocket();
  const navigate = useNavigate();

  const handleClickChat = async (userId) => {
    const result = await axios.get(
      `http://localhost:3000/conversation/${userId}`
    );
    const hasConversation = result.data.conversation.filter(
      (item) => item.receiver_id === state?.id || item.sender_id === state?.id
    );

    if (hasConversation.length === 0) {
      const data = await axios.post(`http://localhost:3000/conversation/`, {
        sender_id: state?.id,
        receiver_id: userId,
      });
      setCurrentChat(data.data.data[0]);
      navigate(`/messages/${data.data.data[0].id}`);
    } else {
      setCurrentChat(hasConversation[0]);
      navigate(`/messages/${hasConversation[0].id}`);
    }
  };

  const notificationLists = notifications.map((noti, index) => {
    return (
      <button
        key={index}
        className="flex justify-between py-3 px-3.5"
        onClick={() => {
          handleClickChat(noti.senderMatchId);
        }}
      >
        <img
          className="rounded-full w-8 h-8"
          src={noti.img}
          alt="profile-pic"
        ></img>
        <p className="w-[235px]">
          '{noti.name}' Merry you back! <br />
          Let's start conversation now
        </p>
      </button>
    );
  });

  return (
    <li className="flex flex-col justify-center bg-white w-[280px] rounded-2xl text-body4 text-gray-700 shadow-nav menu dropdown-content mt-4">
      {notifications.length === 0 && (
        <div className="py-6 px-3.5 flex justify-center">
          <p className="text-body2">No notifications yet</p>
        </div>
      )}
      {notificationLists}
    </li>
  );
}

export default Notification;
