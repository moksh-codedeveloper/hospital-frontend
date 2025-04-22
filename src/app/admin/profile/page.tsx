"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function AdminProfilePage() {
  const { admin, loading, fetchAdmin, logout } = useAdminStore();

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  if (loading) {
    // Display loading skeleton if data is being fetched
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
        <Card className="shadow-md border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl">Personal Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
        <div className="text-red-600">No admin data available. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>

      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl">Personal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Name:</strong> {admin.name}
            </div>
            <div>
              <strong>Email:</strong> {admin.email}
            </div>
            <div>
              <strong>Role:</strong> {admin.role}
            </div>
          </div>

          <div className="mt-6 text-right">
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
