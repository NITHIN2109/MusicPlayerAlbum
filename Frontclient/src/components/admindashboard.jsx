import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import UserManagement from "./admin/usermanagemnet";
import AlbumManagement from "./admin/albumManagement";
import SingleAlbum from "./admin/singlealbum";
import Home from "./home";

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
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/usermanagement"
          element={<UserManagement users={users} setUsers={setUsers} />}
        />
        <Route path="/albumManagement/*" element={<AlbumManagement />}></Route>
        <Route path="albumManagement/:albumId" element={<SingleAlbum />} />
      </Routes>
    </>
  );
};

export default Admindashboard;
