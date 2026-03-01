import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    image: { type: String }, 
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
