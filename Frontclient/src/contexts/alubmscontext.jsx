import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authcontext";

export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8080/albums")
        .then((response) => {
          setAlbums(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching album data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AlbumContext.Provider value={{ albums, refreshAlbums }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => {
  return useContext(AlbumContext);
};
