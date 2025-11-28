import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  songs: [{ type: String }], // array of song _id
}, { timestamps: true });
   
export default mongoose.model("Playlist", playlistSchema);
