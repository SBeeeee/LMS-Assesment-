import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/lib/database.js";
import courserouter from './src/routes/course.routes.js';
import enrollmentrouter from './src/routes/enrollment.routes.js';

dotenv.config();

const app = express();

// ✅ Allow multiple domains
const allowedOrigins = [
  process.env.local_url,
  process.env.dev_url,
];
console.log("Allowed Origins at startup:", allowedOrigins);
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
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
