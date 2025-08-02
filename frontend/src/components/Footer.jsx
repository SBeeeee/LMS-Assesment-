import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black/70 text-slate-300 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          SkillHub
        </div>

        {/* Nav Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-slate-400 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-xs text-center text-slate-500 mt-6">
        © {new Date().getFullYear()} SkillHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
