"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fireConfetti } from "@/lib/confetti";
import { useRouter } from "next/navigation";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppoitmentList";
export default function ProfilePage() {
  const router = useRouter();
  const { user, fetchUser, logout } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    toast("Logged out successfully!", {
        style: {
            backgroundColor: "#f44336",
            color: "#fff",
        },
        icon: "🔒",
        duration: 300,
        onDismiss: () => {
            fireConfetti();
        }
    });
    router.push("/");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          {/* You can later add a summary of appointments here */}
          <div className="mt-4">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Book an Appointment</h3>
            <AppointmentForm />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Your Appointments</h3>
            <AppointmentList />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
