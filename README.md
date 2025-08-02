# 🎓 Course Listing & Student Enrollment Module (LMS)

This is a simplified **Learning Management System** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It allows students to view available courses and enroll in them using a basic user interface and backend API.

---

## 🚀 Live Demo

- **Frontend (React.js)**: [https://lms-assesment.vercel.app](https://lms-assesment.vercel.app)  
- **Backend API (Render)**: [https://lmsassessment.onrender.com](https://lmsassessment.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Deployment**: Vercel (frontend), Render (backend)

---

## ✨ Features

- 📚 View a list of available courses with details like title, instructor, and duration.
- ✅ Enrollment status is shown for each course.
- 🔘 "Enroll" button is shown for courses not yet enrolled; enrolled ones display "Enrolled".
- 🔁 Enrolling in a course sends a POST request to the backend and updates the UI accordingly.

---

## 🧑‍🎓 Dummy Student

- A hardcoded dummy student ID `dummyStudent123` is used for all enrollments.

---

## 📂 Project Structure

### Frontend (`/client`)
```
📁 client
├── src
│   ├── components
│   │   └── CourseCard.tsx
│   ├── store
│   │   ├── courses
│   │   └── enrollments
│   └── pages
│       └── index.tsx
```

### Backend (`/backend`)
```
📁 backend
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   └── lib
│       └── database.js
```

---

## 🧑‍💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SBeeeee/lms-assessment.git
cd lms-assessment
```

---

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lms
PORT=5000
```

Start backend:
```bash
npm run dev
```

---

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Start frontend:
```bash
npm run dev
```

---

## 🌐 API Endpoints

### GET `/api/courses`
- Fetch all courses

### GET `/api/enrollment/me`
- Fetch enrolled courses of `dummyStudent123`

### POST `/api/enrollment`
- Enroll student in a course  
- Request body:
```json
{
  "courseId": "<COURSE_ID>"
}
```

---

## 🧠 What I Learned

- 🔗 Integrated Redux Toolkit for global state management
- 🧾 Used REST API concepts to connect frontend with backend
- 🛡️ Learned how to configure CORS and environment variables for secure API interaction
- 🌍 Deployed full-stack MERN app using Vercel and Render

---

## 💡 Challenges Faced

- Faced CORS errors initially while trying to connect frontend and backend — fixed with proper `cors()` middleware configuration.
- Managed state updates after enrollments to avoid re-fetching unnecessarily.
- Deployment on Render required managing `build` and `start` commands carefully to avoid crashes.

---

## ✅ Key Design Decisions

- Used a hardcoded dummy student ID to simulate real authentication.
- Chose Redux Toolkit to efficiently manage course/enrollment state in a scalable way.
- Modularized API endpoints and MongoDB models for clarity and maintenance.

---

## 📬 Contact

For questions or clarifications, feel free to reach out via GitHub: [@SBeeeee](https://github.com/SBeeeee)

---