import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext";
import Conversation from "../components/Conversation";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";

export default function MatchingSidebar({ Chat }) {
  const { conversation, setCurrentChat, messages, onlineUser } = useSocket();
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleChat = (event) => {
    setCurrentChat(event);
    navigate(`/messages/${event.id}`);
  };

  return (
    <div className="border-r border-gray-300">
      <div className="border-b border-gray-300 px-4">
        <div
          className={
            !Chat
              ? "flex flex-col justify-center items-center w-72 h-44 rounded-2xl bg-gray-100 border border-purple-500 gap-1 my-9 p-6 cursor-pointer"
              : "flex flex-col justify-center items-center w-72 h-44 rounded-2xl bg-gray-100 border border-gray-400 gap-1 my-9 p-6 cursor-pointer"
          }
          onClick={() => navigate("/matching")}
        >
          <img src="/images/search-match.svg" alt="" />
          <p className="text-headline4 text-red-600">Discover New Match</p>
          <p className="text-body4 text-gray-700 text-center">
            Start find and Merry to get know <br />
            and connect with new friend!
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center py-6 px-4 gap-4">
        <div className="text-headline4 text-gray-900">Merry Match!</div>
        <div className="flex items-center gap-3">
          <img src="/images/test-match.png" alt="" />
          <img src="/images/test-match2.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center py-6 px-4 gap-4">
        <div className="text-headline4 text-gray-900">
          Chat with Merry Match
        </div>
        <div className="flex flex-col gap-4">
          {conversation.map((item, index) => (
            <div key={index} onClick={() => handleChat(item)}>
              <Conversation
                conversation={item}
                currentUser={state?.id}
                Chat={Chat}
                newMessages={messages}
                onlineUser={onlineUser}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
