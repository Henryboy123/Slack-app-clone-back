const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes.js');
const channelRouter = require('./channelRoutes.js');
const messagesRouter = require('./messagesRoutes.js');

router.use('/api/users', userRouter);
router.use('/api/channels', channelRouter);
router.use('/api/messages', messagesRouter);

module.exports = router;
