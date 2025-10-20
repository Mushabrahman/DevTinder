const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  }
});

const profileUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // optionally restrict types
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  }
});

module.exports = profileUpload ;