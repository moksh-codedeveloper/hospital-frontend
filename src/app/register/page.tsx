"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { fireConfetti } from "@/lib/confetti";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register(form);
      router.push("/login");
      fireConfetti();
    } catch (error: any) {
      console.error("Registration error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="John Doe"
              value={form.username}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
