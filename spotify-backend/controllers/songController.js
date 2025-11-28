import Song from "../models/Song.js";
import fs from "fs";
import path from "path";

//  Upload Song Controller
export const uploadSong = async (req, res) => {
  try {
    // multer ne form-data parse kar diya hoga
    const { title, artist } = req.body;
    const songFile = req.files?.songFile?.[0];
    const coverFile = req.files?.coverFile?.[0];

    if (!title || !artist) {
      return res.status(400).json({ message: "Title or artist missing!" });
    }

    if (!songFile) {
      return res.status(400).json({ message: "Song file missing!" });
    }

    const newSong = new Song({
      title,
      artist,
      filePath: `/uploads/songs/${songFile.filename}`,
      coverFilePath: coverFile
        ? `/uploads/covers/${coverFile.filename}`
        : "/uploads/default-cover.jpg",
    });

    await newSong.save();

    res.status(201).json({
      message: `✅ Song "${newSong.title}" uploaded successfully!`,
      song: newSong,
    });
  } catch (err) {
    console.error("❌ Error uploading song:", err);
    res.status(500).json({ message: "Server error while uploading song" });
  }
};

//  Get All Songs Controller
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    console.error("❌ Error fetching songs:", err);
    res.status(500).json({ message: "Server error while fetching songs" });
  }
};

//  Delete Song Controller (admin use)
export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) return res.status(404).json({ message: "Song not found!" });

    // delete actual song file
    if (song.filePath) {
      const songPath = path.join(process.cwd(), song.filePath);
      if (fs.existsSync(songPath)) fs.unlinkSync(songPath);
    }

    // delete cover file
    if (song.coverFilePath) {
      const coverPath = path.join(process.cwd(), song.coverFilePath);
      if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
    }  

    await Song.findByIdAndDelete(id);

    res.json({ message: `✅ Song "${song.title}" deleted successfully!` });
  } catch (err) {
    console.error("❌ Error deleting song:", err);
    res.status(500).json({ message: "Server error while deleting song" });
  }
};
