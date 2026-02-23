const express = require("express");

const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

commentRouter.post("/", authMiddleware, commentController.createComment);
commentRouter.get("/post/:postId", commentController.getCommentsByPost);
commentRouter.delete("/:commentId", authMiddleware, commentController.deleteComment);
commentRouter.put("/:commentId", authMiddleware, commentController.updateComment);


module.exports = commentRouter;