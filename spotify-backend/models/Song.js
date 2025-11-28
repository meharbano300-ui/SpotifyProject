import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: "Unknown Artist" },
  album: { type: String },
  duration: { type: String },
  genre: { type: String },
  filePath: { type: String, required: true },
  coverFilePath: { type: String },
});
  
//  explicitly collection name "songFile"
const Song = mongoose.model("Song", songSchema, "songFile");
export default Song;


