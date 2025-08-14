import React from 'react';
import Link from 'next/link';

function Hero() {
  return (
    <div className="w-full bg-slate-900 text-center px-4 py-12">
      {/* Hero Text */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r mt-8 from-cyan-400 to-purple-500">
        Master New Skills
      </h1>
      <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
        Join thousands of professionals advancing their careers with our expert-led courses.  
        Learn at your own pace, from anywhere, and gain skills that make a difference.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/auth/login">
          <button className="px-10  hover:cursor-pointer py-3 rounded-full border-2 border-slate-700 bg-slate-800 text-slate-100 font-semibold shadow-md hover:bg-slate-700 hover:border-slate-500 transition duration-300">
            Login
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="px-10 hover:cursor-pointer py-3 rounded-full border-2 border-slate-700 bg-slate-800 text-slate-100 font-semibold shadow-md hover:bg-slate-700 hover:border-slate-500 transition duration-300">
            View Courses
          </button>
        </Link>
      </div>

      {/* Additional Content */}
      <div className="mt-10 max-w-2xl mx-auto text-slate-300 space-y-4">
        <p>✅ Flexible learning options designed for busy professionals.</p>
        <p>✅ Access to industry experts and hands-on projects.</p>
        <p>✅ Certificates to boost your resume and career growth.</p>
      </div>

      {/* Cards Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-cyan-400 mb-2">Expert Instructors</h3>
          <p className="text-slate-200">Learn from industry experts with years of real-world experience.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">Hands-on Projects</h3>
          <p className="text-slate-200">Work on real projects that help you build a strong portfolio.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Career Growth</h3>
          <p className="text-slate-200">Get certificates and skills that make your resume stand out.</p>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Flexible Learning</h3>
          <p className="text-slate-200">Study at your own pace with courses available 24/7 online.</p>
        </div>

        {/* Card 5 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-pink-400 mb-2">Community Support</h3>
          <p className="text-slate-200">Join a community of learners and grow together.</p>
        </div>

        {/* Card 6 */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-indigo-400 mb-2">Affordable Pricing</h3>
          <p className="text-slate-200">Get high-quality education at a price that fits your budget.</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
