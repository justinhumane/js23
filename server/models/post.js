const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  links: {
    type: [
      {
        title: "String",
        url: "String",
      },
    ],
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = model("Post", PostSchema);
module.exports = Post;
