"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      router.replace("/"); // already logged in → go home
    }
  }, [authUser, isCheckingAuth]);

  if (isCheckingAuth) return null; // global loader already showing

  return children;
}
