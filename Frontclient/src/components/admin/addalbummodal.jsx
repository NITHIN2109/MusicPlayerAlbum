// Modal.js
import React from "react";
import { IoClose } from "react-icons/io5";
function Modal({
  showModal,
  toggleModal,
  handleFormSubmit,
  handleSongFileChange,
  formdata,
  setformdata,
}) {
  return (
    <>
      {showModal && (
        <div className={`overlay ${showModal ? "active" : ""}`}>
          <div className="content">
            <form
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
              className="addalbumform"
            >
              <label>Title </label>
              <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={(e) =>
                  setformdata({ ...formdata, title: e.target.value })
                }
                required
              />

              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={formdata.genre}
                onChange={(e) =>
                  setformdata({ ...formdata, genre: e.target.value })
                }
                required
              />

              <label>Release Year</label>
              <input
                type="number"
                name="releaseYear"
                value={formdata.releaseYear}
                onChange={(e) =>
                  setformdata({ ...formdata, releaseYear: e.target.value })
                }
                required
              />

              <label>Artist</label>
              <input
                type="text"
                name="artist"
                value={formdata.artist}
                onChange={(e) =>
                  setformdata({ ...formdata, artist: e.target.value })
                }
                required
              />

              <label>Cover Image</label>
              <input
                type="file"
                name="coverImage"
                onChange={(e) =>
                  setformdata({ ...formdata, image: e.target.files[0] })
                }
              />
              <label> Songs</label>
              <input
                type="file"
                name="songs"
                multiple
                onChange={handleSongFileChange}
              />
              <br></br>
              <button type="submit" className="btn-submitalbum album">
                Submit
              </button>
              <button className="btn-closealbum album" onClick={toggleModal}>
                <IoClose />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
