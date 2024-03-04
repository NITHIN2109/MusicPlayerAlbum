import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSongContext } from "../contexts/SongPlayContext";
function Header() {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const { cleardata } = useSongContext();
  return (
    <header className="nav-bar">
      {isLoggedIn ? (
        <>
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
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/albums"
                    className={({ isActive }) =>
                      isActive ? "btn-home  Active" : "btn-home"
                    }
                  >
                    Albums
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

          <div className="text-end">
            <button
              className="btnh"
              onClick={(e) => {
                cleardata();
                logout(e);
              }}
            >
              <p className="btn btn-Logout">LogOut</p>
            </button>
          </div>
        </>
      ) : null}
    </header>
  );
}
export default Header;
