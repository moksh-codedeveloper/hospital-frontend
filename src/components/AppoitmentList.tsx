"use client";
import { useEffect } from "react";
import { useAppointmentStore } from "@/store/appointmentStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
export default function AppointmentList() {
  const router = useRouter();
  const {
    appointments,
    getAppointments,
    deleteAppointment,
    setCurrentId,
  } = useAppointmentStore();

  useEffect(() => {
    getAppointments();
  }, []);

  const handleUpdate = (id: string) => {
    setCurrentId(id);
    toast.success("Appointment selected! Redirecting to edit page...");
    router.push("/edit");
  };
  

  const handleDelete = async (id: string) => {
    console.log("Deleting appointment with ID:", id);
    setCurrentId(id);
    await deleteAppointment();
  };

  return (
    <div className="space-y-4">
      {appointments.map((a) => (
        <Card key={a._id}>
          <CardContent className="p-4 space-y-1">
            <p><strong>Doctor:</strong> {a.doctorName}</p>
            <p><strong>Department:</strong> {a.department}</p>
            <p><strong>Date:</strong> {a.appointmentDate}</p>
            <p><strong>Time:</strong> {a.appointmentTime}</p>
            <p><strong>Reason:</strong> {a.reason}</p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleUpdate(a._id)}>Update</Button>
              <Button variant="destructive" onClick={() => handleDelete(a._id)}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
