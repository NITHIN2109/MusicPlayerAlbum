import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAlbum } from "../../contexts/alubmscontext";
import { useSongContext } from "../../contexts/SongPlayContext";
import { FaPlay, FaPause } from "react-icons/fa";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { MdDelete } from "react-icons/md";
function SingleAlbum() {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const { refreshAlbums } = useAlbum();
  const [editedFields, setEditedFields] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });
  const [songData, setSongData] = useState([]);
  const [addSong, setAddsong] = useState(null);
  const [album, setalbums] = useState();
  const {
    playSong,
    // updateAlbumId,

    addsong,
    updatealbums,
    isPlaying,
    currentSongId,
    pauseSong,
    deletesong,
  } = useSongContext();
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
      title: album.title,
      artist: album.artist,
      genre: album.genre,
      releaseYear: album.releaseYear,
      rating: album.rating,
    });
  };

  const handleUpdateClick = () => {
    axios
      .put(`http://localhost:8080/album/${albumId}`, editedFields, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Updated successfully");
        setalbums({ ...album, ...editedFields });
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
          navigate("/dashboard/albums");
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

  // const handlePlaySong = (songName) => {
  //   // Call the playSong function from the context with the appropriate songName
  //   playSong(songName);
  // };
  const handleDeleteSong = (songId) => {
    axios
      .delete(`http://localhost:8080/songs/${songId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Song deleted successfully");
          setalbums((prevAlbum) => ({
            ...prevAlbum,
            songs: prevAlbum.songs.filter((song) => song.song_id !== songId),
          }));
          deletesong(songId);
        } else {
          alert("Failed to delete the song");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting song");
      });
  };

  const handleAddsong = (e) => {
    e.preventDefault();
    const newSongData = new FormData();
    for (let i = 0; i < songData.songs.length; i++) {
      newSongData.append("song", songData.songs[i]);
    }
    axios
      .post(`http://localhost:8080/album/${albumId}`, newSongData, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.message);
        addsong(res.data.songDetails);
        setalbums((prevAlbum) => ({
          ...prevAlbum,
          songs: [...prevAlbum.songs, res.data.songDetails],
        }));
      })
      .catch((error) => {
        console.error(error);
        alert("Error adding song to the album");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/album/${albumId}`)
      .then((response) => {
        // console.log(response);

        setalbums(response.data[0]);
        // console.log(response.data[0]);
        // updateAlbumId(response.data[0].id);
        updatealbums(response.data);
        // setLoading(false);
        // console.log(loading);
        // updatealbums(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(true);
      });
  }, []);
  // useEffect(() => {
  //   setSongDetails(album.songs);
  // }, [albumId]);
  if (!album) {
    return <p>Waiting for data to load...</p>;
  }

  return (
    <div className="albumdetails">
      {/* {console.log(album)} */}
      <div className="album-left">
        <div className="image">
          {/* {console.log(album)} */}
          <img
            src={`http://localhost:8080/uploads/${album.coverImage}`}
            alt="Album Cover"
          />
        </div>

        {isEdit ? (
          <>
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
                onChange={(e) =>
                  handleFieldChange("releaseYear", e.target.value)
                }
              />
            </div>
            <div>
              <button onClick={handleUpdateClick} className="editbtn">
                Update
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{album.title}</h1>
            <h3>Artist: {album.artist}</h3>
            <h3>Genre: {album.genre}</h3>
            <h3>Release Year: {album.releaseYear}</h3>
            <span>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => handleDelete(albumId)}>Delete</button>
            </span>
          </>
        )}
      </div>
      <div className="album-right">
        <div className="addsong">
          <h4>Add New Song</h4>{" "}
          <form>
            <input
              type="file"
              accept="mp3"
              multiple
              name="songs"
              onChange={(e) =>
                setSongData({ ...songData, songs: e.target.files })
              }
            />
            <br />
            <button onClick={handleAddsong} className="addsongbtn">
              Submit
            </button>
          </form>
        </div>
        <h3>Songs:</h3>
        <table className="songTable">
          <thead className="thead">
            <tr>
              <td className="indexa">#</td>
              <td className="song_title">Song Name</td>
              <td className=" duration_a">
                <AccessTimeOutlinedIcon />
              </td>
              <td className="action-btn">Play</td>
              <td className="action-btn">Delete</td>
            </tr>
          </thead>
          <tbody>
            {album.songs ? (
              album.songs.map((song, index) => (
                <tr key={index}>
                  <td className="indexa">{index + 1}</td>
                  <td className="song_title">{song.song_filename}</td>
                  <td className="duration_a">
                    {formatDuration(song.duration)}
                  </td>
                  <td className="action-btn">
                    <button
                      onClick={() => {
                        if (isPlaying && currentSongId === song.song_id) {
                          pauseSong();
                        } else {
                          playSong(index);
                        }
                      }}
                      className="action-btnh"
                    >
                      {isPlaying && currentSongId === song.song_id ? (
                        <FaPause />
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteSong(song.song_id)}
                      className="action-btnh"
                    >
                      <MdDelete />
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
    </div>
  );
}

export default SingleAlbum;
