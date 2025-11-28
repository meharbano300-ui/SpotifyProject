import mongoose from "mongoose";
import Album from "../models/album.js";
import fs from "fs";

// GET all albums
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ message: "Server error while fetching albums" });
  }
};

// CREATE album
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, genre, releaseDate } = req.body;

    const coverImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newAlbum = new Album({
      title,
      artist,  
      genre,
      releaseDate,
      coverImage,
    });

    await newAlbum.save();
    res.status(201).json({ message: "Album created successfully", album: newAlbum });
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ message: "Server error while creating album" });
  }
};

// UPDATE album
export const updateAlbum = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }

    const data = req.body;

    if (req.file) {
      data.coverImage = req.file.path.replace(/\\/g, "/");
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, data, { new: true });

    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ message: "Album updated successfully", album: updatedAlbum });
  } catch (error) {
    console.error("Error updating album:", error);
    res.status(500).json({ message: "Server error while updating album" });
  }
};

// DELETE album
export const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }

    const album = await Album.findById(id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    if (album.coverImage && fs.existsSync(album.coverImage)) {
      fs.unlink(album.coverImage, () => {});
    }

    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({ message: "Server error while deleting album" });
  }
};
