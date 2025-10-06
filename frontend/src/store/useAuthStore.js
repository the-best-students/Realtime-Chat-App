import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,

  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post('http://localhost:3000/auth/register', data);
      set({ authUser: res.data });

      toast.success('Account created successfully!');
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post('http://localhost:3000/auth/login', data);
      set({ authUser: res.data });

      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    set({
      isLoggingOut: true,
    });
    try {
      await axios.post('http://localhost:3000/auth/logout');
      set({ authUser: null });

      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isLoggingOut: false,
      });
    }
  },
}));
