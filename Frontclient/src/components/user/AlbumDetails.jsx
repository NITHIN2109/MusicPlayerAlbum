import React, { useState, useEffect } from "react";
import axios from "axios";

function AlbumDetails({ albumId, onBackToList }) {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSongName, setCurrentSongName] = useState("");
  const MAX_DURATION_IN_SECONDS = 300; // Example maximum duration of 5 minutes

  // Helper function to format duration from seconds to "mm:ss" format
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/album/${albumId}`
        );
        setAlbum(response.data[0]); // Assuming the response contains a single album object
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    fetchAlbumDetails();
    return () => {};
  }, [albumId]);

  const handlePlaySong = (songName) => {
    // Set the current song name
    setCurrentSongName(songName);
  };

  const handleStopSong = () => {
    setCurrentSongName("");
  };

  return (
    <div className="album-details-container">
      {loading ? (
        <p>Loading album details...</p>
      ) : album ? (
        <div className="album-details-content">
          <div className="album-details-left">
            <img
              src={`http://localhost:8080/uploads/${album.coverImage}`}
              alt="Album Cover"
              className="album-cover"
            />
            <h2>Rating: {album.rating}</h2>
          </div>
          <div className="album-details-right">
            <h1 className="main-heading">{album.title}</h1>
            <div className="sub-heading">
              <h3 className="sub">Artist: {album.artist}</h3>
              <h3 className="sub">Genre: {album.genre}</h3>
            </div>
            <div className="songs-list">
              <table>
                <thead>
                  <tr>
                    <th>Sl. No</th>
                    <th>Song Name</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {album.songs.map((song, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{song.song_filename}</td>
                      <td>{formatDuration(song.duration)}</td>
                      <td>
                        <button onClick={() => handlePlaySong(song.song_id)}>
                          Play
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="back-button" onClick={onBackToList}>
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>Album not found</p>
      )}

      {/* Display currently playing song at the bottom */}
      {currentSongName && (
        <div className="currently-playing">
          <p>Currently playing: {currentSongName}</p>
          <audio
            controls
            autoPlay
            onTimeUpdate={(e) => {
              if (e.target.currentTime >= MAX_DURATION_IN_SECONDS) {
                e.target.pause();
              }
            }}
            src={`http://localhost:8080/songs/${currentSongName}`}
            type="audio/mpeg"
          >
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleStopSong} className="stop">
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default AlbumDetails;
