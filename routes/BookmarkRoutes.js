import express from "express";
import Bookmark from "../models/Bookmark.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const bookmarks = await Bookmark.find();
  res.json({ bookmarks });
});

router.post("/", async (req, res) => {
  const newBookmark = new Bookmark(req.body);
  await newBookmark.save();
  res.json(newBookmark);
});

router.delete("/:id", async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
