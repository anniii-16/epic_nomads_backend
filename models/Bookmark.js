import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  title: String,
  address: String,
  image: String,
  category: String,
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
