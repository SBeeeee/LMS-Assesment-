"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "@/store/user/slice";
import { useRouter } from "next/navigation"; 
import axiosInstance from "@/utils/axiosInstance";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      const data = res.data;

      if (!data.success) throw new Error(data.message || "Login failed");

      // ✅ Store token
      localStorage.setItem("token", data.data.token);

      // ✅ Store user in Redux
      dispatch(setUser(data.data.user));

      // ✅ Role-based redirection
      const role = data.data.user.role.toLowerCase();
      if (role === "admin") router.push("/admin");
      else if (role === "instructor") router.push("/instructor");
      else router.push("/dashboard"); // student
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
          Login to Your Account
        </h2>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <button
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
  <p className="text-slate-400 text-sm">
    Don't have an account?{" "}
    <button
      onClick={() => router.push("/auth/signup")}
      className="text-blue-500 hover:underline hover:cursor-pointer font-semibold"
    >
      Sign up
    </button>
  </p>
</div>
      </div>
    </div>
  );
}
