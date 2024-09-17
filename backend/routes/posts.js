import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();
// Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   req.body.password = await bcrypt.hashSync(req.body.password, salt);
    // }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get Post Details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get Posts
router.get("/", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await Post.find(query.search ? searchFilter : null);
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get User Posts
router.get("/user/:userId", async (req, res) => {
  try {
    const UserPosts = await Post.find({ userId: req.params.userId });
    return res.status(200).json(UserPosts);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

export default router;
