import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAlbum } from "../../contexts/alubmscontext";
import { FaSearch } from "react-icons/fa";

import "./Search.css";

function Search() {
  const { albums } = useAlbum();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="main_Container">
      <div className="search-header">
        <h1>Search</h1>
        <span>
          <FaSearch className="searchBar-icon" />
          <input
            type="text"
            placeholder="Search albums"
            value={searchQuery}
            onChange={handleInputChange}
            className="searchBar"
          />
        </span>
      </div>
      <div className="album-list">
        {filteredAlbums.map((album) => (
          <Link
            key={album.id}
            to={`/Album/${album.id}`}
            className="album-card-link"
          >
            <div className="album-card">
              <img
                src={`http://localhost:8080/uploads/${album.coverImage}`}
                alt="Album Cover"
                className="album-cover"
              />
              <div className="album-details">
                <p className="album-title">{album.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
