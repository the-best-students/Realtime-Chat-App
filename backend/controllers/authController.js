// Controller for authentication-related actions

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Add `.js` if you're using ESM
import { generateToken } from '../lib/utils.js';
import { cloudinary } from '../lib/configCloudinary.js';

// (e.g., login, signup, logout)

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  // Normalize and trim email
  email = email.trim().toLowerCase();

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Validate password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Generate token and send response
  try {
    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error('Token generation failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const register = asyncHandler(async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  // Validate required fields
  if (!email || !fullName || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters' });
  }

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = await User.create({
    email,
    fullName,
    password: hashedPassword,
    profilePic,
  });

  // Generate token and send response
  try {
    generateToken(newUser._id, res);

    return res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error('Token generation failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const logout = (req, res) => {
  // Handle logout logic
  res.cookie('jwt', '', {
    maxAge: 0, // MS
  });
  res.status(200).json({ message: 'Logout successful' });
};

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName)
    return res.status(400).json({ message: 'fullName is required' });
  const userId = req.user._id;
  // const uploadResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullName,
      email,
      // profilePic: uploadResponse.secure_url,
    },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

const checkedUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  res.status(200).json(req.user);
});

export { login, register, logout, updateProfile, checkedUser };
