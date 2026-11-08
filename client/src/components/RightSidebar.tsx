import { CircleUser } from "lucide-react";

import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import type { Message } from "../types";

const RightSidebar = () => {
  const { selectedUser, messages } = useChat();
  const { logout, onlineUsers } = useAuth();

  const mediaMessages = messages.filter(
    (msg): msg is Message & { image: string } => Boolean(msg.image)
  );

  if (!selectedUser) return null;

  return (
    <div className="pt-8">
      {selectedUser.profilePic ? (
        <img
          src={selectedUser.profilePic}
          alt=""
          className="mx-auto w-20 h-20 object-cover rounded-full"
        />
      ) : (
        <CircleUser width={80} height={80} color="gray" className="mx-auto" />
      )}
      <div className=" flex items-center justify-center gap-2 pt-4">
        {onlineUsers.includes(selectedUser._id) && (
          <div className="inline-block w-2 h-2 rounded-full bg-primary"></div>
        )}
        <h1 className="text-center text-xl">{selectedUser.fullName}</h1>
      </div>
      <p className="pt-2 px-10 text-center">{selectedUser.bio}</p>

      <div className="divider"></div>

      <div>
        <p className="pb-4">Media</p>
        <div className="max-h-64 grid grid-cols-2 gap-2 overflow-y-scroll">
          {mediaMessages.map((msg, index) => (
            <div
              key={index}
              onClick={() => window.open(msg.image)}
              className="cursor-pointer"
            >
              <img src={msg.image} alt="" className="h-full rounded-md" />
            </div>
          ))}
        </div>
        {mediaMessages.length === 0 && (
          <p className="text-center text-gray-500">No media found.</p>
        )}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center pt-2 px-4">
        <button
          className="w-full btn btn-sm btn-primary"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
