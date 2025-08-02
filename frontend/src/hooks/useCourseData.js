
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses,mycourses } from "@/components/api";
import { setCourses } from "@/store/courses/slice";
import { setEnrolledCourses } from "@/store/enrollments/slice";
import { setLoading } from "@/store/user/slice";

const useCourseData = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { enrolledCourses } = useSelector((state) => state.enroll);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        dispatch(setLoading(true));
        const [allCourses, enrolledIds] = await Promise.all([
          getAllCourses(),
          mycourses(),
        ]);
        dispatch(setCourses(allCourses));
        dispatch(setEnrolledCourses(enrolledIds));
      } catch (err) {
        console.error("Error loading course data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCoursesAndEnrollments();
  }, [dispatch]);

  return { courses, enrolledCourses, loading };
};

export default useCourseData;
