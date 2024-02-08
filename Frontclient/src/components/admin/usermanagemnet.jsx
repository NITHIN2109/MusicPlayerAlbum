import React, { useState } from "react";
import axios from "axios";
import "./usermanagemnr.css";
const UserManagement = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    role: "",
  });
  const [edit, setEdit] = useState(false);
  const [updateid, setupdateid] = useState();

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(newUser);
    if (!newUser.Name || !newUser.Email || !newUser.Password || !newUser.role) {
      alert("Please fill out all fields");
      return;
    }
    axios
      .post("http://localhost:8080/users", newUser, { withCredentials: true })
      .then((response) => {
        if (response.status === 201) {
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
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  const handleUpdateUser = (userId, updatedUserData) => {
    // e.preventDefault();
    console.log(updatedUserData);
    axios
      .put(`http://localhost:8080/users/${userId}`, updatedUserData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...response.data.details } : user
          )
        );
        console.log(users);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="Usermanagement user-dashboard-container">
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
            onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
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
            <label htmlFor="role" className="us">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={newUser.role === "admin"}
                onChange={() => setNewUser({ ...newUser, role: "admin" })}
              />
              Admin
            </label>

            <label htmlFor="role" className="us">
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
                setupdateid(null);

                setEdit(null);
              }}
            >
              Update User
            </button>
          )}
        </form>
      )}
      <h3>User List</h3>
      <span>
        {showModal ? (
          <button onClick={toggleModal}>Close</button>
        ) : (
          <button onClick={toggleModal}>Add User</button>
        )}
      </span>

      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th> Email</th>
            <th>Password</th>
            <th>Role</th>
            <th colSpan={2}> Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Email}>
              {console.log(user)}
              <td>{user.Name}</td>
              <td> {user.Email} </td>
              <td>{user.Password}</td>
              <td> {user.role}</td>
              <td>
                <button
                  onClick={() => {
                    handleDeleteUser(user.id);
                    console.log(user.id);
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
                    toggleModal();
                    let usersdata = users.filter(
                      (usersdata) => user.id === usersdata.id
                    );
                    setNewUser({
                      Name: usersdata[0].Name,
                      Email: usersdata[0].Email,
                      Password: usersdata[0].Password,
                      role: usersdata[0].role,
                    });
                    setupdateid(usersdata[0].id);
                    if (!edit) {
                      setEdit(true);
                    } else {
                      setupdateid(null);
                      setEdit(null);
                      setNewUser({
                        Name: "",
                        Email: "",
                        Password: "",
                        role: null,
                      });
                    }
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
  );
};

export default UserManagement;
