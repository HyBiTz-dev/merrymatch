import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authentication";
import axios from "axios";

const SocketContext = React.createContext();

function SocketProvider(props) {
  const { state } = useAuth();
  const socket = useRef();
  const [conversation, setConversation] = useState([]);
  const [newMessages, setNewMessages] = useState(null);
  const [onlineUser, serOnlineUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrCurrentChat, setArrCurrentChat] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_APP_BASE_ENDPOINT}`);
    socket.current.on("getMessage", (data) => {
      setNewMessages({
        sender_id: data.senderId,
        message_text: data.messages,
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", state?.id);
    socket.current.on("getUsers", (users) => {
      serOnlineUser(users);
    });
    getConversation();
  }, [state?.id]);

  const getConversation = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/conversation/${state?.id}`
      );
      setConversation(res.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_BASE_ENDPOINT}/messages/${
              currentChat?.id
            }`
          );
          setMessages(res.data.messages);
          setArrCurrentChat(Object.values(currentChat));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    newMessages &&
      arrCurrentChat.includes(newMessages.sender_id) &&
      setMessages([...messages, newMessages]);
  }, [newMessages, currentChat]);

  useEffect(() => {
    socket.current.on("notification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        setMessages,
        currentChat,
        setCurrentChat,
        onlineUser,
        notifications,
        setNotifications,
        conversation,
        getConversation,
        newMessages,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

const useSocket = () => React.useContext(SocketContext);

export { SocketProvider, useSocket };
