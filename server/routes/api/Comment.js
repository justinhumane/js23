const express = require("express");
const Comment = require("../../models/comment");
const Post = require("../../models/post");
const router = express.Router();

router.get("/post/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user", "firstName lastName")
      .populate("parentComment")
      .populate({
        path: "children",
        populate: { path: "user", select: "username" },
      })
      .exec();

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new", async (req, res) => {
  const { content, user, post, parentComment } = req.body;
  const comment = new Comment({
    content,
    user,
    post,
    parentComment,
  });
  try {
    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(post, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );

    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
