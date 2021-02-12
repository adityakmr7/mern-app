const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", postController.getAllPost);
router.get("/:postId", postController.getPostById);
router.post(
  "/",
  body("title").isLength({ min: 5 }),
  body("content").isLength({ min: 10 }),
  postController.createPost
);
router.put(
  "/:postId",
  body("title").isLength({ min: 5 }),
  body("content").isLength({ min: 10 }),
  postController.updatePost
);
router.delete("/:postId", postController.deletePost);

module.exports = router;
