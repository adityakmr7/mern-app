const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get(
  "/",
  body("title").isLength({ min: 5 }),
  body("content").isLength({ min: 10 }),
  postController.getAllPost
);
router.get('/:postId', postController.getPostById);
router.post("/", postController.createPost);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
