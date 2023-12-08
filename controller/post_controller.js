const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created!",
      });
    }

    req.flash("success", "Post published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    // .id means converting the object id into string
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post and associated comments deleted!");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
