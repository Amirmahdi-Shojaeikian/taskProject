const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"..", "upload"));
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + Math.random();
    const ext = path.extname(file.originalname);

    // const validFormats = [".jpg", ".jpeg", ".png"];
    const validMimeTypes = ["image/jpg", "image/jpeg", "image/png","application/pdf"];

    if (validMimeTypes.includes(file.mimetype)) {
      cb(null, `${filename}${ext}`);
    } else {
      cb(new Error("Only .jpg | .jpeg | .png are valid files"));
    }
  },
});

const maxSize = 100 * 1000 * 1000; // KB => Kilo = هزار

const uploader = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = uploader;