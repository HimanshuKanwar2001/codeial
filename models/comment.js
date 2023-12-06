const mongoose = require("mongoose");

const commmentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    //comment belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
