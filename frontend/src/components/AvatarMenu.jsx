"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/checkAuth";
import { logout } from "./api";
import { UserCircle } from "lucide-react";

export default function AvatarMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("");
  };

  const handleLogout = async () => {
    await logout(dispatch, router);
    setDropdownOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Circle */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm text-white font-semibold"
      >
        {user?.name ? getInitials(user.name) : <UserCircle className="w-5 h-5" />}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {(user===null || user=={}) ? (
            <>
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                Dashboard
              </button>
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-500 cursor-not-allowed"
              >
                Signup
              </button>
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-500 cursor-not-allowed"
              >
                Login
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push("/login");
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  router.push("/signup");
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
