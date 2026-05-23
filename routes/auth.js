import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 14);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "user registered successfuly" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error during registration process",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials or wrong password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "user logged in successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error during login process",
    });
  }
});

export default router;
