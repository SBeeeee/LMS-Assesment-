import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  students: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);
