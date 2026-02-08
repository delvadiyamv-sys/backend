const express = require('express');
const router = express.Router();
const controller = require('./controller');
//const  loadPost  = require('./controller');

router.post('/post', controller.createPost);
router.get('/post', controller.loadPostData);
router.post('/post/like/:id', controller.likePost);
router.post('/post/dislike/:id', controller.dislikePost);
router.get('/post/detailpage/:id', controller.detailPage);
router.post('/post/like/:id', controller.likePage);

router.get('/', (req, res) => {
    res.render('home');
});
//router.get('/post',controller.loadPost);

module.exports = router; 