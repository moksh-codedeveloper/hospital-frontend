// store/authStore.ts
import { create } from "zustand";
import axios from "@/utils/axios";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  appointments?: any[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/auth/me", { withCredentials: true });
      set({ user: res.data.user, loading: false });
    } catch (err) {
      console.error("Fetch user error:", err);
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful! 🎉");
      await useAuthStore.getState().fetchUser();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ loading: false });
    }
  },

  register: async ({ name, email, password, role }) => {
    try {
      set({ loading: true });
      await axios.post(
        "/auth/register",
        { name, email, password, role },
        { withCredentials: true }
      );
      toast("Registered successfully!", {
        action: {
          label: "🎉 click me",
          onClick: () => {
            // fireConfetti(); // you can define this somewhere
          },
        },
        style: {
          border: "1px solid #4caf50",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
        },
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      set({ user: null });
      toast.success("Logged out!");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  },
}));
