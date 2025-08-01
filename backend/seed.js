import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv";
import { Course } from "./src/models/courses.model.js"; // Adjust path if needed

dotenv.config(); // Loads .env variables

const MONGO_URI = process.env.MONGO_URI;
console.log("Loaded MONGO_URI:", MONGO_URI);
const courses = [
  {
    title: "Introduction to Python",
    description: "Learn the basics of Python programming.",
    instructor: "Alice Johnson",
    duration: "4 weeks",
  },
  {
    title: "Web Development with React",
    description: "Build interactive UIs using React.js.",
    instructor: "Bob Smith",
    duration: "6 weeks",
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master DSA with practical examples.",
    instructor: "Charlie Lee",
    duration: "8 weeks",
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts of ML.",
    instructor: "Diana Kapoor",
    duration: "6 weeks",
  },
  {
    title: "Full-Stack with MERN",
    description: "End-to-end app development using MongoDB, Express, React, and Node.",
    instructor: "Ethan Brown",
    duration: "10 weeks",
  },
  {
    title: "Database Design & SQL",
    description: "Learn how to design and query relational databases.",
    instructor: "Fiona Zhang",
    duration: "5 weeks",
  },
  {
    title: "Next.js for Beginners",
    description: "Build server-side rendered apps with Next.js.",
    instructor: "George Patel",
    duration: "4 weeks",
  },
  {
    title: "Operating Systems Essentials",
    description: "Dive into memory, processes, and file systems.",
    instructor: "Hina Mehra",
    duration: "6 weeks",
  },
  {
    title: "Cloud Computing Basics",
    description: "Introduction to AWS, Azure, and GCP services.",
    instructor: "Ian Thomas",
    duration: "5 weeks",
  },
  {
    title: "Cybersecurity Fundamentals",
    description: "Learn basic security principles and practices.",
    instructor: "Jasmine Kaur",
    duration: "4 weeks",
  },
];

async function seedCourses() {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined in .env");

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Course.deleteMany(); // Clear existing courses
    await Course.insertMany(courses); // Seed new courses

    console.log("🎉 10 Courses seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding courses:", err);
    process.exit(1);
  }
}

seedCourses();
