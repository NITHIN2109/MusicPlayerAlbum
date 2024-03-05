import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Login() {
  const [LoginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(LoginData);
      console.log("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="login">
      <div className=" login-container">
        <form onSubmit={handleSubmit} className="loginform">
          <h1> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Login </h1>
          <label htmlFor="Email" className="lin">
            Email address
          </label>
          <br />
          <input
            type="email"
            className="form-control lin"
            id="loginemail"
            placeholder="name@example.com"
            name="Email"
            value={LoginData.Email}
            onChange={(e) =>
              setLoginData({ ...LoginData, Email: e.target.value })
            }
          />
          <br />
          <label htmlFor="Password" className="lin">
            Password
          </label>
          <br />
          <input
            type="password"
            className="form-control lin"
            id="loginPassword"
            placeholder="Password"
            name="Password"
            value={LoginData.Password}
            onChange={(e) =>
              setLoginData({ ...LoginData, Password: e.target.value })
            }
          />
          <br></br>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp;
          <button type="submit" className="btn-login">
            Login
          </button>
          <button className="btn-login">
            <Link to="/signup" className="login-signup">
              Signup
            </Link>
          </button>
          <br></br>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp;
          <button className="btn-login">
            <Link to="/home" className="login-signup">
              Return to home
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
