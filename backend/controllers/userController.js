import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let verifiedPassword = await bcrypt.compare(password, user.password);
  if (!verifiedPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
    followers: user.followers,
    following: user.following,
  });
});

// @desc register user & get token
// @route POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    password: hashedPassword,
    email,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  if (newUser) {
    res.status(201);
    res.json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
      // followers: userExist.followers,
      // following: userExist.following,
    });
  }
});

// @desc Get all users
// @route GET /api/users/allUsers
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select(
    "-password -email -followers -following"
  );
  const filtered = users.filter(
    (user) => user._id.toString() !== req.user._id.toString()
  );
  res.json(filtered);
});

// @desc Follow
// @route Post /api/users/follow
// @access Private
export const followUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.body.id,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  );
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.body.id },
    },
    { new: true }
  );

  res.json({ message: "Done" });
});
