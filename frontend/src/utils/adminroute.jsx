// components/AdminRoute.jsx
"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role?.toLowerCase() !== "admin") {
      router.replace("/"); // redirect to home if not admin
    }
  }, [user, router]);

  if (!user || user.role?.toLowerCase() !== "admin") return null;

  return children;
}
