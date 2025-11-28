import Playlist from "../models/playlistModel.js";

// Create playlist
export const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all playlists for user
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.query.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update playlist (add/remove songs)
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    const { action, songId } = req.body;
    if (action === "add") playlist.songs.push(songId);
    if (action === "remove") playlist.songs = playlist.songs.filter(id => id !== songId);

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete playlist
export const deletePlaylist = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Playlist deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
