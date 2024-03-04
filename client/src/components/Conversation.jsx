import axios from "axios";
import { useEffect, useState } from "react";

function Conversation({
  conversation,
  currentUser,
  Chat,
  newMessages,
  ownMessages,
}) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BASE_ENDPOINT}/messages/${
            conversation?.id
          }`
        );
        setMessages(data.messages[data.messages.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };

    getMessage();
  }, [newMessages, ownMessages, conversation]);

  useEffect(() => {
    const macthId =
      conversation.sender_id === currentUser
        ? conversation.receiver_id
        : conversation.sender_id;

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user?userId=${macthId}`
        );
        setUser(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div
      className={
        conversation?.id === Chat?.id
          ? "flex items-center max-w-[284px] gap-3 py-4 px-3 bg-gray-100 border border-purple-500 rounded-2xl cursor-pointer "
          : "flex items-center max-w-[284px] gap-3 py-4 px-3 hover:bg-gray-100  hover:rounded-2xl cursor-pointer "
      }
    >
      <img
        src={user?.image_url[0]}
        alt=""
        className="w-[3.75rem] h-[3.75rem] rounded-full object-cover"
      />
      <div className="truncate w-44">
        <div className="text-body2 text-gray-900">{user?.name}</div>
        <div className="text-body4 text-gray-700">
          {messages
            ? `${currentUser === messages?.sender_id ? "You" : user?.name} :
          ${messages?.message_text}`
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
