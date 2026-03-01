import express from "express";
import "dotenv/config";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Server is running healthy"
  });
});

// Routes
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/request.js";
import profileRoutes from "./routes/profile.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

app.use("/post", postRoutes);
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);

// Database Connection & Server Start
connectDb()
  .then(() => {
    console.log("✅ Database connection established");
    app.listen(8080, () => {
      console.log("🚀 Server running on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

export default app;