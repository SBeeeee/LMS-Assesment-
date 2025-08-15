import { getAllCourses,getAllApprovedCourses,getCoursesByInstructor,createCourse,updateCourseStatus,updateCourse,deleteCourse } from "../services/course.services.js";

export const fetchCourses = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    let courses;

    switch (role) {
      case 'Admin':
        courses = await getAllCourses();
        break;
      case 'Instructor':
        courses = await getCoursesByInstructor(userId);
        break;
      case 'Student':
      default:
        courses = await getAllApprovedCourses();
        break;
    }

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: err.message,
    });
  }
};

export const createNewCourse = async (req, res) => {
  try {
    const { role, _id: instructorId } = req.user;
    
    if (role !== 'Instructor') {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    const course = await createCourse(req.body, instructorId);
    res.status(201).json({
      success: true,
      message: "Course created and submitted for approval",
      data: course,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to create course",
      error: err.message,
    });
  }
};

export const updateCourseStatusController = async (req, res) => {
  try {
    const { role, _id: adminId } = req.user;
    const { courseId } = req.params;
    const { status } = req.body;

    if (role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can update course status",
      });
    }

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Approved' or 'Rejected'",
      });
    }

    const course = await updateCourseStatus(courseId, status, adminId);
    res.status(200).json({
      success: true,
      message: `Course ${status.toLowerCase()} successfully`,
      data: course,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to update course status",
      error: err.message,
    });
  }
};

export const updateCourseController = async (req, res) => {
  try {
    const { role, _id: instructorId } = req.user;
    const { courseId } = req.params;

    if (role !== 'Instructor') {
      return res.status(403).json({
        success: false,
        message: "Only instructors can update courses",
      });
    }

    const course = await updateCourse(courseId, req.body, instructorId);
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to update course",
      error: err.message,
    });
  }
}

export const deleteCourseController = async (req, res) => {
  try {
    const { role } = req.user;
    const { courseId } = req.params;

    if (role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete courses",
      });
    }

    const deletedCourse = await deleteCourse(courseId);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course and related enrollments deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: err.message,
    });
  }
};
