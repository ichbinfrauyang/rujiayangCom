import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted!");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

export default router;
