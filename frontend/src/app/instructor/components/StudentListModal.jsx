"use client";
import React from "react";

export default function StudentListModal({ isOpen, students, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
        {students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <ul className="list-disc list-inside">
            {students.map((s) => (
              <li key={s._id}>
                {s.studentId.name} - {s.studentId.email}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
