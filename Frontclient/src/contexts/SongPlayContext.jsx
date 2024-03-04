import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./authcontext";
export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [album, setAlbum] = useState(null);

  const [Albumid, setAlbumId] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSongName, setCurrentSongName] = useState("");
  const [currentSongId, setCurrentSongId] = useState("");
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isLoggedIn } = useAuth();
  const updatealbums = (newalbum) => {
    console.log(newalbum);
    setLoading(false);
    setAlbum(newalbum[0]);
  };
  useEffect(() => {
    if (audio) {
      audio.src = `http://localhost:8080/songs/${currentSongId}`;
      audio.play();
    }
  }, [currentSongId, audio]);
  useEffect(() => {
    if (!isLoggedIn) {
      stopPlayer();
    }
  }, [isLoggedIn]);
  const updateAlbumId = (newAlbumId) => {
    setAlbumId(newAlbumId);
  };

  const playSong = (songIndex, progress) => {
    // console.log(album);
    if (!album || !album.songs || album.songs.length === 0) {
      console.error("Album or songs array is empty");
      return;
    }
    if (!album.songs[songIndex]) {
      console.error("Invalid song index");
      return;
    }
    setCurrentSongIndex(songIndex);
    setCurrentSongName(album.songs[songIndex].song_filename);
    setCurrentSongId(album.songs[songIndex].song_id);
    setIsPlaying(true);

    if (audio) {
      audio.src = `http://localhost:8080/songs/${album.songs[songIndex].song_id}`;
      audio.load();
      audio.addEventListener("canplaythrough", () => {
        if (
          progress !== undefined &&
          progress !== null &&
          progress >= 0 &&
          progress <= 100 &&
          isFinite(audio.duration) &&
          audio.duration > 0
        ) {
          audio.currentTime = (progress / 100) * audio.duration;
        }
        audio.play();
      });
    } else {
      const newAudio = new Audio(
        `http://localhost:8080/songs/${album.songs[songIndex].song_id}`
      );
      newAudio.addEventListener("loadedmetadata", () => {
        if (
          progress !== undefined &&
          progress !== null &&
          progress >= 0 &&
          progress <= 100 &&
          isFinite(newAudio.duration) &&
          newAudio.duration > 0
        ) {
          newAudio.currentTime = (progress / 100) * newAudio.duration;
        }
        newAudio.play();
      });
      setAudio(newAudio);
    }
  };

  const pauseSong = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const stopSong = () => {
    setCurrentSongName("");
  };
  const stopPlayer = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playNextSong = () => {
    if (!album || !album.songs || album.songs.length === 0) {
      return;
    }
    const nextIndex = (currentSongIndex + 1) % album.songs.length;
    playSong(nextIndex);
  };

  const playPreviousSong = () => {
    if (!album || !album.songs || album.songs.length === 0) {
      return;
    }
    const previousIndex =
      (currentSongIndex - 1 + album.songs.length) % album.songs.length;
    playSong(previousIndex);
  };
  const seekToTime = (time) => {
    if (!audio) return;
    audio.currentTime = time;
    // playSong();
    getDuration();
    getCurrentTime();
    if (isPlaying) {
      resumeSong();
      setIsPlaying(true);
    } else {
      pauseSong();
      setIsPlaying(true);
    }
  };

  const getDuration = () => {
    return audio ? audio.duration : 0;
  };

  const getCurrentTime = () => {
    return audio ? audio.currentTime : 0;
  };
  const deletesong = (songId) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      songs: prevAlbum.songs.filter((song) => song.song_id !== songId),
    }));
  };

  const addsong = (newSongDetails) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      songs: [...prevAlbum.songs, newSongDetails],
    }));
  };
  const cleardata = () => {
    stopPlayer();
    setAlbum(null);
    setAlbumId("");
    setLoading(true);
    setCurrentSongIndex(0);
    setCurrentSongName("");
    setCurrentSongId("");
    setAudio(null);
    setIsPlaying(false);
  };

  const contextValue = {
    album,
    loading,
    currentSongName,
    currentSongId,
    Albumid,
    currentSongIndex,
    isPlaying,
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    playNextSong,
    playPreviousSong,
    updateAlbumId,
    seekToTime,
    getDuration,
    getCurrentTime,
    deletesong,
    addsong,
    updatealbums,
    cleardata,
  };
  return (
    <SongContext.Provider value={contextValue}>{children}</SongContext.Provider>
  );
};

export const useSongContext = () => {
  return useContext(SongContext);
};
