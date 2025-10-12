import React, { useContext } from "react";
import { CircleUser } from "lucide-react";

import { dummyImagesData } from "../assets/assets.js";
import { ChatContext } from "../../context/ChatContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  return (
    selectedUser && (
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

        {/* <div>
          <p className="pb-4">Media</p>
          <div className="max-h-64 grid grid-cols-2 gap-2 overflow-y-scroll">
            {dummyImagesData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div> */}

        <div className="absolute bottom-2 left-0 right-0 flex justify-center pt-2 px-4">
          <button
            className="w-full btn btn-sm btn-primary"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default RightSidebar;
