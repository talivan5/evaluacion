const express = require('express');
const postController = require('../controllers/postController.js');
const { authenticateToken } = require('../config/jwt.js');
const router = express.Router();

router.post('/:postId/comments', authenticateToken, postController.createComment);
router.post('/:postId/like', authenticateToken, postController.likePost);
router.post('/:postId/share', authenticateToken, postController.sharePost);
router.get('/:postId/comments', authenticateToken, postController.getPostComments);
router.get('/:postId/likes', authenticateToken, postController.getPostLikes);
router.get('/:postId/shares', authenticateToken, postController.getPostShares);

router.post('/', authenticateToken, postController.createPost);
router.get('/', authenticateToken, postController.getAllPosts);
router.get('/user/:userId', authenticateToken, postController.getUserPosts);
router.put('/:id', authenticateToken, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;



