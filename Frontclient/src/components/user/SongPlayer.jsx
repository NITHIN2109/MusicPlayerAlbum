import React, { useEffect, useState } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import { useSongContext } from "../../contexts/SongPlayContext";

import "./songPlayer.css";

function SongPlayer() {
  const {
    isPlaying,
    currentSongName,
    currentSongIndex,
    playNextSong,
    playPreviousSong,
    pauseSong,
    resumeSong,
    getDuration,
    getCurrentTime,
    seekToTime,
  } = useSongContext();
  // const [isPlaying, setisPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const currentTime = getCurrentTime();
        const duration = getDuration();
        if (currentTime && duration) {
          const progressPercentage = (currentTime / duration) * 400;
          setProgress(progressPercentage);
          console.log(formatTime(currentTime));
          console.log(progress);
          // console.log(duration)
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  const handleSeekToTime = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 400) * getDuration();
    seekToTime(newTime);
    if (isPlaying) {
      resumeSong();
    } else {
      pauseSong();
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
      // setisPlaying(!isPlaying);
    } else {
      resumeSong();
      // setisPlaying(!isPlaying);
    }
  };

  return (
    <div className="currently-playing">
      <h3>{currentSongName}</h3>
      <div className="progress">
        <div className="progress-bar-wrapper">
          <span>{formatTime(getCurrentTime())}</span>
          <div className="progress-bar">
            <input
              type="range"
              className="progress-range"
              min="0"
              max="400"
              onChange={handleSeekToTime}
              value={progress}
            />
          </div>
          <span className="time-display">
            {getDuration() ? formatTime(getDuration()) : "00:00"}
          </span>
        </div>
      </div>
      <div className="player-controls">
        <button className="previous-icon" onClick={playPreviousSong}>
          <MdSkipPrevious />
        </button>
        <button className=" Pause_Play" onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="next-icon" onClick={playNextSong}>
          <MdSkipNext />
        </button>
      </div>
    </div>
  );
}
export default SongPlayer;
