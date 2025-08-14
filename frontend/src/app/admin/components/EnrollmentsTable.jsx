"use client";
import { useState, useEffect } from "react";
import { fetchAllEnrollments } from "./api";

export default function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEnrollments();
      setEnrollments(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  if (loading) {
    return <div className="text-white">Loading enrollments...</div>;
  }

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-96 bg-slate-800 rounded-xl shadow border border-slate-700">
      <table className="w-full text-left text-white">
        <thead className="bg-slate-700 sticky top-0">
          <tr>
            <th className="p-4">Student</th>
            <th className="p-4">Course</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length > 0 ? (
            enrollments.map((enroll) => (
              <tr key={enroll._id} className="border-b border-slate-600">
                <td className="p-4">{enroll.studentId?.name || "N/A"}</td>
                <td className="p-4">{enroll.courseId?.title || "N/A"}</td>
                <td className="p-4">
                  {new Date(enroll.
enrollmentDate
).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-400">
                No enrollments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
