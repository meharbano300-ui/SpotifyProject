import express from "express";
import { createPlaylist, getPlaylists, updatePlaylist, deletePlaylist } from "../controllers/playlistController.js";

const router = express.Router();

router.post("/", createPlaylist);
router.get("/", getPlaylists);
router.patch("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

export default router;
