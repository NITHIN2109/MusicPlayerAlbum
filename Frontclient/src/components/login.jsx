import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!loginData.Email || !loginData.Password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await login(loginData);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          {!error && (
            <div className="normal-message">Please enter your credentials</div>
          )}
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="Email"
              value={loginData.Email}
              onChange={(e) =>
                setLoginData({ ...loginData, Email: e.target.value })
              }
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="Password"
              value={loginData.Password}
              onChange={(e) =>
                setLoginData({ ...loginData, Password: e.target.value })
              }
            />
            {/* <p className="password_help">
              Forgot your password?
              <Link to="/forgotpassword" className="forget_link">
                Reset it here
              </Link>
            </p> */}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="helper-text">
            Don't have an account?{" "}
            <Link to="/signup" className="register-link">
              Sign up here
            </Link>
            .
          </p>
        </form>
        <Link to="/home" className="go-back-link">
          <button className="go-back-button">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
