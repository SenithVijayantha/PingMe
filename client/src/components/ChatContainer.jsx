import React from "react";
import { MessageSquare } from "lucide-react";

import { icon, user1 } from "../assets/assets";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className="">
        {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-accent-content">
        <img src={user1} alt="" className="w-8 h-8 object-cover rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2 ">
          Clara Mitchell <div className="w-2 h-2 rounded-full bg-primary"></div>
        </p>
      </div>

      {/* Chat area */}
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
