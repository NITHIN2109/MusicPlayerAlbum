const express = require("express");
const route = express.Router();
const control = require("../controllers/control");
const admincontrol = require("../controllers/adminControlleer");
const { upload } = require("../middleware/multer");
const { verifyUser } = require("../middleware/verify");

route.post("/SignUp", control.createuser);
route.post("/Login", control.LoginUser);
route.get("/", control.verifyUSer);
route
  .route("/users/:id")
  .put(verifyUser, admincontrol.updateUsers)
  .delete(verifyUser, admincontrol.deleteUser);

route.post("/Album", upload, admincontrol.addalbum);
route.get("/uploads/:imagename", control.sendImage);
route.get("/songs/:songname", control.playmusic);
route.get("/song/:songid", control.songdownload);
// route.get("/liked_Songs/:userId", control.likedSongs);
// route.post("/liked-songs", control.addLikedSong);
// route.delete("/liked-songs", control.deleteLikedSong);

route.get("/albums", control.getalbums);
route
  .route("/album/:albumId")
  .get(admincontrol.getsingleAlbum)
  .post(verifyUser, upload, admincontrol.addSong)
  .put(verifyUser, admincontrol.updatealbum)
  .delete(verifyUser, admincontrol.deletealbum);

route
  .route("/users")
  .get(verifyUser, admincontrol.getsUsers)
  .post(verifyUser, admincontrol.createuser);

route.delete("/songs/:id", admincontrol.deleteSong);

module.exports = route;
