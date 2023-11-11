const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
