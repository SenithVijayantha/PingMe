import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not token. Login again",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized. Login again",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in protectRoute", error);
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
