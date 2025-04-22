// components/RoleRedirect.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const RoleRedirect = () => {
  const router = useRouter();
  const { userType } = useAuthStore();

  useEffect(() => {
    if (!userType) return;

    switch (userType) {
      case "admin":
        router.push("/admin");
        break;
      case "doctor":
        router.push("/doctors");
        break;
      case "patient":
        router.push("/appointments");
        break;
      default:
        router.push("/");
    }
  }, [userType]);

  return null;
};

export default RoleRedirect;
