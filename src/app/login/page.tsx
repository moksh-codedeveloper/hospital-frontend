"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios"; // Make sure you have this setup
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {fireConfetti} from "@/lib/confetti"; // Utility file with confetti logic

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast("Logged in successfully!", {
        action: {
          label: "🎉 Boom",
          onClick: () => fireConfetti(),
        },
        style: {
          border: "1px solid #4caf50",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
        },
      });

      fireConfetti();

      router.push("/profile"); // or wherever your post-login route is
    } catch (error: any) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-24 p-6 shadow-lg rounded-2xl border">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleLogin} className="w-full">
        Login
      </Button>
    </div>
  );
}
