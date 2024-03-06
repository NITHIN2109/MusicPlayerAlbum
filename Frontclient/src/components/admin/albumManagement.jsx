import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./usermanagemnr.css";
import { useAlbum } from "../../contexts/alubmscontext";
import axios from "axios";

import Modal from "./addalbummodal";
function AlbumManagement() {
  const { albums, refreshAlbums } = useAlbum();
  const [showModal, setShowModal] = useState(false);
  const [formdata, setformdata] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseYear: "",
    image: {},
    songs: [],
  });
  const handleFormSubmit = (e) => {
    console.log(formdata.songs);
    e.preventDefault();
    const newformdata = new FormData();
    newformdata.append("title", formdata.title);
    newformdata.append("genre", formdata.genre);
    newformdata.append("releaseYear", formdata.releaseYear);
    newformdata.append("artist", formdata.artist);
    newformdata.append("image", formdata.image);
    for (let i = 0; i < formdata.songs.length; i++) {
      newformdata.append("song", formdata.songs[i]);
    }
    console.log(newformdata);
    axios
      .post("http://localhost:8080/Album", newformdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        refreshAlbums();
      })
      .catch((err) => console.log(err));
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSongFileChange = (e) => {
    setformdata({ ...formdata, songs: e.target.files });
  };
  return (
    <div className="albumcontainer">
      <div>
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          handleFormSubmit={handleFormSubmit}
          handleSongFileChange={handleSongFileChange}
          formdata={formdata}
          setformdata={setformdata}
        />
      </div>
      <div className="album-header">
        <h1>Album Management</h1>
        {!showModal && (
          <button onClick={toggleModal} className="btn-addalbum sin">
            Add Album
          </button>
        )}
      </div>
      <div className="album-body">
        {albums ? (
          albums.map((album) => (
            <Link to={`/dashboard/album/${album.id}`} key={album.id}>
              <div className="album-card">
                <img
                  src={`http://localhost:8080/uploads/${album.coverImage}`}
                  alt="Album Cover"
                />
                <p>
                  <strong>{album.title}</strong>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading albums...</p>
        )}
      </div>
    </div>
  );
}

export default AlbumManagement;
