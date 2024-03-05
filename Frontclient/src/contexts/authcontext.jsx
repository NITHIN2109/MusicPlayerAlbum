import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [Username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8080", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
          setIsAdmin(res.data.isadmin);
          setUsername(res.data.name);
        } else {
          setUsername(false);
        }
      } catch (error) {
        console.log(error);
        // setIsDataLoaded(true);
        // alert(error.response?.data?.message || "Error fetching data");
        navigate("/Home");
      } finally {
        setIsDataLoaded(true);
      }
    }

    fetchData();
  }, [isLoggedIn]);

  const login = async (loginData) => {
    try {
      const res = await axios.post("http://localhost:8080/Login", loginData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate("/dashboard/home");
        const setCookieHeader = res.headers["set-Cookie"];
        console.log("Set-Cookie Header:", setCookieHeader);
        setIsLoggedIn(true);
        setIsAdmin(res.data.isadmin);
        console.log(res.data.isadmin);
        setUsername(res.data.name);
      }

      console.log(res);
      console.log(res.data.message);
      alert(res.data.message);
    } catch (err) {
      if (err.response?.status === 500) console.log(err);
      if (err.response?.status === 401) alert(err.response.data.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/Login");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const values = { isLoggedIn, isAdmin, login, Username, logout };

  if (!isDataLoaded) {
    return <div>Loading...54321</div>;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
