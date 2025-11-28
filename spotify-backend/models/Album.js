import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },

  // optional — OTHERWISE album save nahi hota
  coverImage: { type: String, required: false },

  releaseDate: { type: Date },
  genre: { type: String, default: "Unknown" },
  description: { type: String }
});

// Explicitly collection name "albums"
const Album = mongoose.model("Album", albumSchema, "albums");
  
export default Album;
