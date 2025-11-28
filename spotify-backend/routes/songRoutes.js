import express from "express";
import multer from "multer";
import path from "path";
import { uploadSong, getSongs, deleteSong } from "../controllers/songController.js";

const router = express.Router();

//  Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverFile") {
      cb(null, "uploads/covers/"); 
    } else {
      cb(null, "uploads/songs/"); 
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//  Routes
router.get("/", getSongs);

//  single route only — handles both songFile & coverFile
router.post(
  "/upload",
  upload.fields([
    { name: "songFile", maxCount: 1 },
    { name: "coverFile", maxCount: 1 },
  ]),
  uploadSong
);

router.delete("/:id", deleteSong);
export default router;
