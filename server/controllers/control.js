const db = require("../model/loginmodel");
// const songdb = require("../model/songs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();
exports.createuser = (req, res) => {
  const userdeatils = req.body;
  if (!userdeatils.Name || !userdeatils.Email || !userdeatils.Password) {
    return res.json({ Error: "Include all details" });
  }
  db.createuser(userdeatils, (result, err) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: "Unable to register", details: err });
    }
    if (result && result.alreadyExists) {
      return res.json({ message: "User already exists" });
    }
    return res.status(201).json({ message: "Successfully registered" });
  });
};

exports.LoginUser = (req, res) => {
  let loginDetails = req.body;
  console.log(loginDetails);
  db.LoginUser(loginDetails, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Internal Server Error" });
    } else if (result.Message === "Login Successfull") {
      const name = result[0].Name;
      const token = jwt.sign(
        { name: name, role: result[0].role },
        process.env.Secret_key,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      const isadmin = result[0].role === "admin";
      return res
        .status(200)
        .json({ message: "Login Successfull", isadmin: isadmin });
    } else if (result.Message === "Wrong password") {
      return res.status(401).json({ message: "Wrong password" });
    } else {
      return res.status(401).json({ message: "Inavlid Username" });
    }
  });
};

exports.verifyUSer = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      auth: false,
      message: "Notoken provided.",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.Secret_key);
    const username = decode.name;
    return res.status(200).json({
      auth: true,
      name: username,
      message: "token Verfied successfull",
      isadmin: decode.role === "admin" ? true : false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error");
  }
};

exports.sendImage = (req, res) => {
  const imagename = req.params.imagename;
  const readstream = fs.createReadStream(`./uploads/${imagename}`);
  readstream.on("data", (chunk) => {
    res.write(chunk);
  });
  readstream.on("end", () => {
    res.end();
  });
  readstream.on("error", () => {
    res.status(404).json({ Error: "File not found" });
  });
};
exports.getalbums = (req, res) => {
  db.getalbums((err, output) => {
    if (err) {
      res.status(500).json("Internal server error");
    } else {
      res.status(200).send(output);
    }
  });
};

exports.playmusic = (req, res) => {
  const songName = req.params.songname;
  const filePath = `./songs/${songName}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading audio file:", err);
      return res.status(500).json({ error: "Error reading audio file" });
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(data);
  });
};

const path = require("path");

exports.songdownload = (req, res) => {
  const songname = req.params.songid;
  const filePath = path.join(__dirname, "../songs", songname);
  console.log(filePath);
  res.download(filePath, (err, result) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Internal Server Error");
    }
    console.log(result);
  });
};

// exports.likedSongs = (req, res) => {
//   const userid = req.params.userId;
//   songdb.likedSongs(userid, (err, songs) => {
//     if (err) {
//       res.status(500).json("Server Error");
//       console.log(err);
//     } else {
//       res.status(200).json(songs);
//     }
//   });
// };
// exports.addLikedSong = (req, res) => {
//   const { user_id, song_id } = req.body;

//   songdb.addlikedsongs(user_id, song_id, (err, result) => {
//     if (err) {
//       console.error("Error adding liked song: ", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.status(201).json({ message: "Liked song added successfully" });
//   });
// };

// exports.deleteLikedSong = (req, res) => {
//   const { user_id, song_id } = req.body;

//   songdb.deleteLikedSong(user_id, song_id, (err, result) => {
//     if (err) {
//       console.error("Error deleting liked song: ", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.status(200).json({ message: "Liked song deleted successfully" });
//   });
// };
