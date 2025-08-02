import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import cors
import { connectDB } from "./src/lib/database.js";
import courserouter from './src/routes/course.routes.js';
import enrollmentrouter from './src/routes/enrollment.routes.js';

dotenv.config();

const app = express();

// ✅ Use CORS middleware with origin allowed
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

app.use('/api/enrollment', enrollmentrouter);
app.use('/api/courses', courserouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
