"use client";
import { FaUsers, FaBookOpen, FaClipboardList, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
  { label: "Users", icon: <FaUsers />, key: "users" },
  { label: "Courses", icon: <FaBookOpen />, key: "courses" },
  { label: "Enrollments", icon: <FaClipboardList />, key: "enrollments" },
];

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col justify-between border-r pt-16 border-slate-700">
      <div>
        <h2 className="text-2xl font-bold p-6 border-b border-slate-700">Admin Panel</h2>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 px-6 py-3 w-full text-left hover:bg-slate-800 transition-colors ${
                activeTab === item.key ? "bg-slate-800 text-blue-400" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-red-600 rounded transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
