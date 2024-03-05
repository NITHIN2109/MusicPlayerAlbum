import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useSongContext } from "../../contexts/SongPlayContext";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
function AlbumDetails() {
  const {
    playSong,
    updatealbums,
    isPlaying,
    currentSongIndex,
    pauseSong,
    currentSongId,
  } = useSongContext();
  const [albums, setalbums] = useState();
  const [loading, setLoading] = useState(true);
  const { albumId } = useParams();
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/album/${albumId}`)
      .then((response) => {
        console.log(response);
        setalbums(response.data[0]);
        console.log(response.data[0]);
        setLoading(false);
        console.log(loading);
        updatealbums(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });

    // updateAlbumId(parseInt(albumId));

    // Update albums directly without indexing [0]
  }, [albumId]);

  const downloadFile = async (songId) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8080/song/${songId}`;
    link.setAttribute("download", `${songId}.mp3`);
    document.body.appendChild(link); // Append link to the body
    link.click();
    document.body.removeChild(link); // Remove link from the body after download
  };

  return (
    <div className="main_Container">
      <div className="album-details-container ">
        {loading ? (
          <p>Loading album details...</p>
        ) : albums ? (
          <div className="album-details-content">
            <div className="album-details-left">
              <img
                src={`http://localhost:8080/uploads/${albums.coverImage}`}
                alt="Album Cover"
                className="album-cover"
              />

              <div className="sub-heading">
                <h1 className="main-heading">{albums.title}</h1>
                <h3 className="sub">Artist: {albums.artist}</h3>
                <div className="genre">
                  <h3>
                    <span>
                      Genre: {albums.genre}
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <p className="tsongs">{albums.songs.length} songs </p>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="album-details-right">
              <div className="songs-list">
                <table className="songs-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th className="duration">
                        <AccessTimeOutlinedIcon />
                      </th>
                      <th>Listen</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.songs.map((song, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{song.song_filename.split(".mp3")[0]}</td>
                        <td className="duration">
                          {formatDuration(song.duration)}
                        </td>
                        <td className="Action">
                          <button
                            onClick={() => {
                              if (isPlaying && currentSongId === song.song_id) {
                                pauseSong();
                              } else {
                                playSong(index);
                              }
                            }}
                            className="PlayAction"
                          >
                            {isPlaying && currentSongId === song.song_id ? (
                              <FaPause />
                            ) : (
                              <FaPlay />
                            )}
                          </button>
                        </td>
                        <td>
                          <FileDownloadOutlinedIcon
                            className="PlayAction"
                            onClick={(e) => {
                              e.preventDefault();
                              downloadFile(song.song_id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="back-button"
                onClick={() => navigate("/dashboard")}
              >
                <IoMdArrowRoundBack />
              </button>
            </div>
          </div>
        ) : (
          <p>Album not found</p>
        )}
        {/* <SongPlayer /> */}
      </div>
    </div>
  );
}

export default AlbumDetails;
