// store/appointmentStore.ts
import { create } from 'zustand';
import axios from 'axios';

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

  getAppointments: () => Promise<void>;
  setAppointments: (appointments: Appointment[]) => void;

  createAppointment: (newAppointment: Omit<Appointment, '_id'>) => Promise<void>;
  updateAppointment: (updatedData: Partial<Appointment> & { _id: string }) => Promise<void>;
  deleteAppointment: (_id: string) => Promise<void>;
};

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],

  // ✅ Get all appointments
  getAppointments: async () => {
    try {
      const res = await axios.get('/api/appointments/my', {
        withCredentials: true,
      });
      set({ appointments: res.data });
    } catch (err) {
      console.error('Fetching appointments failed:', err);
    }
  },

  // ✅ Set manually
  setAppointments: (appointments) => set({ appointments }),

  // ✅ Create a new appointment
  createAppointment: async (newAppointment) => {
    try {
      const res = await axios.post('/api/appointments/create', newAppointment, {
        withCredentials: true,
      });
      const created = res.data;
      set({ appointments: [...get().appointments, created] });
    } catch (err) {
      console.error('Creation failed:', err);
    }
  },

  // ✅ Update an appointment
  updateAppointment: async (updatedData) => {
    try {
      const res = await axios.post('/api/appointments/update', updatedData, {
        withCredentials: true,
      });
      const updated = res.data;
      const updatedList = get().appointments.map((appt) =>
        appt._id === updated._id ? updated : appt
      );
      set({ appointments: updatedList });
    } catch (err) {
      console.error('Update failed:', err);
    }
  },

  // ✅ Delete an appointment
  deleteAppointment: async (_id) => {
    try {
      await axios.post(
        '/api/appointments/delete',
        { appointmentId: _id },
        { withCredentials: true }
      );
      const filtered = get().appointments.filter((appt) => appt._id !== _id);
      set({ appointments: filtered });
    } catch (err) {
      console.error('Delete failed:', err);
    }
  },
}));
