import { create } from 'zustand';
import API from '@/utils/axios'; // your API instance with withCredentials

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
      const res = await API.get('/appointments/get');
      set({ appointments: res.data.appointment || [] }); // Added fallback empty array
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      set({ loading: false });
    }
  },
  createAppointment: async (data) => {
    set({ loading: true });
    try {
      // Make sure API instance has authentication headers configured
      const res = await API.post('/appointments/create', data);
      set((state) => ({
        appointments: [...state.appointments, res.data.appointment],
      }));
      console.log('Appointment created:', res.data.appointment);
    } catch (err: any) {
      console.error('Create error:', err);
      // Add more detailed error logging
      if (err.response) {
        console.log('Error status:', err.response.status);
        console.log('Error data:', err.response.data);
      } else {
        console.log('Network or other error:', err.message);
      }
      throw err; // Re-throw error to be caught by component
    } finally {
      set({ loading: false });
    }
  },
  deleteAppointment: async (id) => {
    try {
      await API.delete(`/appointments/${id}`); // Fixed template literal syntax
      set((state) => ({
        appointments: state.appointments.filter((a) => a._id !== id),
      }));
    } catch (err) {
      console.error('Delete error:', err);
    }
  },
  updateAppointment: async (id, data) => {
    try {
      const res = await API.put(`/appointments/${id}`, data); // Fixed template literal syntax
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