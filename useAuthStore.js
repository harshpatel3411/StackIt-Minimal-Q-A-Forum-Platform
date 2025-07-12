import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/me', { withCredentials: true });
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    }
  },
  setUser: (user) => set({ user }),
  logout: async () => {
    await axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true });
    set({ user: null });
  }
}));

export default useAuthStore;
