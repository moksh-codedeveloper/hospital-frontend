'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppointmentStore } from "@/store/appointmentStore";
import { toast } from "sonner";
// import axios from "axios";
import { Button } from "@/components/ui/button";

import confetti from "canvas-confetti";

export default function EditPage() {
  const router = useRouter();
  const { appointments, currentId, getAppointments, updateAppointment } = useAppointmentStore();

  const selectedAppointment = appointments.find((a) => a._id === currentId);

  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (selectedAppointment) {
      setReason(selectedAppointment.reason);
      setDate(selectedAppointment.appointmentDate.slice(0, 10)); // trim to yyyy-mm-dd
    } else {
      toast.error("No appointment selected.");
    }
  }, [selectedAppointment]);

  const handleSubmit = async () => {
    const updates: { [key: string]: string } = {};
    if (reason !== selectedAppointment?.reason) updates.reason = reason;
    if (date !== selectedAppointment?.appointmentDate.slice(0, 10)) updates.date = date;
  
    if (Object.keys(updates).length === 0) {
      toast.info("No changes detected.");
      return;
    }
  
    try {
        await updateAppointment(updates);
      Object.keys(updates).forEach((field) => {
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      });
  
      confetti();
      getAppointments();
      router.push("/profile");
    } catch (err) {
      toast.error("Failed to update appointment.");
      console.error(err);
    }
  };
  

  if (!selectedAppointment) {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        No appointment selected.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold">Edit Appointment</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <Button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Changes
      </Button>
    </div>
  );
}
