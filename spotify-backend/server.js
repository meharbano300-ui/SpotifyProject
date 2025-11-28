import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// --- Connect Database ---
connectDB();

const app = express();

// 1. CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"], // frontend URLs
    credentials: true, // cookies/session ke liye zaroori
  })
);

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve static uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/albums", albumRoutes);

// --- Test route ---
app.get("/", (req, res) => res.send("Backend running successfully 🚀"));

// --- Start Server ---
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
