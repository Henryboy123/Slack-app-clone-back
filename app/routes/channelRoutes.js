const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController.js');
const messagesController = require('../controllers/messagesController');
const verifyToken = require('../middleware/authJwt.js');

router.use(verifyToken);

router.post('', channelController.createChannel);

router.post('/:id/messages', messagesController.createMessage);

router.get('/:id/messages', messagesController.getMessagesByChannel);

router.get('/:channelId/users', channelController.getUsersByChannelId);

router.get('', channelController.getChannels);

router.get('/connected/:userId', channelController.getChannelsByUserId);

router.get('/:id', channelController.getChannel);

router.patch('/:id', channelController.updateChannel);

router.delete('/:id', channelController.deleteChannel);

module.exports = router;
