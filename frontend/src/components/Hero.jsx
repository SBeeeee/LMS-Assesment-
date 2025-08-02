import React from 'react';

function Hero() {
  return (
    <div className="w-full h-[400px] flex flex-col justify-center items-center bg-gradient-to-b from-[#0f172a] via-purple-800 to-[#0f172a] text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Master New Skills
      </h1>
      <p className="mt-6 text-lg text-slate-200 max-w-xl">
        Join thousands of professionals advancing their careers with our expert-led courses
      </p>
    </div>
  );
}

export default Hero;
