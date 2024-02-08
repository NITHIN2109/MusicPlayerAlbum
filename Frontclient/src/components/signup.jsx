import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [signUpData, setsignUpData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    console.log(signUpData);
    await axios
      .post("http://localhost:8080/signUp", signUpData)
      .then((res) => {
        if (res.status === 201) {
          navigate("/Login");
        }
        console.log(res);
        console.log(res.data.message);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    setsignUpData({
      Name: "",
      Email: "",
      Password: "",
    });
  };

  return (
    <div className="SignUp signup-container">
      <div>
        <h1> Signup </h1>
        <form onSubmit={hanldeSubmit} className="signupform">
          <label htmlFor="signupFullname">Full Name</label>
          <br />
          <input
            type="text"
            className="form-control lin"
            id="signupFullname"
            placeholder="Name"
            name="Name"
            value={signUpData.Name}
            onChange={(e) =>
              setsignUpData({ ...signUpData, Name: e.target.value })
            }
          />
          <br />
          <label htmlFor="signupemail ">Email address</label>
          <br />
          <input
            type="email"
            className="form-control lin"
            id="signupemail"
            placeholder="name@example.com"
            name="Email"
            value={signUpData.Email}
            onChange={(e) =>
              setsignUpData({ ...signUpData, Email: e.target.value })
            }
          />
          <br />

          <label htmlFor="loginPassword ">Password</label>
          <br />
          <input
            type="password"
            className="form-control lin"
            id="loginPassword"
            placeholder="Password"
            name="Password"
            value={signUpData.Password}
            onChange={(e) =>
              setsignUpData({ ...signUpData, Password: e.target.value })
            }
          />
          <br></br>
          <button type="submit" className="btn-login">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
