"use client";
import { useAdminStore } from "@/store/adminStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
export default function AdminLoginPage() {
  const router = useRouter();
  const {login, userType} = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (userType === "doctor") {
      router.push("/doctor/login");
    }
    if (userType === "patient") {
      router.push("/patient/login");
    }
  }, [userType]);
  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // Handle login logic here
      await login({ email, password });
      const userType = useAdminStore.getState().userType;
      if (userType === "admin") {
        router.push("/admin");
      } else {
        toast.error("Not authorized to access this page");
      }
    } catch (error:any) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          <Link href={"/doctors/login"}>Doctor's Login</Link>
        </CardDescription>
        <CardDescription>
          <Link href={"/login"}>Patient Login</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
