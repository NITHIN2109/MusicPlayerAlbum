import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { FaUsers } from "react-icons/fa";

import { LuListMusic } from "react-icons/lu";
import { useSongContext } from "../contexts/SongPlayContext";
function Header() {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const { cleardata } = useSongContext();
  return (
    <header className="nav-bar">
      <ul className="header-ul">
        {isAdmin ? (
          <>
            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  isActive ? "btn-home  Active" : "btn-home"
                }
              >
                <span style={{ verticalAlign: "middle", margin: "0px" }}>
                  <HomeOutlinedIcon />
                </span>
                <span> Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  isActive ? "btn-home  Active" : "btn-home"
                }
              >
                <span style={{ verticalAlign: "middle", margin: "0px" }}>
                  <FaUsers />
                </span>
                <span> Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/albums"
                className={({ isActive }) =>
                  isActive ? "btn-home  Active" : "btn-home"
                }
              >
                <span style={{ verticalAlign: "middle", margin: "0px" }}>
                  <LuListMusic />
                </span>
                <span> Albums</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "btn-home  Active" : "btn-home"
                }
              >
                <span style={{ verticalAlign: "middle", margin: "0px" }}>
                  <HomeOutlinedIcon />
                </span>
                <span> Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? "btn-home  Active" : "btn-home"
                }
              >
                {" "}
                <span style={{ verticalAlign: "middle", margin: "0px" }}>
                  <SearchOutlinedIcon />
                </span>
                <span> Search</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <button
        className="btn-Logout"
        onClick={(e) => {
          cleardata();
          logout(e);
        }}
      >
        <span>LogOut</span>
      </button>
    </header>
  );
}
export default Header;
