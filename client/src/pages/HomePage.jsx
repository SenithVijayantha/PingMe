import React, { useState } from "react";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <div>
        {/* Sidebar drawer */}
        <div className="lg:drawer-open drawer">
          <input
            id="my-drawer-left"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-left" className="lg:hidden drawer-button">
              <PanelLeftOpen />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-left"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <Sidebar />
            </ul>
          </div>
        </div>
      </div>
      <div className="border-2 w-full">
        <ChatContainer />
      </div>
      <div className={`${selectedUser ? "block" : "hidden"}`}>
        {/* Right sidebar drawer */}
        <div className="lg:drawer-open drawer drawer-end">
          <input
            id="my-drawer-right"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-right"
              className="lg:hidden drawer-button"
            >
              <PanelRightOpen />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-right"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <RightSidebar />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
