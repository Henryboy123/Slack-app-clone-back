const Messages = require('../models/messagesModel');

async function createMessage(req, res) {
  try {
    const channelId = req.params.id;
    const { user, userName, content } = req.body;

    const message = await Messages.create({
      channel: channelId,
      user: user,
      userName: userName,
      content: content,
      createdAt: new Date(),
    });


    res.status(201).json(message);
  } catch (error) {
    res.status(500).send('Not able to create message');
  }
}

async function getMessagesByChannel(req, res) {
  try {
    const channelId = req.params.id;
    const messages = await Messages.find({ channel: channelId });

    res.status(200).json(messages);
  } catch (error) {
    res.status(404).send('Not able to find messages');
  }
}

async function getMessage(req, res) {
  try {
    const messageId = req.params.id;
    const message = await Messages.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(404).send('Not able to find message');
  }
}

async function updateMessage(req, res) {
  try {
    const messageId = req.params.id;
    const updates = req.body;

    const message = await Messages.findByIdAndUpdate(messageId, updates, {
      new: true,
    });

    if (!message) {
      res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Not able to update message' });
  }
}

async function deleteMessage(req, res) {
  try {
    const messageId = req.params.id;
    await Messages.findByIdAndDelete(messageId);

    res.status(202).send(`Message successfully deleted`);
  } catch (error) {
    res.status(500).send('Not able to delete message');
  }
}

module.exports = {
  createMessage,
  getMessagesByChannel,
  getMessage,
  updateMessage,
  deleteMessage,
};
