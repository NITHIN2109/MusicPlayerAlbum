import React, { useState, useEffect } from "react";
import axios from "axios";
import "./usermanagemnr.css";

const UserManagement = ({ users, setUsers }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    role: "",
  });
  const [edit, setEdit] = useState(false);
  const [updateid, setUpdateId] = useState();

  useEffect(() => {
    console.log(filteredUsers);
  }, [filteredUsers]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.Name || !newUser.Email || !newUser.Password || !newUser.role) {
      alert("Please fill out all fields");
      return;
    }
    axios
      .post("http://localhost:8080/users", newUser, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) {
          setFilteredUsers((prevUsers) => [
            ...prevUsers,
            response.data.details,
          ]);
          setUsers((prevUsers) => [...prevUsers, response.data.details]);
          setNewUser({ Name: "", Email: "", Password: "", role: "" });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert(error.response.data.Error);
        }
        console.error("Error adding user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8080/users/${userId}`, {
        withCredentials: true,
      })
      .then(() => {
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  const handleUpdateUser = (userId, updatedUserData) => {
    axios
      .put(`http://localhost:8080/users/${userId}`, updatedUserData, {
        withCredentials: true,
      })
      .then((response) => {
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...response.data.details } : user
          )
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...response.data.details } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchInput, users]);
  return (
    <div className="Usermanagement user-dashboard-container">
      <div className="UserList">
        <h1>
          UserList &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            placeholder="Search user"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </h1>

        <table className="userTable">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.Email}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Password}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => {
                      if (!showModal) {
                        toggleModal();
                      }
                      setNewUser({
                        Name: user.Name,
                        Email: user.Email,
                        Password: user.Password,
                        role: user.role,
                      });
                      setUpdateId(user.id);
                      setEdit(true);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="adduser">
        <span className="addUserBtn">
          {showModal ? (
            <button onClick={toggleModal} className="adduserButton">
              Close
            </button>
          ) : (
            <button onClick={toggleModal} className="adduserButton">
              Add User
            </button>
          )}
        </span>
        {showModal && (
          <form className="adduser">
            <h3>Add User</h3>
            <input
              type="text"
              placeholder="Username"
              value={newUser.Name}
              onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.Email}
              onChange={(e) =>
                setNewUser({ ...newUser, Email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.Password}
              onChange={(e) =>
                setNewUser({ ...newUser, Password: e.target.value })
              }
              required
            />
            <div className="userrole">
              <label htmlFor="admin" className="us">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={newUser.role === "admin"}
                  onChange={() => setNewUser({ ...newUser, role: "admin" })}
                />
                Admin
              </label>

              <label htmlFor="user" className="us">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={newUser.role === "user"}
                  onChange={() => setNewUser({ ...newUser, role: "user" })}
                />
                User
              </label>
            </div>

            {!edit ? (
              <button className="bt" onClick={(e) => handleAddUser(e)}>
                Add User
              </button>
            ) : (
              <button
                className="bt"
                onClick={() => {
                  handleUpdateUser(updateid, newUser);
                  setNewUser({
                    Name: "",
                    Email: "",
                    Password: "",
                    role: "",
                  });
                  setUpdateId(null);
                  setEdit(false);
                }}
              >
                Update User
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
