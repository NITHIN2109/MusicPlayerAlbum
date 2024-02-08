const express = require("express");
const route = express.Router();
const control = require("../controllers/control");
const admincontrol = require("../controllers/adminControlleer");
const { upload } = require("../middleware/multer");
// const { songUpload } = require("../middleware/songsmulter");
const { verifyUser } = require("../middleware/verify");

route.post("/signUp", control.createuser);
route.post("/Login", control.LoginUser);
route.get("/", control.verifyUSer);
route
  .route("/users/:id")
  .put(verifyUser, admincontrol.updateUsers)
  .delete(verifyUser, admincontrol.deleteUser);
route.post("/Album", upload, admincontrol.addalbum);
route.get("/uploads/:imagename", control.sendImage);
route.get("/songs/:songname", control.playmusic);

route.get("/albums", control.getalbums);
route
  .route("/album/:albumId")
  .get(admincontrol.getsingleAlbum)
  .put(verifyUser, admincontrol.updatealbum)
  .delete(verifyUser, admincontrol.deletealbum);
route
  .route("/users")
  .get(verifyUser, admincontrol.getsUsers)
  .post(verifyUser, admincontrol.createuser);

route.delete("/songs/:id", admincontrol.deleteSong);

module.exports = route;
