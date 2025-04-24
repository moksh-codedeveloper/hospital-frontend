"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";    
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppoitmentList";
import { fireConfetti } from "@/lib/confetti";

export default function AppointmentsPage() {
  const { user, fetchUser } = useAuthStore();  // Access Zustand store
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in when the component mounts
  useEffect(() => {
    if (user) {
      setLoading(false); // Stop loading once the user is found
      toast("Welcome to Hospital HMS", {
        icon: "👋",
        style: {
          background: "#f0f4f8",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        dismissible: true,
        duration: 5000,
        onDismiss: () => {
          fireConfetti();
        },
      });
    } else {
      setLoading(false); // Set loading false even if the user is not found (no login)
    }
  }, [user]); // Only re-run effect when the user state changes

  useEffect(() => {
    // Fetch user when the component mounts
    const fetchData = async () => {
      await fetchUser();
      setLoading(false);
    };

    fetchData();
  }, [fetchUser]); 
  if (loading) {
    return <div>Loading...</div>;  // Show loading until user state is confirmed
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {user ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user.username}!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Manage your appointments with ease. Secure, simple, and fast.
          </p>
          <AppointmentForm />
          <AppointmentList />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Hospital HMS</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Manage your appointments with ease. Secure, simple, and fast.
          </p>
          <Button onClick={() => router.push("/login")}>Login to book an appointment</Button>
        </div>
      )}
    </div>
  );
}
