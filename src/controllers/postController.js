import Post from "../models/post.js";

// 👉 Create Post
export const createPost = async (req, res) => {
  try {
    const { description, image } = req.body;

    const newPost = new Post({
      userId: req.user._id,
      description,
      image,
    });

    await newPost.save();

    // Populate user details
    const populatedPost = await Post.findById(newPost._id)
      .populate("userId", "firstName lastName emailId");

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "firstName lastName emailId photoUrl")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Get My Posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id })
      .populate("userId", "firstName lastName emailId")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Ensure user owns the post
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
