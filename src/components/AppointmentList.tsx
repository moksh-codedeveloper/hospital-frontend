'use client';

import { useEffect } from 'react';
import { useAppointmentStore } from '@/store/appointmentStore';
import { Button } from '@/components/ui/button';

export default function AppointmentList() {
  const { appointments, fetchAppointments, deleteAppointment, loading } = useAppointmentStore();

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-4">
      {appointments.length === 0 && !loading && <p>No appointments found.</p>}
      {appointments.map((a) => (
        <div key={a._id} className="p-4 border rounded-md shadow-md space-y-1">
          <p><strong>Doctor:</strong> {a.doctor}</p>
          <p><strong>Reason:</strong> {a.reason}</p>
          <p><strong>Date:</strong> {a.date}</p>
          <p><strong>Time:</strong> {a.time}</p>
          <Button variant="destructive" onClick={() => deleteAppointment(a._id)}>
            Cancel
          </Button>
        </div>
      ))}
    </div>
  );
}
