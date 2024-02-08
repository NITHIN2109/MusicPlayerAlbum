import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./usermanagemnr.css";
import { useAlbum } from "../../contexts/alubmscontext";
import axios from "axios";

function AlbumManagement() {
  const { albums, refreshAlbums } = useAlbum();
  const [showModal, setShowModal] = useState(false);
  const [formdata, setformdata] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseYear: "",
    rating: "",
    image: {},
    songs: [],
  });
  const handleFormSubmit = (e) => {
    console.log(formdata.songs);
    e.preventDefault();
    // if (
    //   !formdata.title ||
    //   !formdata.genre ||
    //   !formdata.artist ||
    //   !formdata.releaseYear ||
    //   !formdata.rating ||
    //   !formdata.image ||
    //   formdata.songs.length === 0
    // ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const newformdata = new FormData();
    newformdata.append("title", formdata.title);
    newformdata.append("genre", formdata.genre);
    newformdata.append("rating", formdata.rating);
    newformdata.append("releaseYear", formdata.releaseYear);
    newformdata.append("artist", formdata.artist);
    newformdata.append("image", formdata.image);

    // newformdata.append("song", formdata.songs);
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
      <div className="album-header">
        <h1>Album Management</h1>
        <button onClick={toggleModal} className="btn-addalbum sin">
          Add Album
        </button>
      </div>
      {showModal && (
        <div className="overlay">
          <div className="content">
            <form
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
              className="addalbumform"
            >
              <label>Title </label>
              <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={(e) =>
                  setformdata({ ...formdata, title: e.target.value })
                }
                required
              />

              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={formdata.genre}
                onChange={(e) =>
                  setformdata({ ...formdata, genre: e.target.value })
                }
                required
              />

              <label>Rating</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={formdata.rating}
                onChange={(e) =>
                  setformdata({ ...formdata, rating: e.target.value })
                }
                required
              />

              <label>Release Year</label>
              <input
                type="number"
                name="releaseYear"
                value={formdata.releaseYear}
                onChange={(e) =>
                  setformdata({ ...formdata, releaseYear: e.target.value })
                }
                required
              />

              <label>Artist</label>
              <input
                type="text"
                name="artist"
                value={formdata.artist}
                onChange={(e) =>
                  setformdata({ ...formdata, artist: e.target.value })
                }
                required
              />

              <label>Cover Image</label>
              <input
                type="file"
                name="coverImage"
                onChange={(e) =>
                  setformdata({ ...formdata, image: e.target.files[0] })
                }
              />
              <label> Songs</label>
              <input
                type="file"
                name="songs"
                multiple
                onChange={handleSongFileChange}
              />
              <br></br>
              <button type="submit" className="btn-submitalbum album">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="album-body">
        {albums ? (
          albums.map((album) => (
            <Link to={`/dashboard/albummanagement/${album.id}`} key={album.id}>
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
