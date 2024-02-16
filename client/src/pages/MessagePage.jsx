import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import axios from "axios";
import { useAuth } from "../context/authentication";
import { useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
import MatchingSidebar from "../components/MatchingSidebar";

export default function ChatPage() {
  const { state } = useAuth();

  const { socket, messages, setMessages, currentChat } = useSocket();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { message } = Object.fromEntries(new FormData(e.currentTarget));

    if (typeof message === "string" && message.trim().length !== 0) {
      e.currentTarget.reset();

      try {
        const res = await axios.post(`http://localhost:3000/messages`, {
          conversation_id: currentChat.id,
          sender_id: state?.id,
          message_text: message,
        });
        setMessages([...messages, res.data[0]]);
      } catch (error) {
        console.log(error);
      }
    }

    const receiverId =
      currentChat?.sender_id === state?.id
        ? currentChat?.receiver_id
        : currentChat?.sender_id;

    socket.current.emit("sendMessages", {
      senderId: state?.id,
      receiverId,
      messages: message,
    });
  };

  return (
    <div className=" bg-main h-screen">
      <Navbar auth />
      <main className="flex justify-center bg-main h-[91%]">
        <MatchingSidebar Chat={currentChat} />
        <div className="bg-bg flex flex-col  gap-16 w-[70.25rem]">
          <div className="flex flex-col flex-1 mt-24 gap-12 overflow-y-scroll">
            {currentChat ? (
              <div className="flex flex-col justify-center items-center gap-12">
                <div className="w-[46.875.rem] p-6 flex justify-center items-center gap-6 rounded-2xl bg-purple-100 border border-purple-300">
                  <svg
                    className="fill-red-400"
                    width="62"
                    height="36"
                    viewBox="0 0 62 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.4665 31.3085L20.4759 31.3135L20.4939 31.3243L20.524 31.3393C20.8568 31.5122 21.2265 31.6023 21.6017 31.6017C21.8868 31.6013 22.1686 31.5486 22.4333 31.447H22.5017L22.7242 31.3135L22.7335 31.3085L22.7406 31.3048L22.7476 31.301C25.2087 29.9551 27.524 28.3584 29.6566 26.5363L29.6599 26.5334C33.0114 23.6443 37 19.1006 37 13.5V13.4999C36.9998 11.6181 36.4163 9.78271 35.3298 8.24634C34.2432 6.70997 32.7071 5.54822 30.9329 4.92105C29.1588 4.29388 27.2338 4.23214 25.4231 4.74434C23.983 5.15169 22.6716 5.90613 21.6 6.93416C20.5285 5.90613 19.217 5.15169 17.7769 4.74434C15.9662 4.23214 14.0413 4.29388 12.2671 4.92105C10.4929 5.54822 8.95681 6.70997 7.87027 8.24634C6.78373 9.78271 6.20019 11.6181 6.20001 13.4999V13.5C6.20001 19.1007 10.1906 23.6445 13.5399 26.5332L13.5433 26.5362C15.0442 27.8188 16.6364 28.9905 18.3074 30.042C19.0092 30.4851 19.7252 30.9053 20.4543 31.302L20.4542 31.3021L20.4665 31.3085Z"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M42.0665 31.3085L42.0759 31.3135L42.0939 31.3243L42.124 31.3393C42.4568 31.5122 42.8265 31.6023 43.2017 31.6017C43.4868 31.6013 43.7686 31.5486 44.0333 31.447H44.1017L44.3241 31.3135L44.3335 31.3085L44.3406 31.3048L44.3476 31.301C46.8087 29.9551 49.124 28.3584 51.2566 26.5363L51.2599 26.5334C54.6114 23.6443 58.6 19.1006 58.6 13.5V13.4999C58.5998 11.6181 58.0163 9.78271 56.9297 8.24634C55.8432 6.70997 54.3071 5.54822 52.5329 4.92105C50.7588 4.29388 48.8338 4.23214 47.0231 4.74434C45.583 5.15169 44.2715 5.90613 43.2 6.93416C42.1285 5.90613 40.817 5.15169 39.3769 4.74434C37.5662 4.23214 35.6412 4.29388 33.8671 4.92105C32.0929 5.54822 30.5568 6.70997 29.4703 8.24634C28.3837 9.78271 27.8002 11.6181 27.8 13.4999V13.5C27.8 19.1007 31.7906 23.6445 35.1399 26.5332L35.1433 26.5362C36.6442 27.8188 38.2364 28.9905 39.9074 30.042C40.6092 30.4851 41.3252 30.9053 42.0543 31.302L42.0542 31.3021L42.0665 31.3085Z"
                      stroke="white"
                      stroke-width="2"
                    />
                  </svg>
                  <p className="text-red-700 text-body4">
                    Now you and Daeny are Merry Match! <br />
                    You can messege something nice and make a good conversation.
                    Happy Merry!
                  </p>
                </div>
                <div className="flex flex-col w-full gap-4">
                  {messages.map((messages, index) => (
                    <div key={index} ref={scrollRef}>
                      <Messages messages={messages} user={state?.id} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span className="text-headline1 text-center">
                Open a conversation in stash
              </span>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex  border-t border-gray-900 h-[6.25rem] w-full px-14 py-6"
          >
            <div className="flex w-full gap-6">
              <label
                htmlFor="uploadpic"
                className="bg-gray-100 h-12 w-12 rounded-full p-[0.875rem] flex items-center justify-center cursor-pointer"
              >
                <img src="/images/picupload.svg" alt="" />
                <input type="file" name="" id="uploadpic" hidden />
              </label>
              <input
                type="text"
                name="message"
                placeholder="Messege here..."
                className="input bg-bg w-full border-none focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 h-12 w-12 rounded-full p-3 flex items-center justify-center shadow-nav"
            >
              <svg
                className="fill-white"
                width="19"
                height="19"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.21764 0.607567C2.02285 0.551078 1.81641 0.548297 1.62017 0.599519C1.42393 0.650742 1.24519 0.754061 1.10286 0.898545C0.960524 1.04303 0.859898 1.2233 0.811626 1.42029C0.763354 1.61727 0.769232 1.82365 0.828638 2.01757L4.47664 13.8751H17.2506C17.549 13.8751 17.8352 13.9936 18.0461 14.2046C18.2571 14.4156 18.3756 14.7017 18.3756 15.0001C18.3756 15.2984 18.2571 15.5846 18.0461 15.7956C17.8352 16.0065 17.549 16.1251 17.2506 16.1251H4.47664L0.828638 27.9826C0.769232 28.1765 0.763354 28.3829 0.811626 28.5798C0.859898 28.7768 0.960524 28.9571 1.10286 29.1016C1.24519 29.2461 1.42393 29.3494 1.62017 29.4006C1.81641 29.4518 2.02285 29.4491 2.21764 29.3926C12.1401 26.507 21.497 21.9485 29.8851 15.9136C30.0301 15.8094 30.1482 15.6722 30.2296 15.5134C30.311 15.3545 30.3535 15.1786 30.3535 15.0001C30.3535 14.8216 30.311 14.6456 30.2296 14.4868C30.1482 14.3279 30.0301 14.1908 29.8851 14.0866C21.4971 8.05154 12.1401 3.49304 2.21764 0.607567Z" />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
