import React, { useContext, useEffect, useState } from "react";
import { EllipsisVertical, CircleUser } from "lucide-react";
import { useNavigate, Link } from "react-router";

import { icon } from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = searchInput
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className="flex flex-col gap-6">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <p className="btn btn-ghost text-lg">
            <img width={18} src={icon} alt="" />
            PingMe
          </p>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <EllipsisVertical />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"}>Edit Profile</Link>
              </li>
              <li>
                <Link onClick={() => logout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        {/* Search bar */}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="search-user"
            required
            placeholder="Search User..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>

        {/* Chats */}
        <div className="flex flex-col mt-2">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
              }}
              className={`relative flex items-center gap-2 p-2 pl-4 cursor-pointer ${
                selectedUser?._id === user._id && "bg-secondary"
              }`}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt=""
                  // width={35}
                  className="rounded-full w-10 h-10 object-cover"
                />
              ) : (
                <CircleUser className="w-10 h-10" />
              )}
              <div className="flex flex-col leading-5">
                <p>{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className="text-accent text-xs">Online</span>
                ) : (
                  <span className="text-gray-400 text-xs">Offline</span>
                )}
              </div>
              {unseenMessages[user._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-accent-content">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
