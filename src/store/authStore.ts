// store/authStore.ts
import { create } from "zustand";
import API from "@/utils/axios";
import { toast } from "sonner";
import { fireConfetti } from "@/lib/confetti";

interface User {
  _id: string;
  name: string;
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
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  loginDoctor: (data: { email: string; password: string }) => Promise<void>;
  loginAdmin: (data: { email: string; password: string }) => Promise<void>;
  addDoctor: (data: { name: string; email: string; password: string, specialisation: string, expirence: string }) => Promise<void>;
  getAdmin: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  userType: null,

  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/auth/me", { withCredentials: true });
     const user = res.data.user;
      set({ user, userType: res.data.user.role, loading: false });
    } catch (err) {
      console.error("Fetch user error:", err);
      set({ loading: false });
    }
  },

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
  loginDoctor: async ({ email, password }) => {
    try {
      set({ loading: true });
      await API.post("/doctor/login", { email, password }, { withCredentials: true });
      toast.success("Doctor Login successful!");
      await useAuthStore.getState().fetchUser();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Doctor login failed");
    } finally {
      set({ loading: false });
    }
  },

  loginAdmin: async ({ email, password }) => {
    try {
      set({ loading: true });
      await API.post("/admin/loginAdmin", { email, password });
      toast.success("Admin Login successful!");
      await useAuthStore.getState().getAdmin();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Admin login failed");
      console.log("Admin login error:", err);
    } finally {
      set({ loading: false });
    }
  },
  getAdmin: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/admin/getAdmin", { withCredentials: true });
  
      const admin = res.data.admin;
      if (!admin) throw new Error("No admin data received");
  
      set({
        user: admin,
        userType: admin.role || "admin",
        loading: false,
      });
  
      toast.success("Admin fetched successfully!");
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch admin");
      console.error("Error fetching admin:", error);
    }
  },
  addDoctor: async (data) => {
    const { name, email, password, expirence, specialisation } = data;
    const { userType } = useAuthStore.getState();
    
    if (userType !== "admin") {
      toast.error("Only admins can add doctors.");
      return;
    }

    try {
      set({ loading: true });
      const res = await API.post("/doctors/create", {
        name,
        email,
        password,
        expirence,
        specialisation,
      });

      if (res.status === 200) {
        toast.success("Doctor added successfully!");
      } else {
        toast.error("Failed to add doctor.");
      }
    } catch (err) {
      toast.error("Error adding doctor");
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  register: async ({ name, email, password, role }) => {
    try {
      set({ loading: true });
      await API.post(
        "/auth/register",
        { name, email, password, role },
        { withCredentials: true }
      );
      toast("Registered successfully!", {
        icon: "🎉",
        style: {
          border: "1px solid #4caf50",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
        },
      });
      fireConfetti();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ loading: false });
    }
  },

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
