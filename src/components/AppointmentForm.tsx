"use client";
import { useState } from "react";
import { useAppointmentStore } from "@/store/appointmentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
export default function AppointmentForm() {
  const { user, fetchUser } = useAuthStore();
  const { createAppointment } = useAppointmentStore();
  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createAppointment(formData);
    await fetchUser();
    setFormData({
      doctorName: "",
      department: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl shadow-md w-full max-w-lg">
      <Input name="doctorName" placeholder="Doctor Name" value={formData.doctorName} onChange={handleChange} />
      <Input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
      <Input name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} />
      <Input name="appointmentTime" type="time" value={formData.appointmentTime} onChange={handleChange} />
      <Textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} />
      {/* <Input name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} /> */}
      <Button onClick={handleSubmit}>Create Appointment</Button>
    </div>
  );
}
