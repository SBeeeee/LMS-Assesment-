"use client";
import { useSelector } from "react-redux";
import PrivateRoute from "@/utils/Private";
import CourseSwitcher from "@/components/CourseSwitcher";
import Heading from "@/components/Heading";
import { FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.user);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-900 pt-16 px-4 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Dashboard</h1>

        {/* User Detail Cards */}
        {user && Object.keys(user).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Name Card */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center">
              <FaIdBadge className="text-cyan-400 text-3xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Name</h3>
              <p className="text-slate-200 text-center">{user.name}</p>
            </div>

            {/* Email Card */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center">
              <FaEnvelope className="text-green-400 text-3xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-slate-200 text-center">{user.email}</p>
            </div>

            {/* Role Card */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center">
              <FaUser className="text-yellow-400 text-3xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Role</h3>
              <p className="text-slate-200 text-center">{user.role}</p>
            </div>

            {/* Joined Card */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center">
              <FaCalendarAlt className="text-pink-400 text-3xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Joined</h3>
              <p className="text-slate-200 text-center">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-400">Loading user details...</p>
        )}

    

        {/* Other Components */}
        <div className="mt-12">
          <Heading />
          <CourseSwitcher />
        </div>
      </div>
    </PrivateRoute>
  );
}
