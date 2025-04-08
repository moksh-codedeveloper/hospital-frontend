import { create } from "zustand";
import axios from "@/utils/axios";

type Appointment = {
  _id: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
};

type AppointmentStore = {
  appointments: Appointment[];
  currentId: string | null;
  setCurrentId: (id: string) => void;
  createAppointment: (data: Partial<Appointment>) => Promise<void>;
  getAppointments: () => Promise<void>;
  deleteAppointment: () => Promise<void>;
  updateAppointment: (data: Partial<Appointment>) => Promise<void>;
};

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  currentId: null,

  setCurrentId: (id) => set({ currentId: id }),

  createAppointment: async (data) => {
    const res = await axios.post("/appointments/create", data, {
      withCredentials: true,
    });
    set((state) => ({
      appointments: [...state.appointments, res.data],
    }));
  },

  getAppointments: async () => {
    const res = await axios.get("/appointments/my", {
      withCredentials: true,
    });
    set({ appointments: res.data });
  },

  deleteAppointment: async () => {
    const _id = get().currentId;
    if (!_id) return;
    await axios.post("/appointments/delete", { _id: _id }, {
      withCredentials: true,
    });
    set((state) => ({
      appointments: state.appointments.filter((a) => a._id !== _id),
    }));
  },

  updateAppointment: async (data) => {
    const id = get().currentId;
    if (!id) return;
    const res = await axios.post("/appointments/update", {
      _id: id,
      ...data,
    }, {
      withCredentials: true,
    });

    set((state) => ({
      appointments: state.appointments.map((a) =>
        a._id === id ? res.data : a
      ),
    }));
  },
}));
