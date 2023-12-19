const User = require("../../../models/user");
// const jwt = require("jsonwebtoken");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = function (req, res) {
  return res.json(200, {
    message: "List of posts",
    posts: [],
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    // .id means converting the object id into string
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "Post and associated comments deleted successfully!",
      });
    } else {
      return res.json(401, {
        message: "You cannot deleted this post!",
      });
    }
  } catch (err) {
    console.log("Error:", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
