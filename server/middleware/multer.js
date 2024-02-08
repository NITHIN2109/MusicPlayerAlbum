// middleware/multer.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "./uploads/"); // Destination for images
    } else if (file.fieldname === "song") {
      cb(null, "./songs/"); // Destination for songs
    } else {
      cb(new Error("Invalid field name"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const name = file.originalname.replace(ext, "") + "-" + uniqueSuffix + ext;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      // Accept JPG, JPEG, and PNG images
      cb(null, true);
    } else {
      cb(new Error("Invalid file type for image"), false);
    }
  } else if (file.fieldname === "song") {
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
      cb(null, true); // Accept only MP3 and WAV files for songs
    } else {
      cb(new Error("Invalid file type for song"), false);
    }
  } else {
    cb(new Error("Invalid field name"), false);
  }
};

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "image", maxCount: 1 }, // Expecting one image
  { name: "song", maxCount: 10 }, // Allowing up to 10 songs
]);
