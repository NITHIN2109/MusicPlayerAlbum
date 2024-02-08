import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authcontext";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import Admindashboard from "./components/admindashboard";
import Userdashboard from "./components/user/userdashboard";
import Header from "./components/header";
import "./App.css";

function App() {
  const { isAdmin, isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard//*"
          element={isAdmin ? <Admindashboard /> : <Userdashboard />}
        />
        <Route path="/" element={<Home />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
