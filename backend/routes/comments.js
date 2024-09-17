import express from "express";
import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();
// Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id);
    res.status(200).json("Comment has been deleted!");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get Posts
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get Post comment
router.get("/post/:postId", async (req, res) => {
  try {
    const UserComments = await Comment.find({ postId: req.params.postId });
    return res.status(200).json(UserComments);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

export default router;
