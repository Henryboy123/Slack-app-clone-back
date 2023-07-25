const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('', messagesController.createMessage);

router.get('/:id', messagesController.getMessage);

router.put('/:id', messagesController.updateMessage);

router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
