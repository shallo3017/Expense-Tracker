const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
      expired: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
        expired: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired, please login again",
        expired: true,
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        expired: false,
      });
    } else if (error.name === "NotBeforeError") {
      return res.status(401).json({
        message: "Token not active yet",
        expired: false,
      });
    }

    // Generic error
    res.status(401).json({
      message: "Not authorized, token failed",
      expired: false,
    });
  }
};
