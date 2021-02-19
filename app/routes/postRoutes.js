const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const isAuth = require("../middleware/isAuth");

router.get("/", postController.getAllPost);
router.get("/:postId", isAuth,postController.getPostById);
router.post(
  "/",
  body("title").isLength({ min: 5 }),
  body("content").isLength({ min: 10 }),isAuth,
  postController.createPost
);
router.put(
  "/:postId",
  body("title").isLength({ min: 5 }),
  body("content").isLength({ min: 10 }),isAuth,
  postController.updatePost
);
router.delete("/:postId", isAuth,postController.deletePost);

module.exports = router;
