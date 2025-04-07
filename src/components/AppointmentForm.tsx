'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/appointmentStore';
import { toast } from 'sonner';
export default function AppointmentForm() {
  const [form, setForm] = useState({ doctor: '', reason: '', date: '', time: '' });
  const { createAppointment, loading } = useAppointmentStore();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createAppointment(form);
  
      // ✅ Show toast
      toast("Appointment booked successfully!", {
        icon: "✅",
        style: {
          background: '#333',
          color: '#fff',
        },
      });
  
      // ✅ Reset form fields
      setForm({ doctor: '', reason: '', date: '', time: '' });
  
    } catch (error: any) {
      error.response?.data?.message
        ? alert(error.response.data.message)
        : alert('An error occurred while booking the appointment.');
    }
  };
  

  return (
    <div className="space-y-4">
      <Input name="doctor" placeholder="Doctor's Name" onChange={handleChange} value={form.doctor} />
      <Input name="reason" placeholder="Reason for Appointment" onChange={handleChange} value={form.reason} />
      <Input name="date" type="date" onChange={handleChange} value={form.date} />
      <Input name="time" type="time" onChange={handleChange} value={form.time} />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </Button>
    </div>
  );
}
