import React, { useState } from "react";
import AlbumList from "./AlbumList";
import AlbumDetails from "./AlbumDetails";
import { useAlbum } from "../../contexts/alubmscontext";

function UserDashboard() {
  const { albums } = useAlbum();
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const handleAlbumClick = (album) => {
    setSelectedAlbumId(album.id);
  };

  const handleBackToList = () => {
    setSelectedAlbumId(null); // Reset selected albumId state
  };

  return (
    <>
      {selectedAlbumId ? (
        <AlbumDetails
          albumId={selectedAlbumId}
          onBackToList={handleBackToList}
        />
      ) : (
        <div className="album-list-container">
          <AlbumList albums={albums} onAlbumClick={handleAlbumClick} />
        </div>
      )}
    </>
  );
}

export default UserDashboard;
