import { useEffect } from "react";
import { useSocket } from "../context/socketContext";
import Conversation from "../components/Conversation";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
import SwipeMatchsidebar from "./SwipeMatchsidebar";

export default function MatchingSidebar({ Chat, matching }) {
  const {
    conversation,
    setCurrentChat,
    messages,
    onlineUser,
    getConversation,
    newMessages,
  } = useSocket();
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleChat = (event) => {
    setCurrentChat(event);
    navigate(`/messages/${event.id}`);
  };

  // const sortedCoversation = conversation;

  useEffect(() => {
    getConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Chat, messages, newMessages]);

  return (
    <div className="border-r border-gray-300">
      <div className="border-b border-gray-300 px-4">
        <div
          className={
            !Chat
              ? "flex flex-col justify-center items-center w-72 h-44 rounded-2xl bg-gray-100 border border-purple-500 gap-1 my-9 p-6 cursor-pointer"
              : "flex flex-col justify-center items-center w-72 h-44 rounded-2xl bg-gray-100 border border-gray-400 gap-1 my-9 p-6 cursor-pointer"
          }
          onClick={() => (window.location.href = "/matching")}
        >
          <img src="/images/search-match.svg" alt="" />
          <p className="text-headline4 text-red-600">Discover New Match</p>
          <p className="text-body4 text-gray-700 text-center">
            Start find and Merry to get know <br />
            and connect with new friend!
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center py-6 px-4 gap-4 max-w-[18.75rem]">
        <div className="text-headline4 text-gray-900">Merry Match!</div>
        <SwipeMatchsidebar matching={matching} />
      </div>
      <div className="flex flex-col justify-center py-6 px-4 gap-4">
        <div className="text-headline4 text-gray-900">
          Chat with Merry Match
        </div>
        <div className="flex flex-col h-80 gap-4 overflow-y-scroll">
          {conversation
            ? conversation
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .map((item, index) => (
                  <div key={index} onClick={() => handleChat(item)}>
                    <Conversation
                      conversation={item}
                      currentUser={state?.id}
                      Chat={Chat}
                      ownMessages={messages}
                      newMessages={newMessages}
                      onlineUser={onlineUser}
                    />
                  </div>
                ))
            : ""}
        </div>
      </div>
    </div>
  );
}
