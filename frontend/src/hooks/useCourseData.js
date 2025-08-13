"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEnrollments,getCourses } from "@/components/api";// ✅ correct path
import { setCourses, setTab } from "@/store/courses/slice";
import { setEnrolledCourses } from "@/store/enrollments/slice";
import { setLoading, setError } from "@/store/user/slice";

export default function useCourseData() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { enrolledCourses } = useSelector((state) => state.enroll);
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const [allCourses, enrolled] = await Promise.all([
          getCourses(),
          getMyEnrollments(),
        ]);

        dispatch(setCourses(allCourses));
        dispatch(setEnrolledCourses(enrolled.map(e => e._id)));
        dispatch(setTab("all")); // default view
      } catch (err) {
        console.error("Failed to fetch course data:", err);
        dispatch(setError("Failed to load courses. Please try again later."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return { courses, enrolledCourses, loading, error };
}
