const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

async function createComment(req, res) {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "This post does not exist"
            });
        }

        const comment = await commentModel.create({
            post: postId,
            user: req.user.id,
            content
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

async function getCommentsByPost(req, res) {
    try {
        const postId = req.params.postId;

        const comments = await commentModel
            .find({ post: postId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function deleteComment(req, res) {
    try {
        const commentID = req.params.id;
        const comment = await commentModel.findById(commentID);

        if (!comment) {
            return res.status(404).json({
                message: "No comment found"
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this comment"
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function editComment(req, res) {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to edit this comment"
            });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
    editComment
};