const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const uploadMiddleware = require("../middleware/uploadMiddleware"); // import the upload middleware

const router = express.Router();
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", uploadMiddleware.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`; // construct the image URL
  // Save the image URL to the user's profile in the database if needed
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: req.file.path,
    imageUrl: imageUrl, // send the image URL back to the client
  });
});

module.exports = router;
