"use client";
import { useAdminStore } from "@/store/adminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, userType } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userType === "admin") router.replace("/admin");
    else if (userType === "doctor") router.replace("/doctor/login");
    else if (userType === "patient") router.replace("/patient/login");
  }, [userType, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      const currentUser = useAdminStore.getState().userType;
      if (currentUser === "admin") {
        toast.success("Welcome, Admin!");
        router.replace("/admin/dashboard");
      } else {
        toast.error("Not authorized as Admin");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-1">
          <CardDescription>
            <Link href="/doctor/login" className="hover:underline">Doctor Login</Link>
          </CardDescription>
          <CardDescription>
            <Link href="/login" className="hover:underline">Patient Login</Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
