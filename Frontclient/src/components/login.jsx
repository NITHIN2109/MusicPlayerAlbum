import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router";

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
    <div className="login login-container ">
      <div>
        <h1> Login </h1>
        <form onSubmit={handleSubmit} className="loginform">
          <label htmlFor="Email" className="lin">
            {" "}
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
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
