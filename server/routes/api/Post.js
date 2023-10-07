const express = require("express");
const Post = require("../../models/post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    if (!posts) throw new Error("No posts found!");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("No post found!");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new/", async (req, res) => {
  const { title, postType, content, category, tags, links } = req.body;
  const newPost = new Post({
    title,
    postType,
    content,
    category,
    tags,
    links,
  });
  try {
    const post = await newPost.save();
    if (!post) throw new Error("Something went wrong saving the post!");
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  const { title, postType, content, category, tags, links } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title,
      postType,
      content,
      category,
      tags,
      links,
    });
    if (!post) throw new Error("Something went wrong updating the post!");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Post.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
