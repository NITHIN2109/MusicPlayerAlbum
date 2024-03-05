import React from "react";
import AlbumList from "./AlbumList";
import { useAlbum } from "../../contexts/alubmscontext";
import { useNavigate } from "react-router";

function UserDashboard() {
  const navigate = useNavigate();
  const { albums } = useAlbum();

  const handleAlbumClick = (album) => {
    navigate(`/Album/${album.id}`);
  };

  return (
    <div className="main_Container">
      <div className="album-list-container">
        <AlbumList albums={albums} onAlbumClick={handleAlbumClick} />
      </div>
    </div>
  );
}

export default UserDashboard;
