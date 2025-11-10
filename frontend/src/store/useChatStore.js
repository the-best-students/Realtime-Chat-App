import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled') || 'false'),

  // ------------------ UI state ------------------
  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem('isSoundEnabled', JSON.stringify(newValue));
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // ------------------ API calls ------------------
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/contacts');
      set({ allContacts: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load contacts');
      set({ allContacts: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/chats');
      set({ chats: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load chats');
      set({ chats: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load messages');
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ------------------ Sending messages ------------------
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) return toast.error('No user selected');

    const { messages } = get();
    const { authUser } = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Add optimistic message
    set({
      messages: [
        ...(Array.isArray(messages) ? messages : []),
        optimisticMessage,
      ],
    });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      // Replace optimistic message with server response
      set({
        messages: [
          ...(Array.isArray(messages) ? messages : []).filter(
            (m) => m._id !== tempId
          ),
          res.data,
        ],
      });
    } catch (error) {
      // Remove optimistic message on failure
      set({ messages: Array.isArray(messages) ? messages : [] });
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // ------------------ Socket.IO ------------------
  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on('newMessage', (newMessage) => {
      const currentMessages = Array.isArray(get().messages)
        ? get().messages
        : [];
      if (newMessage.senderId !== selectedUser._id) return;

      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio('/sounds/notification.mp3');
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((e) => console.log('Audio play failed:', e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off('newMessage');
  },
}));
