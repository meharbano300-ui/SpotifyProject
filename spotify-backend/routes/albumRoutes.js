import express from "express";
import multer from "multer";
import fs from "fs";
import { getAlbums, createAlbum, deleteAlbum, updateAlbum } from "../controllers/albumController.js";

const router = express.Router();

// Ensure upload folder exists
const uploadFolder = "uploads/albums";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getAlbums);
router.post("/", upload.single("coverImage"), createAlbum);
router.delete("/:id", deleteAlbum);
router.put("/:id", upload.single("coverImage"), updateAlbum);

export default router;
