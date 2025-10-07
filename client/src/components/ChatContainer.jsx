import React from "react";
import { useRef, useEffect } from "react";
import { MessageSquare, ImagePlus, Send } from "lucide-react";

import { dummyMessageData, icon, user1 } from "../assets/assets";
import { formatDate } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return selectedUser ? (
    <div className=" flex flex-col h-screen mx-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 border-b border-accent-content">
        <img src={user1} alt="" className="w-8 h-8 object-cover rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2 ">
          Clara Mitchell <div className="w-2 h-2 rounded-full bg-primary"></div>
        </p>
      </div>

      {/* Chat area */}
      <div className="overflow-y-scroll py-8">
        {dummyMessageData.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.senderId !== "680f50e4f10f3cd28382ecf9"
                ? "chat-start"
                : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            {msg.image ? (
              <div className="chat-bubble">
                <img className="rounded-md" src={msg.image} />
              </div>
            ) : (
              <div className="chat-bubble">{msg.text}</div>
            )}

            <div className="chat-footer opacity-50">
              <time className="text-xs opacity-50">
                {formatDate(msg.createdAt)}
              </time>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom area */}
      <div className="flex justify-between px-4 py-2 items-center gap-4">
        <div className="w-full flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="input border-none focus:outline-none w-full"
          />
          <input
            type="file"
            name=""
            id="send-images"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="send-images">
            <ImagePlus
              width={24}
              height={24}
              color="gray"
              className="cursor-pointer"
            />
          </label>
        </div>
        <button className="bg-accent rounded-sm w-8 h-8 flex items-center justify-center cursor-pointer">
          <Send width={16} height={16} />
        </button>
      </div>
    </div>
  ) : (
    <div className="h-[100vh] border-2 flex flex-col justify-center items-center gap-4">
      <MessageSquare width={65} height={65} color="gray" />
      <div className="text-center">
        <p className="text-xl text-gray-600 font-semibold">Ping Me</p>
        <p className="text-gray-600">Chat with anyone around the world.</p>
      </div>
    </div>
  );
};

export default ChatContainer;
