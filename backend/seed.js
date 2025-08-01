import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { Course } from "./src/models/courses.model.js"; // Adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log("Loaded MONGO_URI:", MONGO_URI);

const courses = [
  {
    title: "Introduction to Python",
    description: "Learn the basics of Python programming.",
    instructor: "Alice Johnson",
    duration: "4 weeks",
    rating: 4.7,
    students: 220,
    level: "Beginner",
  },
  {
    title: "Web Development with React",
    description: "Build interactive UIs using React.js.",
    instructor: "Bob Smith",
    duration: "6 weeks",
    rating: 4.5,
    students: 340,
    level: "Intermediate",
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master DSA with practical examples.",
    instructor: "Charlie Lee",
    duration: "8 weeks",
    rating: 4.8,
    students: 410,
    level: "Advanced",
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts of ML.",
    instructor: "Diana Kapoor",
    duration: "6 weeks",
    rating: 4.6,
    students: 290,
    level: "Intermediate",
  },
  {
    title: "Full-Stack with MERN",
    description: "End-to-end app development using MongoDB, Express, React, and Node.",
    instructor: "Ethan Brown",
    duration: "10 weeks",
    rating: 4.9,
    students: 500,
    level: "Advanced",
  },
  {
    title: "Database Design & SQL",
    description: "Learn how to design and query relational databases.",
    instructor: "Fiona Zhang",
    duration: "5 weeks",
    rating: 4.4,
    students: 180,
    level: "Intermediate",
  },
  {
    title: "Next.js for Beginners",
    description: "Build server-side rendered apps with Next.js.",
    instructor: "George Patel",
    duration: "4 weeks",
    rating: 4.3,
    students: 150,
    level: "Beginner",
  },
  {
    title: "Operating Systems Essentials",
    description: "Dive into memory, processes, and file systems.",
    instructor: "Hina Mehra",
    duration: "6 weeks",
    rating: 4.5,
    students: 210,
    level: "Intermediate",
  },
  {
    title: "Cloud Computing Basics",
    description: "Introduction to AWS, Azure, and GCP services.",
    instructor: "Ian Thomas",
    duration: "5 weeks",
    rating: 4.6,
    students: 275,
    level: "Beginner",
  },
  {
    title: "Cybersecurity Fundamentals",
    description: "Learn basic security principles and practices.",
    instructor: "Jasmine Kaur",
    duration: "4 weeks",
    rating: 4.2,
    students: 160,
    level: "Beginner",
  },
  {
    title: "AI in Real World",
    description: "Applications of AI in various industries.",
    instructor: "Kevin Tran",
    duration: "6 weeks",
    rating: 4.7,
    students: 330,
    level: "Intermediate",
  },
  {
    title: "Version Control with Git & GitHub",
    description: "Master Git commands and open source collaboration.",
    instructor: "Lina George",
    duration: "3 weeks",
    rating: 4.6,
    students: 400,
    level: "Beginner",
  },
  {
    title: "Agile & Scrum for Developers",
    description: "Work efficiently with Agile methodologies.",
    instructor: "Mohammed Irfan",
    duration: "2 weeks",
    rating: 4.3,
    students: 140,
    level: "Intermediate",
  },
  {
    title: "UI/UX Design Basics",
    description: "Design better interfaces with UX principles.",
    instructor: "Nina Verma",
    duration: "4 weeks",
    rating: 4.4,
    students: 280,
    level: "Beginner",
  },
  {
    title: "DevOps Essentials",
    description: "Learn CI/CD, Docker, Kubernetes and pipelines.",
    instructor: "Oscar Fernandez",
    duration: "7 weeks",
    rating: 4.8,
    students: 360,
    level: "Advanced",
  },
];

async function seedCourses() {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined in .env");

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Course.deleteMany();
    await Course.insertMany(courses);

    console.log("🎉 15 Courses seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding courses:", err);
    process.exit(1);
  }
}

seedCourses();
