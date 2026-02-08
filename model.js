const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content : { type: String, required: true },
    like: { type: Number, default: 1 },
    dislike: { type: Number, default: 1 }
}); 
const Post = mongoose.model('post', postSchema);

module.exports = Post;