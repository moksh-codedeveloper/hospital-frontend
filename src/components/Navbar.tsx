"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration matches server-client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    logout();
    toast("Logged out successfully!", { icon: "👋" });
    router.push("/login");
  };

  if (!isHydrated) return null;

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
      <Link href="/">
        <h1 className="text-xl font-bold tracking-tight">🏥 Hospital HMS</h1>
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-muted-foreground">Hi, {user.name} 👋</span>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Link href="/appointments">
              <Button variant="ghost">Appointments</Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Signup</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
