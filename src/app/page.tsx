"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fireConfetti } from "@/lib/confetti";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { ModeToggle } from "@/components/DarkMode";

export default function App() {
  const { user, fetchUser } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [greeted, setGreeted] = useState(false); // prevent multiple confetti/toast

  // Fetch user on component mount
  useEffect(() => {
    const initUser = async () => {
      await fetchUser(); // Fetch user data from API on mount
      setHasMounted(true); // Ensure rendering after the user is fetched
    };
    initUser();
  }, [fetchUser]);

  useEffect(() => {
    if (hasMounted && user && !greeted) {
      toast("Welcome back!!", {
        icon: "👤",
        style: {
          background: "#f0f4f8",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      fireConfetti();
      setGreeted(true); // ensure it's shown only once
    }
  }, [user, hasMounted, greeted]);

  if (!hasMounted) return null; // prevent hydration mismatch

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Hospital HMS</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Manage your appointments with ease. Secure, simple, and fast.
      </p>
      <ModeToggle />
      {user ? (
        <>
          <p className="text-xl font-medium mb-4">Hello, {user.username} 👋</p>
          <div className="flex gap-4">
            <Link href="/appointments">
              <Button>My Appointments</Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline">View Profile</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex gap-4">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Signup</Button>
          </Link>
          <Link href={"/admin/login"}>
              <Button>Login as a admin</Button>
          </Link>
          <Link href={"/doctors/login"}>
            <Button>Login as a Doctor</Button>
          </Link>
        </div>
      )}
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Built with 💙 by You
      </footer>
    </div>
  );
}
