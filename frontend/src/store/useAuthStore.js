import { create } from 'zustand';
import { io } from 'socket.io-client';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

// ✅ Use proper VITE_API_URL for deployment
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  // ---------------- CHECK AUTH ----------------
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log('Error in authCheck:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ---------------- SIGNUP ----------------
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account created successfully!');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ---------------- LOGIN ----------------
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ---------------- LOGOUT ----------------
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
      get().disconnectSocket();
    } catch (error) {
      console.log('Logout error:', error);
      toast.error('Error logging out');
    }
  },

  // ---------------- UPDATE PROFILE ----------------
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.log('Error in update profile:', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  },

  // ---------------- CONNECT SOCKET ----------------
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    // ✅ Pass JWT token in auth
    const socket = io(BASE_URL, {
      auth: {
        token: authUser?.token, // must match backend socketAuthMiddleware
      },
      withCredentials: true,
    });

    socket.connect();

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    set({ socket });
  },

  // ---------------- DISCONNECT SOCKET ----------------
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
