"use client";
import { useEffect, useState } from "react";
import { useAppointmentStore } from "@/store/appointmentStore";
import  {useDoctorStore}  from "@/store/doctorStore";

export default function DoctorAppointments() {
  const { appointments, getAppointments } = useAppointmentStore();
  const { doctor, fetchDoctorFromToken } = useDoctorStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchDoctorFromToken(); // fetch doctor profile
      await getAppointments(); // fetch all appointments
      setLoading(false); // loading done
    };
    init();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading appointments...</p>;
  }

  const doctorAppointments = appointments.filter(
    (a) =>
      a.doctorName?.toLowerCase() === doctor?.username?.toLowerCase()
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {doctorAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments found for you.</p>
      ) : (
        <ul className="space-y-4">
          {doctorAppointments.map((a) => (
            <li key={a._id} className="border p-4 rounded-lg shadow">
              
              <p><strong>Department:</strong> {a.department}</p>
              <p><strong>Date:</strong> {new Date(a.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {a.appointmentTime}</p>
              <p><strong>Reason:</strong> {a.reason}</p>
              <p><strong>Status:</strong> {a.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
