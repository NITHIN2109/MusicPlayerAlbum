import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authcontext";

export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8080/albums")
        .then((response) => {
          setAlbums(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching album data:", error);
        });
    }
  }, [isLoggedIn]);
  const refreshAlbums = () => {
    axios
      .get("http://localhost:8080/albums", { withCredentials: true })
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing album data:", error);
      });
  };
  return (
    <AlbumContext.Provider value={{ albums, refreshAlbums }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => {
  return useContext(AlbumContext);
};
