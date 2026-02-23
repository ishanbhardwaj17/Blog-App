const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model")


async function createComment(req, res) {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Comment content is reqiured"
            })
        }

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(401).json({
                meassage: "This post does not exists";
            })
        }

        const comment = await commentModel.create({
            post: postId,
            user: req.user.id,
            content
        })

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        })

    }
}
async function getCommentsByPost(req, res) {
    try {
        const postId = req.param.id;

        const post = (await postModel.find({ post: postId }).populate("user", "name email")).sort({ createAt: -1 });
        res.status(200).json(comments);

    } catch (error) {
        console.error(error);
        return res.status().json({
            message: "internal Server error"
        })
    }
}
async function deleteComment(req, res) {
    try {
        const commentID = req.params.id;
        const comment = await commentModel.findById(commentID);
        if (!comment) {
            return res.status(404).json({
                message: "No comment post"
            })
        }

        if (comment.user.toString !== req.user.id) {
            return res.status(403).json({
                message: "you are not allowed to delete this post"
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status().json({
            message: "Inter server Error"
        })
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment
}