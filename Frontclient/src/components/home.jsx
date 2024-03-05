import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";

function Home() {
  return (
    <>
      <div className="home">
        <div className="welcome-container">
          <h1 className="welcome-title">Welcome to Your Music Sanctuary</h1>
          <p className="welcome-message">
            In the silence of your heart, let music be the voice that speaks to
            the depths of your soul.
          </p>
        </div>
        <div className="action-container">
          <Link to="/login" className="action-button">
            Login
          </Link>
          <Link to="/signup" className="action-button">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
