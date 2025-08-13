"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "@/store/user/slice";

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    adminKey: "",
    instructorKey: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`;
      if (formData.role === "Admin") url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/admin`;
      if (formData.role === "Instructor") url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/instructor`;

      const payload = { ...formData };
      if (formData.role === "Admin") delete payload.instructorKey;
      if (formData.role === "Instructor") delete payload.adminKey;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
       
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Your Account
        </h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
            <option value="Instructor">Instructor</option>
          </select>

          {formData.role === "Admin" && (
            <input
              type="text"
              name="adminKey"
              placeholder="Admin Key"
              value={formData.adminKey}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {formData.role === "Instructor" && (
            <input
              type="text"
              name="instructorKey"
              placeholder="Instructor Key"
              value={formData.instructorKey}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
