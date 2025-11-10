import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ENV } from '../lib/env.js';

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Try extracting token from multiple sources
    let token = null;

    // ✅ 1️⃣ From socket auth payload (frontend sends in io({ auth: { token } }))
    if (socket.handshake.auth?.token) {
      token = socket.handshake.auth.token;
    }

    // ✅ 2️⃣ Or from cookies (for http-only cookie setup)
    if (!token && socket.handshake.headers.cookie) {
      token = socket.handshake.headers.cookie
        ?.split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
    }

    // ❌ No token found
    if (!token) {
      console.log('❌ Socket connection rejected: No token provided');
      return next(new Error('Unauthorized - No Token Provided'));
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded?.userId) {
      console.log('❌ Socket connection rejected: Invalid token payload');
      return next(new Error('Unauthorized - Invalid Token'));
    }

    // ✅ Find user in DB
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      console.log('❌ Socket connection rejected: User not found');
      return next(new Error('User not found'));
    }

    // ✅ Attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`✅ Socket authenticated: ${user.fullName} (${user._id})`);
    next();
  } catch (error) {
    console.log('❌ Error in socket authentication:', error.message);
    next(new Error('Unauthorized - Authentication failed'));
  }
};
