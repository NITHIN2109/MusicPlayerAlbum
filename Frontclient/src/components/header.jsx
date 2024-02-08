import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authcontext";

function Header() {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  return (
    <header className="nav-bar">
      {isLoggedIn ? (
        <>
          <ul className="header-ul">
            <li>
              <Link to="/Home" className="btn-home">
                Home
              </Link>
            </li>

            {isAdmin ? (
              <>
                <li>
                  <Link to="/dashboard/usermanagement" className="btn-home">
                    Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/albumManagement" className="btn-home">
                    Albums
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/dashboard" className="btn-home">
                  Albums
                </Link>
              </li>
            )}
          </ul>

          <div className="text-end">
            <button className="btnh" onClick={(e) => logout(e)}>
              <p className="btn btn-Logout">LogOut</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className="header-ul">
            <li>
              <Link to="/Home" className="btn-home">
                Home
              </Link>
            </li>
          </ul>
          <div className="text-end">
            <button type="button" className="btnh">
              <Link to="/Login" className="btn btn-Login">
                Login
              </Link>
            </button>
            <button className="btnh">
              <Link to="/SignUp" className="btn btn-signUp">
                Sign-up
              </Link>
            </button>
          </div>
        </>
      )}
    </header>
  );
}
export default Header;
