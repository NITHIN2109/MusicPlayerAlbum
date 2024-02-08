import React from "react";
import { useAlbum } from "../../contexts/alubmscontext";
// import "./AlbumList.css"; // Import CSS file for styling

function AlbumList({ onAlbumClick }) {
  const { albums } = useAlbum();

  return (
    <div className="album-list">
      {albums.map((album) => (
        <div
          key={album.id}
          className="album-card"
          onClick={() => onAlbumClick(album)}
        >
          <img
            src={`http://localhost:8080/uploads/${album.coverImage}`}
            alt="Album Cover"
            className="album-cover"
          />
          <div className="album-details">
            <p className="album-title">{album.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;
