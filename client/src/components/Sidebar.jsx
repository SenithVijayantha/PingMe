import React from "react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate, Link } from "react-router";

import { icon } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
            
          <p className="btn btn-ghost text-lg"><img width={18} src={icon} alt="" />PingMe</p>
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
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      Sidebar
    </div>
  );
};

export default Sidebar;
