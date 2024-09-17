import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Model
export const Comment = mongoose.model("Comment", CommentSchema);
