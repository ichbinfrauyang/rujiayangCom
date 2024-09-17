import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
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
export const Message = mongoose.model("Message", MessageSchema);
