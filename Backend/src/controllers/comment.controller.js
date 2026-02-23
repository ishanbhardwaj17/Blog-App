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
async function getCommentsByPost(req, res) { }
async function deleteComment(req, res) { }

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment
}