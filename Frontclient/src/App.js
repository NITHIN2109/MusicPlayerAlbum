import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./contexts/authcontext";
import Login from "./components/login";
import Signup from "./components/signup";
import Header from "./components/header";
import Home from "./components/home";
import Songplayer from "./components/user/SongPlayer.jsx";
import Userdashboard from "./components/user/userdashboard";
import Admindashboard from "./components/admindashboard";
import AlbumDetails from "./components/user/AlbumDetails";
import Search from "./components/user/Search";

import "./App.css";

function App() {
  const { isAdmin, isLoggedIn } = useAuth();

  return (
    <div className="App">
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path="/Home"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <Navigate to="/dashboard/home" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Home />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={isAdmin ? <Admindashboard /> : <Userdashboard />}
        />
        <Route path="/album/:albumId" element={<AlbumDetails />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <Navigate to="/dashboard/home" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/Home" />
            )
          }
        />
      </Routes>
      {isLoggedIn && <Songplayer />}
    </div>
  );
}

export default App;
