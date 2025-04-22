// store/adminStore.ts
import { create } from "zustand";
import API from "@/utils/axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore"; // For shared actions

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin | null;
  loading: boolean;
  userType: string | null;
  fetchAdmin: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  loading: false,
  userType: null,

  // Function to fetch admin details
  fetchAdmin: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/admin/getAdmin", { withCredentials: true });
      set({ admin: res.data.admin, userType: "admin", loading: false });
      toast.success("Admin fetched successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to fetch admin data");
      console.error("Error fetching admin:", err);
    }
  },

  // Admin login
  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      const res = await API.post("/admin/loginAdmin", { email, password });
      toast.success("Admin login successful!");
      set({ userType: 'admin' }); // Set user type to admin after successful login
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Admin login failed");
    } finally {
      set({ loading: false });
    }
  },
  

  // Admin logout
  logout: async () => {
    try {
      await API.get("/admin/logoutAdmin", { withCredentials: true });
      set({ admin: null });
      toast.success("Admin logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  },
}));
