const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");
exports.getAllPost = async (req, res, next) => {
  try {
    // const totalItem = await Post.find().countDocument()
    const post = await Post.find();
    res.status(200).json({
      // total: totalItem,
      post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post Not Found");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        post,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// exports.updatePost = (req, res, next) => {
//     next();
// }
// exports.deletePost = (req, res, next) => {
//     next();
// }

exports.createPost = async (req, res, next) => {
  const { title, content, imageUrl } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation data Failed");
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = new Post({
      title,
      content,
      imageUrl,
    });
    const result = await post.save();
    if (result) {
      res.status(200).json({
        message: "Post Created!",
        post: result,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
