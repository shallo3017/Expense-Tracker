const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//Register user
exports.registerUser = async (req, res) => {
  console.log("Request body:", req.body);
  const { fullName, email, password, profileImageUrl } = req.body;

  console.log("Extracted fields:", {
    fullName,
    email,
    password,
    profileImageUrl,
  });

  //Validation: check for missiing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    //Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//getUserInfo user
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user info:", error);
    res.status(500).json({ message: "Server error" });
  }
};
