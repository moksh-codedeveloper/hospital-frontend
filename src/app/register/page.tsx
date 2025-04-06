"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import API from "@/utils/axios";
import { fireConfetti } from "@/lib/confetti";
import { useRouter } from "next/navigation";
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await API.post("/auth/register", form);
      toast("Registered successfully!",{
        icon: "🎉",
        style: {
          border: "1px solid #4caf50",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
        },
      });
      fireConfetti();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
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
            />
          </div>
          <Button onClick={handleRegister} disabled={loading}>{
            loading ? "Loading..." : "Register"
        }</Button>
        </CardContent>
      </Card>
    </div>
  );
}
