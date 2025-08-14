"use client";
import { useState } from "react";

export default function CreateCourseModal({ isOpen, onClose, onCourseCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner", // default selection
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCourseCreated(formData);
      setFormData({
        title: "",
        description: "",
        duration: "",
        level: "Beginner",
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />

          {/* Course Description */}
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />

          {/* Duration */}
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 6 weeks)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          />

          {/* Level */}
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
