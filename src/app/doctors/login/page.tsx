// pages/login/doctor.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Card, CardContent ,CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDoctorStore } from '@/store/doctorStore';

const DoctorLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useDoctorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        await login({ email, password });
        router.push('/doctors/profile');
    } catch (err) {
      alert('Error logging in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-lg bg-white">
        <CardHeader>
            <CardTitle>Login page</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              required
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="block mb-2">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full"
              required
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={handleSubmit}
            >
              {/* {loading ? <Spinner size="sm" className="mr-2" /> : null} */}
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center mt-4">
          <p>Don't have any account contact admin</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorLogin;
