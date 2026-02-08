const { lookupService } = require('node:dns');
const Post = require('./model');
const express = require('express');
const router = express.Router();


let createPost = async (req, res) => {
    const { title, content, like, dislike } = req.body;
    try {
        let postdata = new Post({ title, content, like, dislike });
        await postdata.save();
        console.log('Post created:', postdata);

        res.send({ success: true, message: 'Post created successfully', post: postdata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
let loadPostData = async (req, res) => {
    try {
        const postdata = await Post.find();
        res.render('post', { postdata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let loadPost = async (req, res) => {
    res.render('post');
};

let likePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const cookies = req.cookies;
        const cookieKey = `liked_${postId}`;
        if (cookies && cookies[cookieKey]) {
            return res.status(400).json({ error: 'You have already liked this post.' });
        }
        console.log('Cookies:', cookies);
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.like++;
        await post.save();
        res.json({ success: true, post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
;
};
let likePage = async (req, res) => {
     const postId = req.params.id;
  const cookieKey = `liked_${postId}`;
  const cookies = req.cookies;
  console.log('Cookies:', cookies); // Log cookies to the console
  if (req.cookies[cookieKey]) {
    return res.json({ liked: true }); // already liked
  }

  await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
  res.cookies(cookieKey, true, { maxAge: 365 * 24 * 60 * 60 * 1000 });

  res.render('post', { postId }, {cookies:cookies} );
 
  return    


  res.json({ liked: false });
};



let dislikePost = async(req, res) => {
    try {
        const postId = req.params.id
        const cookies = req.cookies
        console.log('Cookies:', cookies);

        if (cookies && cookies[`disliked_${postId}`]) {
            return res.send({ success: false, message: 'You have already disliked this post.' });
            //return res.status(400).json({ error: 'You have already liked this post.' });
        }
        res.cookie(`disliked_${postId}`, true, { maxAge: 24 * 60 * 60 * 1000 });

        //const post = await Post.findById(postId);
        const post = await Post.findByIdAndUpdate(postId, { $inc: { dislike: 1 } }, { new: true });
        res.send({ success: true, message: 'Post disliked', likeCount: post.dislike });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



let detailPage = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);
        res.render('detailpage', { post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPost, loadPost, loadPostData, likePost, dislikePost, detailPage, likePage };