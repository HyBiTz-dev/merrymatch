import React, { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseClient";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      if (!data) {
        alert("no data");
        return;
      }
      setMessages(data);
    };

    const userId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user.id);
    };

    userId();

    getData();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <ul className="flex flex-col gap-4 px-14">
      {messages.map((messages) => (
        <li
          key={messages.id}
          className={
            messages.user_id === user
              ? "bg-purple-600 px-6 py-4 text-body2 text-white rounded-l-3xl rounded-tr-3xl self-end"
              : "bg-purple-200 border border-gray-200 px-6 py-4 text-body2 text-black rounded-r-3xl rounded-tl-3xl self-start"
          }
        >
          {messages.content}
        </li>
      ))}
    </ul>
  );
}
