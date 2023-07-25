const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signIn,
  signOut,
} = require('../services/userServices');

exports.createUser = (req, res) => {
  createUser(req, res);
};

exports.getUsers = (req, res) => {
  getUsers(req, res);
};

exports.getUser = (req, res) => {
  getUser(req, res);
};

exports.updateUser = (req, res) => {
  updateUser(req, res);
};

exports.deleteUser = (req, res) => {
  deleteUser(req, res);
};

exports.signIn = (req, res) => {
  signIn(req, res);
};

exports.signOut = (req, res) => {
  signOut(req, res);
};
