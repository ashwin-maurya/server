import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken";
import User from "../Model/userSchema.js";

export const register = async (req, res) => {
  try {
    const { fullName, username, email, password, gender } = req.body;
    const avatar = req.file ? req.file.filename:null;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      fullName,
      username,
      email,
      avatar,
      gender,
      password: hashPassword,
    });

    const { password: _, ...userData } = newUser.toObject();
    res
      .status(201)
      .json({ message: "User created successfully", user: userData });
    console.log("New user created:", newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      console.error("Error creating user:", error.message);
      res.status(500).json({ message: "Failed to create user!" });
    }
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userInfo } = user.toObject();
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
