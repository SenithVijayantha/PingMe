import React from "react";
import { useRef, useEffect, useContext, useState } from "react";
import { MessageSquare, ImagePlus, Send } from "lucide-react";

import { dummyMessageData, icon, user1, avatarIcon } from "../assets/assets";
import { formatDate } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [messageTextInput, setMessageTextInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (messageTextInput.trim() === "") return;

    await sendMessage({ text: messageTextInput.trim() });
    setMessageTextInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessages({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className=" flex flex-col h-screen mx-4">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 border-b border-accent-content">
        <img
          src={selectedUser.profilePic || avatarIcon}
          alt=""
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex-1 text-lg text-white flex items-center gap-2 ">
          {selectedUser.fullName}{" "}
          {onlineUsers.includes(selectedUser._id) && (
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="overflow-y-scroll py-8">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.senderId !== authUser._id
                ? "chat-start"
                : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={selectedUser.profilePic || avatarIcon}
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
            onChange={(e) => setMessageTextInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            value={messageTextInput}
          />
          <input
            type="file"
            name=""
            id="send-images"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleSendImage}
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
        <button
          className="bg-accent rounded-sm w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={handleSendMessage}
        >
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
