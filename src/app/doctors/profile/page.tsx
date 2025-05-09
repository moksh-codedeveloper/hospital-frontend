'use client';

import { useEffect, useState } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DoctorAppointments from '@/components/DoctorAppointmentList';
export default function DoctorProfile() {
  const router = useRouter();
  const { doctor, fetchDoctorFromToken, updateDoctor,logout , loading } = useDoctorStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialisation: '',
    experience: '',
  });

  useEffect(() => {
    fetchDoctorFromToken();
  }, []);

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.username || '',
        email: doctor.email || '',
        specialisation: doctor.specialisation || '',
        experience: doctor.experience || '',
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    if (!doctor?._id) {
      toast.error("Doctor ID not found.");
      return;
    }
    updateDoctor({ ...doctor, ...formData });
  };
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/doctors/login");
    } catch (error) {
      toast.error("Error logging out");
      console.error(error);
    }
  }
  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center">Doctor Profile</h2>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" value={formData.email} disabled />
          </div>
          <div className="space-y-2">
            <Label>Specialisation</Label>
            <Input name="specialisation" value={formData.specialisation} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Experience (in years)</Label>
            <Input name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <Button onClick={handleUpdate} disabled={loading} className="w-full mt-4">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">My Appointments</h3>
            <DoctorAppointments />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
