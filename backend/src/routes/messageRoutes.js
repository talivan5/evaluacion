const express = require('express');
const messageController = require('../controllers/messageController.js');
const { authenticateToken } = require('../config/jwt.js');
const router = express.Router();

router.post('/', authenticateToken, messageController.createMessage);
router.put('/:id', authenticateToken, messageController.updateMessage);
router.delete('/:id', authenticateToken, messageController.deleteMessage);
router.get('/received/:receiverId', authenticateToken, messageController.getMessagesByReceiverId);

module.exports = router;
