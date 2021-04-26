const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fs = require('fs');
const path = require('path');

exports.getAllPost = async (req, res, next) => {
  try {
    const post = await Post.find().populate('creator');
    res.status(200).json({
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
    } 

    if(post.creator.toString() !== req.userId) {
      const error = new Error('UnAuthorized');
      error.statusCode = 403;
      throw error;
    }

      res.status(200).json({
        post,
      });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


const removeImage  = (filePath) => {
  filePath = path.join(__dirname, '../../', filePath);
  console.log('filePath', filePath);
  fs.unlinkSync(filePath, (err) => console.log('filePathError', err))
}

exports.updatePost = async(req, res, next) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation data Failed");
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = await Post.findById(postId);
    if(!post) {
      const error = new Error('Could Not find the post');
      error.statusCode = 404;
      throw error;
    }

    if(post.creator.toString() !== req.userId) {
      const error = new Error('UnAuthorized');
      error.statusCode = 403;
      throw error;
    } 

    const imageUrl = req.file.path;
    if(imageUrl !== post.imageUrl) {
      removeImage(post.imageUrl);
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const result  = await post.save();

    res.status(200).json({
      message: 'Post Updated',
      post: result
    })

  }catch(err) {
     if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


exports.deletePost = async (req, res, next) => {
  const postId  = req.params.postId;
  try{
    const post = await Post.findById(postId);
    if(!post) {
      const error = new Error("Post Doesn't exist");
      error.statusCode = 400;
      throw error;
    }
    
    if(post.creator.toString() !== req.userId) {
      const error = new Error('UnAuthorized');
      error.statusCode = 403;
      throw error;
    }

     removeImage(post.imageUrl);
     await Post.findByIdAndRemove(postId);
     const user = await User.findById(req.userId);
    await user.posts.pull(postId);
    await user.save();

   res.status(200).json({
     message: 'Post Deleted',
   })  
   
  }catch(err) {
     if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createPost = async (req, res, next) => {
  const { title, content} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation data Failed");
    error.statusCode = 422;
    throw error;
  }
  if(!req.file) {
    const error = new Error('No Image Added');
    error.statusCode(422)
    throw error;
  }
  const imageUrl = req.file.path;

  try {
    const post = new Post({
      title,
      content,
      imageUrl,
      creator: req.userId
    });
    const result = await post.save();
    const creator = await User.findById(req.userId);
    creator.posts.push(result);
    creator.save();
    if (result) {
      res.status(200).json({
        message: "Post Created!",
        post: result,
        creator : {
          _id: creator._id,name: creator.name
        }
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
