import axios from "axios";
import React, { Children, useEffect, useState } from "react";

function Conversation({ conversation, currentUser, Chat, newMessages }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/messages/${conversation?.id}`
        );
        setMessages(data.messages[data.messages.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };

    getMessage();
  }, [newMessages]);

  useEffect(() => {
    const macthId =
      conversation.sender_id === currentUser
        ? conversation.receiver_id
        : conversation.sender_id;

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user?userId=${macthId}`
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
      {/* <div className="indicator relative"> */}
      {/* <span className="indicator-item badge bg-green-400 border-green-400 absolute top-2 right-2"></span> */}
      <img
        src={user?.image_url[0]}
        alt=""
        className="w-[3.75rem] h-[3.75rem] rounded-full object-cover"
      />
      {/* </div> */}
      <div className="truncate">
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
