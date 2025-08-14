"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { useSelector } from "react-redux";
import CardSection from "./components/Card";
import { FaUsers, FaBookOpen, FaClipboardList, FaHourglassHalf } from "react-icons/fa";
import { fetchAllCourses,fetchAllEnrollments,fetchAllUsers } from "./components/api";
import { User } from "lucide-react";
import UsersTable from "./components/UsersTable";
import CoursesTable from "./components/CoursesTable";
import EnrollmentsTable from "./components/EnrollmentsTable";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const loadStats = async () => {
      const users = await fetchAllUsers();
      const courses = await fetchAllCourses();
      const enrollments = await fetchAllEnrollments();

      const pendingCourses = courses.filter(c => c.status === "Pending");

      setStats([
        { title: "Total Users", value: users.length, icon: <FaUsers /> },
        { title: "Total Courses", value: courses.length, icon: <FaBookOpen /> },
        { title: "Pending Courses", value: pendingCourses.length, icon: <FaHourglassHalf /> },
        { title: "Total Enrollments", value: enrollments.length, icon: <FaClipboardList /> },
      ]);
    };

    loadStats();
  }, []);
  if (user && user.role !== "Admin") {
    return (
      <div className="min-h-screen bg-slate-900 pt-16 px-4 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-slate-300 text-center max-w-md">
          You do not have permission to access the Admin Dashboard.
        </p>
      </div>
    );
  }
  return (
    <div className="flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => console.log("Logout")} />
      <div className="flex-1 bg-slate-900 text-white p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6 pt-16">Dashboard Overview</h1>
            <CardSection stats={stats} />
          </>
        )}
        {activeTab === "users" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 pt-16">Manage Users</h1>
            <UsersTable/>
          </div>
        )}
        {activeTab === "courses" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 pt-16">Manage Courses</h1>
<CoursesTable/>
          </div>
        )}
        {activeTab === "enrollments" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 pt-16">All Enrollments</h1>
            <EnrollmentsTable/>
          </div>
        )}
      </div>
    </div>
  );
}
