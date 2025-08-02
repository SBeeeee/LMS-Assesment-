"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGraduationCap, FaHome, FaBookOpen, FaUserFriends } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed w-full backdrop-blur-md bg-slate-800/95 border-b border-slate-700 z-50">
      <div className="h-14 px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-white text-xl" />
          <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            SkillHub
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-1 text-gray-200 hover:text-white">
            <FaBookOpen />
            <span>Explore</span>
          </Link>
          <Link href="/community" className="flex items-center gap-1 text-gray-200 hover:text-white">
            <FaUserFriends />
            <span>Community</span>
          </Link>
        </div>

        {/* Right Side: Menu Icon (Mobile) + Avatar (Desktop only) */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Avatar (Desktop only) */}
          <div className="hidden md:flex w-8 h-8 bg-slate-600 rounded-full items-center justify-center text-sm text-white font-semibold">
            DS
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-slate-800 px-4 pb-4 animate-slide-down">
          <Link href="/" className="py-2 text-cyan-400 hover:text-cyan-300 border-b border-slate-700">
            Home
          </Link>
          <Link href="/explore" className="py-2 text-gray-200 hover:text-white border-b border-slate-700">
            Explore
          </Link>
          <Link href="/community" className="py-2 text-gray-200 hover:text-white border-b border-slate-700">
            Community
          </Link>
          <div className="pt-3 text-sm text-slate-400">Dummy Student</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
