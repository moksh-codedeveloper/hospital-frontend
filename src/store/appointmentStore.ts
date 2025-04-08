// store/appointmentStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface Appointment {
  _id: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: string;
}

interface AppointmentStore {
  appointments: Appointment[];
  currentId: string | null;
  createAppointment: (data: Omit<Appointment, '_id' | 'status'>) => Promise<void>;
  getAppointments: () => Promise<void>;
  updateAppointment: (data: Partial<Appointment>) => Promise<void>;
  deleteAppointment: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  currentId: null,

  createAppointment: async (data) => {
    const res = await axios.post('/api/appointments/create', data);
    const newAppointment = res.data;
    set((state) => ({
      appointments: [...state.appointments, newAppointment],
      currentId: newAppointment._id, // store _id for future use
    }));
  },

  getAppointments: async () => {
    const res = await axios.get('/api/appointments/my');
    set({ appointments: res.data });
  },

  updateAppointment: async (data) => {
    const { currentId } = get();
    if (!currentId) throw new Error("No current appointment selected");
    const res = await axios.post('/api/appointments/update', {
      appointmentId: currentId,
      ...data,
    });
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a._id === currentId ? res.data : a
      ),
    }));
  },

  deleteAppointment: async () => {
    const { currentId } = get();
    if (!currentId) throw new Error("No appointment to delete");
    await axios.post('/api/appointments/delete', { appointmentId: currentId });
    set((state) => ({
      appointments: state.appointments.filter((a) => a._id !== currentId),
      currentId: null,
    }));
  },
}));
