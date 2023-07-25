const {
  createMessage,
  getMessagesByChannel,
  getMessage,
  updateMessage,
  deleteMessage,
} = require('../services/messagesServices');

exports.createMessage = (req, res) => {
  createMessage(req, res);
};

exports.getMessagesByChannel = (req, res) => {
  getMessagesByChannel(req, res);
};

exports.getMessage = (req, res) => {
  getMessage(req, res);
};

exports.updateMessage = (req, res) => {
  updateMessage(req, res);
};

exports.deleteMessage = (req, res) => {
  deleteMessage(req, res);
};
