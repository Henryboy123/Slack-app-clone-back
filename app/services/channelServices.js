const Channel = require('../models/channelModel');

async function createChannel(req, res) {
  try {
    const { name, users } = req.body;

    const channel = await Channel.create({
      name: name,
      users: users,
      messages: [],
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).send('Not able to create channel');
  }
}

async function getChannels(req, res) {
  try {
    const channels = await Channel.find().populate('users', '_id name');

    res.status(200).json(channels);
  } catch (error) {
    res.status(404).send('Not able to find channels');
  }
}

async function getChannel(req, res) {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findById(channelId).populate(
      'users',
      '_id name'
    );

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(404).send('Not able to find channel');
  }
}

async function getChannelsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const channels = await Channel.find({ users: userId }).populate(
      'users',
      '_id name'
    );

    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ error: 'Not able to update channel' });
  }
}

async function getUsersByChannelId(req, res) {
  try {
    const channelId = req.params.channelId;
    const channel = await Channel.findById(channelId).populate(
      'users',
      '_id name'
    );

    if (!channel) {
      throw new Error('Channel not found');
    }

    res.status(200).json(channel.users);
  } catch (error) {
    throw new Error('Not able to get users of the channel');
  }
}

async function updateChannel(req, res) {
  try {
    const channelId = req.params.id;
    const updates = req.body;

    const channel = await Channel.findByIdAndUpdate(channelId, updates, {
      new: true,
    }).populate('users', '_id name');

    if (!channel) {
      res.status(404).json({ error: 'Channel not found' });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: 'Not able to update channel' });
  }
}

async function deleteChannel(req, res) {
  try {
    await Channel.findByIdAndDelete(req.params.id);

    res.status(202).send(`Channel successfully deleted`);
  } catch (error) {
    res.status(500).send('Not able to delete channel');
  }
}

module.exports = {
  createChannel,
  getChannels,
  getChannel,
  getChannelsByUserId,
  getUsersByChannelId,
  updateChannel,
  deleteChannel,
};
