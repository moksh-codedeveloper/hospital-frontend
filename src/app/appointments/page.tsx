"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";    
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppoitmentList";
import { fireConfetti } from "@/lib/confetti";
// import { ModeToggle } from "@/components/DarkMode";
export default function AppointmentsPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [userName, setUserName] = useState(null);
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
        }
    });
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        {user ? (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome back, {user.name}!</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    Manage your appointments with ease. Secure, simple, and fast.
                </p>
                {/* <ModeToggle /> */}
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
    )
}