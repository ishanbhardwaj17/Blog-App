const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const authMiddleware = require('../middleware/auth.middleware.js');

postRouter.post('/',authMiddleware, upload.single('image'), postController.createPost);

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:id', postController.getPostById);

postRouter.put('/:id', authMiddleware, upload.single('image'), postController.updatePost);

postRouter.delete('/:id', authMiddleware, postController.deletePost);

postRouter.post('/:id/like', authMiddleware, postController.likePost);


module.exports = postRouter;