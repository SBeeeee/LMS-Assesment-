"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/utils/checkAuth";
import PrivateRoute from "@/utils/Private";
import CourseSwitcher from "@/components/CourseSwitcher";
import Heading from "@/components/Heading";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
console.log(user)
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-900 pt-16 text-white ">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {user && Object.keys(user).length > 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
         <Heading/>
        <CourseSwitcher/>
      </div>
    </PrivateRoute>
  );
}
