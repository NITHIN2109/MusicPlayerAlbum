import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import UserManagement from "./admin/usermanagemnet";
import AlbumManagement from "./admin/albumManagement";
import SingleAlbum from "./admin/singlealbum";

import AdminHome from "./admin/adminhome";

const Admindashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div className="main_Container">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<AdminHome />} />
        <Route
          path="/user"
          element={<UserManagement users={users} setUsers={setUsers} />}
        />
        <Route path="/albums/*" element={<AlbumManagement />}></Route>
        <Route path="album/:albumId" element={<SingleAlbum />} />
      </Routes>
    </div>
  );
};

export default Admindashboard;
