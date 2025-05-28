const multer = require("multer");

//configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // create a unique filename
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    ); // reject the file
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
  fileFilter: fileFilter,
});
module.exports = upload;
