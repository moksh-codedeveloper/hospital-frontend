'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
      <Link href="/">
        <h1 className="text-xl font-bold tracking-tight">🏥 Hospital HMS</h1>
      </Link>
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Link href="/dashboard/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Link href="/dashboard/appointments">
              <Button variant="ghost">Appointments</Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
          </>
        )}
        {!user && (
          <>
            <Link href="/login"><Button>Login</Button></Link>
            <Link href="/signup"><Button variant="outline">Signup</Button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
