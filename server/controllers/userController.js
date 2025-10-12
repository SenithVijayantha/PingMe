import bcrypt from "bcryptjs";

import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

const isProduction = process.env.NODE_ENV === "prod";

// Sign up
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      userData: newUser,
      message: "Account created successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in signup controller", error);
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateToken(userData._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      userData,
      message: "User Logged in successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in login controller", error);
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "pro",
    sameSite: "Strict",
    expires: new Date(0),
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

// Checks if user is authenticated
export const checkAuth = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// Updates user profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    return res.json({ success: true, user: updateProfile });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in updateProfile", error);
    }
    return res.status(500).json({ success: false, user: updateProfile });
  }
};
