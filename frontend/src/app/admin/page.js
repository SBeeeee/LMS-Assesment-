"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";
import CardSection from "./components/Card";
import { FaUsers, FaBookOpen, FaClipboardList, FaHourglassHalf } from "react-icons/fa";
import { fetchAllCourses,fetchAllEnrollments,fetchAllUsers } from "./components/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState([]);

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
            {/* Users Table Component will go here */}
          </div>
        )}
        {activeTab === "courses" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 pt-16">Manage Courses</h1>
            {/* Courses Table Component will go here */}
          </div>
        )}
        {activeTab === "enrollments" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 pt-16">All Enrollments</h1>
            {/* Enrollments Table Component will go here */}
          </div>
        )}
      </div>
    </div>
  );
}
