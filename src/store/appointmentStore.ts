import { create } from 'zustand';
import axios from '@/utils/axios'; // your axios instance with `withCredentials`

type Appointment = {
  _id: string;
  doctor: string;
  reason: string;
  date: string;
  time: string;
};

type AppointmentStore = {
  appointments: Appointment[];
  loading: boolean;
  fetchAppointments: () => Promise<void>;
  createAppointment: (data: Omit<Appointment, '_id'>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<void>;
};

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  loading: false,

  fetchAppointments: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/appointments');
      set({ appointments: res.data.appointments });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      set({ loading: false });
    }
  },

  createAppointment: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post('/appointments', data);
      set((state) => ({
        appointments: [...state.appointments, res.data.appointment],
      }));
    } catch (err) {
      console.error('Create error:', err);
    } finally {
      set({ loading: false });
    }
  },

  deleteAppointment: async (id) => {
    try {
      await axios.delete(`/appointments/${id}`);
      set((state) => ({
        appointments: state.appointments.filter((a) => a._id !== id),
      }));
    } catch (err) {
      console.error('Delete error:', err);
    }
  },

  updateAppointment: async (id, data) => {
    try {
      const res = await axios.put(`/appointments/${id}`, data);
      set((state) => ({
        appointments: state.appointments.map((a) =>
          a._id === id ? res.data.appointment : a
        ),
      }));
    } catch (err) {
      console.error('Update error:', err);
    }
  },
}));
