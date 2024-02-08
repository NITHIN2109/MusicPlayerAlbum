import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAlbum } from "../../contexts/alubmscontext";

function SingleAlbum() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [album, setAlbum] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { refreshAlbums } = useAlbum();
  const [editedFields, setEditedFields] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const handleEditClick = () => {
    setIsEdit(true);
    setEditedFields({
      title: album[0].title,
      artist: album[0].artist,
      genre: album[0].genre,
      releaseYear: album[0].releaseYear,
      rating: album[0].rating,
    });
  };

  const handleUpdateClick = () => {
    axios
      .put(`http://localhost:8080/album/${albumId}`, editedFields, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating album");
      });

    setIsEdit(false);
  };

  const handleFieldChange = (field, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/album/${albumId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Delete Successfully");
          navigate("/dashboard/albumManagement");
          refreshAlbums();
        } else {
          alert("Failed to delete the album");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting album");
      });
  };

  const handlePlaySong = (songName) => {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = `http://localhost:8080/songs/${songName}`;
    audioPlayer.play();
  };

  const handleDeleteSong = (songId) => {
    axios
      .delete(`http://localhost:8080/songs/${songId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Song deleted successfully");
          console.log(album);
          setAlbum((prevAlbum) => {
            const updatedAlbum = [...prevAlbum]; // Create a copy of the array
            updatedAlbum[0] = {
              ...updatedAlbum[0],
              songs: updatedAlbum[0].songs.filter(
                (song) => song.song_id !== songId
              ),
            };
            return updatedAlbum;
          });
        } else {
          alert("Failed to delete the song");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting song");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/album/${albumId}`, { withCredentials: true })
      .then((res) => {
        setAlbum(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching album");
      });
  }, [albumId, isEdit]);

  if (!album) {
    return <p>Waiting for data to load...</p>;
  }

  return (
    <div className="singlealbumcontainer">
      <div className="image">
        <img
          src={`http://localhost:8080/uploads/${album[0].coverImage}`}
          alt="Album Cover"
        />
      </div>
      <div className="albumdetails">
        {isEdit ? (
          <div className="editForm">
            <label>Title:</label>
            <input
              type="text"
              value={editedFields.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            />
            <label>Artist:</label>
            <input
              type="text"
              value={editedFields.artist}
              onChange={(e) => handleFieldChange("artist", e.target.value)}
            />
            <label>Genre:</label>
            <input
              type="text"
              value={editedFields.genre}
              onChange={(e) => handleFieldChange("genre", e.target.value)}
            />
            <label>Release Year:</label>
            <input
              type="text"
              value={editedFields.releaseYear}
              onChange={(e) => handleFieldChange("releaseYear", e.target.value)}
            />
            <label>Rating:</label>
            <input
              type="text"
              value={editedFields.rating}
              onChange={(e) => handleFieldChange("rating", e.target.value)}
            />
            <button onClick={handleUpdateClick}>Update</button>
          </div>
        ) : (
          <>
            <div>
              <h1>{album[0].title}</h1>
              <h2>Artist: {album[0].artist}</h2>
              <h2>Genre: {album[0].genre}</h2>
              <h2>Release Year: {album[0].releaseYear}</h2>
              <h2>Rating: {album[0].rating}</h2>

              <span>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={() => handleDelete(albumId)}>Delete</button>
              </span>
            </div>
            <div>
              <p>
                <audio id="audioPlayer" src="" controls />
              </p>
              <h3>Songs:</h3>
              <table className="thead">
                <thead>
                  <tr>
                    <th>Sl. No</th>
                    <th>Song Name</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {album[0].songs ? (
                    album[0].songs.map((song, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{song.song_filename}</td>
                        <td>{formatDuration(song.duration)}</td>
                        <td>
                          <button onClick={() => handlePlaySong(song.song_id)}>
                            Play
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song.song_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No songs available for this album.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleAlbum;
