"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {fireConfetti} from "@/lib/confetti"; // Utility file with confetti logic
import { useAuthStore } from "@/store/authStore"; // Assuming you have a store for auth
import { Label } from "@/components/ui/label"; // Assuming you have a label component
import Link from "next/link";
import RoleRedirect from "@/components/RoleRedirect";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ email, password });
      // toast("Login successful! 🎉");
      fireConfetti();
      router.push("/");
    } catch (error) {
      
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
        {loading ? "Loading..." : "Login"}
      </Button>
      <Label><Link href={"/register"}>Go to register</Link></Label>
      <RoleRedirect />
    </div>
  );
}
