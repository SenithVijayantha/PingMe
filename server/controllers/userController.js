// Sign up

import { generateToken } from "../lib/utils";
import User from "../models/userModel";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const user = await User.findOne(email);

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

    res.status(201).json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in signup controller", error);
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
