const {
  createChannel,
  getChannels,
  getChannel,
  getChannelsByUserId,
  getUsersByChannelId,
  updateChannel,
  deleteChannel,
} = require('../services/channelServices');

exports.createChannel = (req, res) => {
  createChannel(req, res);
};

exports.getChannels = (req, res) => {
  getChannels(req, res);
};

exports.getChannel = (req, res) => {
  getChannel(req, res);
};

exports.getChannelsByUserId = (req, res) => {
  getChannelsByUserId(req, res);
};

exports.getUsersByChannelId = (req, res) => {
  getUsersByChannelId(req, res);
};

exports.updateChannel = (req, res) => {
  updateChannel(req, res);
};

exports.deleteChannel = (req, res) => {
  deleteChannel(req, res);
};
