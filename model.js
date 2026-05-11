const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    content : { type: String, required: true },
    like: { type: Number, default: 1 },
    dislike: { type: Number, default: 1 },
    views: { type: Number, default: 0 },
}); 
const Post = mongoose.model('post', postSchema);

module.exports = Post;