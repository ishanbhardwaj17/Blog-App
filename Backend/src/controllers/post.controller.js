const express = require('express');
const postModel = require('../models/post.model');
const likeModel = require('../models/like.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPost(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        let imageUrl = null;

        if (req.file) {
            const file = await imagekit.files.upload({
                file: await toFile(Buffer.from(req.file.buffer), 'file'),
                fileName: "Test",
                folder: "Blog-App-posts"
            });

            imageUrl = file.url;
        }

        const post = await postModel.create({
            title,
            content,
            image: imageUrl,
            author: req.user.id
        });

        res.status(201).json({
            message: "Post created successfully.",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find().populate('author', 'name email').sort({ createdAt: -1 });
        res.status(200).json({
            message: "Posts retrieved successfully.",
            posts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function getPostById(req, res) {
    try {
        const post = await postModel.findById(req.params.id).populate('author', 'name email');

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post retrieved successfully.",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });

    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;

        // find post
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // authorization check (owner only)
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this post"
            });
        }

        // update fields if provided
        if (title) post.title = title;
        if (content) post.content = content;

        // update image if new image uploaded
        if (req.file) {
            const file = await imagekit.files.upload({
                file: await toFile(Buffer.from(req.file.buffer), 'file'),
                fileName: "Updated-Post",
                folder: "Blog-App-posts"
            });

            post.image = file.url;
        }

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.param.id;

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post does not exists"
            })
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this post"
            })
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "server error"
        })

    }
}

async function likePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        // check post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // try to create like (unique index prevents duplicates)
        await likeModel.create({
            post: postId,
            user: userId
        });

        // increment like count
        post.likeCount += 1;
        await post.save();

        res.status(200).json({
            message: "Post liked successfully"
        });

    } catch (error) {
        // duplicate like (unique index error)
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You have already liked this post"
            });
        }

        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost
};

