import jwt from 'jsonwebtoken';
import ENV from '../lib/env.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
export const protectedRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({
      message: 'cookie not founds',
    });
  }
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
  const verifiedUser = await User.findById(decoded.userId).select('-password');
  if (!verifiedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  req.user = verifiedUser;
  next();
});
