import { create } from "zustand";
import API from "@/utils/axios";
import { toast } from "sonner";
import { fireConfetti } from "@/lib/confetti";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  appointments?: any[];
}

interface AuthState {
  user: User | null;
  userType: string | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { username: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  userType: null,

  // Fetching user based on the token
  fetchUser: async () => {
    try {
      set({ loading: true });
      // Send request to /auth/profile or the appropriate endpoint in your backend
      const res = await API.get("/auth/me", { withCredentials: true });

      // If successful, set the user data in the store
      set({ user: res.data.user, userType: res.data.user.role, loading: false });
    } catch (err: any) {
      console.error("Fetch user error:", err);
      set({ loading: false });
      toast.error(err.response?.data?.message || "Failed to fetch user data. Please try again.");
    }
  },

  // Login process
  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      await API.post(
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

  // Register process
  register: async ({ username, email, password, role }) => {
    try {
      set({ loading: true });
      console.log("Registering user:", { username, email, password, role });
      const res = await API.post(
        "/auth/register",
        { username, email, password, role }
      );
      console.log("Registration response:", res.data);
      if (res.status === 200) {
        toast("Registered successfully!", {
          icon: "🎉",
          style: {
            border: "1px solid #4caf50",
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
          },
        });
        fireConfetti();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ loading: false });
    }
  },

  // Logout process
  logout: async () => {
    try {
      await API.get("/auth/logout", { withCredentials: true });
      set({ user: null });
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  },
}));

