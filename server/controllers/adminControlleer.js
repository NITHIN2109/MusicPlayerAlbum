const db = require("../model/adminmodel");

const path = require("path");
exports.getsUsers = (req, res) => {
  db.getAllUser((result, err) => {
    if (err) {
      return res.status(500).json({ Error: "Internal server error" });
    } else {
      return res.status(200).send(result);
    }
  });
};

exports.updateUsers = (req, res) => {
  let id = req.params.id;
  let updeteUserdetails = req.body;
  if (
    !updeteUserdetails.Name ||
    !updeteUserdetails.Email ||
    !updeteUserdetails.Password ||
    !updeteUserdetails.role
  ) {
    return res.status(400).json("Enter all fields");
  } else {
    db.updateUserDetails(id, updeteUserdetails, (err, response) => {
      if (err) {
        // console.log(err);
        return res.status(500).json("Internal server error");
      } else if (response.affectedRows === 1) {
        res.status(200).json({
          message: "Updated successfully",
          details: updeteUserdetails,
        });

        return;
      } else {
        return res.status(401).json({ message: "User not found" });
      }
    });
  }
};

exports.createuser = (req, res) => {
  const userdeatils = req.body;
  if (
    !userdeatils.Name ||
    !userdeatils.Email ||
    !userdeatils.Password ||
    !userdeatils.role
  ) {
    return res.json({ Error: "Include all details" });
  }
  db.createuser(userdeatils, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: "Unable to register", details: err });
    }
    if (result && result.alreadyExists) {
      return res.json({ message: "User already exists" });
    }
    userdeatils.id = result;
    return res.status(201).json({
      message: "Successfully registered",
      details: userdeatils,
      id: result.insertedId,
    });
  });
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  db.deleteUser(id, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error in deleting");
    }
    return res.status(200).json("deleted");
  });
};

exports.addalbum = (req, res) => {
  let albumDetails = req.body;
  const songs = req.files["song"];
  var { title, genre, releaseYear, artist } = albumDetails;
  if (!title || !genre || !artist || !releaseYear || !songs) {
    return res.json({
      error: "Provide complete Album Details and select at least one song",
    });
  }
  const imageurl = req.files["image"][0].filename;
  db.addAlbum(title, genre, artist, releaseYear, imageurl, (err, albumId) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    songs.forEach((song) => {
      const songDetails = {
        album_id: albumId,
        song_id: song.filename,
        song_name: song.originalname,
      };
      db.addSong(songDetails, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error adding song details" });
        }
      });
    });

    res.status(201).json({ message: "Album and songs added successfully" });
  });
};

exports.getsingleAlbum = (req, res) => {
  let id = req.params.albumId;
  db.getsingleAlbum(id, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error in getting album detils" });
    } else if (result) {
      return res.status(200).send(result);
    }
  });
};

exports.updatealbum = (req, res) => {
  let id = req.params.albumId;
  let updatealbum = req.body;
  if (
    !updatealbum.title ||
    !updatealbum.genre ||
    !updatealbum.releaseYear ||
    !updatealbum.artist
  ) {
    return res.status(400).json({ Error: "Provide all fields Details" });
  }
  db.updatealbum(updatealbum, id, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Internal server error" });
    } else if (result.affectedRows == 0) {
      return res.status(404).json({ message: "Album not found" });
    } else {
      return res.status(200).json({ message: "Updated successfull" });
    }
  });
};

exports.deletealbum = (req, res) => {
  let id = req.params.albumId;
  console.log(id);
  db.deleteAlbum(id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Internal server error " });
    }
    return res.status(200).json({ message: "Deleted Successful" });
  });
};

exports.deleteSong = (req, res) => {
  const songId = req.params.id;
  db.deleteSongById(songId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};

exports.addSong = (req, res) => {
  const album_Id = req.params.albumId;
  const songs = req.files["song"];

  const songDetails = {
    album_id: album_Id,
    song_id: songs[0].filename,
    song_name: songs[0].originalname.split(".mp3")[0],
  };
  console.log(songs);
  db.addSong(songDetails, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error adding song details" });
    } else {
      return res.status(201).json({
        songDetails: result,
        message: "Added Song Successfully",
      });
    }
  });
};
