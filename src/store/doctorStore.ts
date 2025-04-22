// store/doctorStore.ts
import { create } from "zustand";
import API from "@/utils/axios";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialisation: string;
  experience: string;
}

interface DoctorState {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  fetchDoctors: () => Promise<void>; // Fetch all doctors
  fetchDoctor: (doctorId: string) => Promise<void>; // Fetch single doctor by ID
  addDoctor: (doctor: Doctor) => Promise<void>;
  updateDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (doctorId: string) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
}

export const useDoctorStore = create<DoctorState>((set) => ({
  doctors: [],
  doctor: null,
  loading: false,
//   const router = useRouter(),

  fetchDoctors: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/doctors", { withCredentials: true });
      set({ doctors: res.data.doctors, loading: false });
      toast.success("Doctors fetched successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to fetch doctors");
      console.error("Error fetching doctors:", err);
    }
  },

  fetchDoctor: async (doctorId) => {
    try {
      set({ loading: true });
      const res = await API.get(`/doctors/get/${doctorId}`, { withCredentials: true });
      set({ doctor: res.data.doctor, loading: false });
      toast.success("Doctor fetched successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to fetch doctor");
      console.error("Error fetching doctor:", err);
    }
  },

  addDoctor: async (doctor) => {
    try {
      set({ loading: true });
      const res = await API.post("/doctors/create", doctor, { withCredentials: true });
      set((state) => ({
        doctors: [...state.doctors, res.data.doctor],
      }));
      toast.success("Doctor added successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to add doctor");
      console.error("Error adding doctor:", err);
    }
  },

  updateDoctor: async (doctor) => {
    try {
      set({ loading: true });
      const res = await API.put(`/doctors/update/${doctor._id}`, doctor, { withCredentials: true });
      set((state) => ({
        doctors: state.doctors.map((doc) =>
          doc._id === doctor._id ? res.data.updatedDoctor : doc
        ),
      }));
      toast.success("Doctor updated successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to update doctor");
      console.error("Error updating doctor:", err);
    }
  },
  login: async ({ email, password }) => {
    try {
        set({ loading: true });
        const res = await API.post("/doctors/login", { email, password });
        set({ doctor: res.data.doctor, loading: false });
        toast.success("Login successful!");
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  },
  logout: async () => {
    try {
      await API.get("/doctors/logout", { withCredentials: true });
      set({ doctor: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  },
  deleteDoctor: async (doctorId) => {
    try {
      set({ loading: true });
      await API.delete(`/doctors/delete/${doctorId}`, { withCredentials: true });
      set((state) => ({
        doctors: state.doctors.filter((doctor) => doctor._id !== doctorId),
      }));
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to delete doctor");
      console.error("Error deleting doctor:", err);
    }
  },
}));
