import React from 'react'
import Link from 'next/link'
import { FaGraduationCap, FaHome, FaBook } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'

function Navbar() {
  return (
    <div className="sticky backdrop-blur-md bg-slate-800/95 h-12 border-b border-slate-700 flex justify-between items-center px-4">
      
      {/* Logo + SkillHub */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-white text-xl" />
        <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">SkillHub</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
          <FaHome />
          <span>All Courses</span>
        </Link>
        <Link href="/my-courses" className="flex items-center gap-1 text-gray-200 hover:text-white relative">
          <FaBook />
          <span>My Courses</span>
         
        </Link>
      </div>

      {/* Avatar */}
      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm text-white font-semibold">
        DS
      </div>
    </div>
  )
}

export default Navbar
