const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  try {
    const { name, username, password, password_confirm, age } = req.body;
    const data = await Users.find({ where: { username: username } });
    if (data.length > 0) {
      res.status(400).send('This username is already in use');
    } else if (password !== password_confirm) {
      res.status(400).send('Passwords do not match!');
    } else {
      let hashedPassword = await bcrypt.hash(password, 8);

      await Users.create({
        name: name,
        username: username,
        password: hashedPassword,
        age: age,
      });

      res.status(201).send(`User successfully created`);
    }
  } catch (error) {
    res.status(404).send('Not able to create user');
  }
}

async function getUsers(req, res) {
  try {
    const data = await Users.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).send('Not able to find users');
  }
}

async function getUser(req, res) {
  try {
    const data = await Users.findById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).send('Not able to find user');
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, username, password, password_confirm, age } = req.body;
    let updatedHashedPassword;
    if (password && password_confirm) {
      if (password !== password_confirm) {
        res.status(400).send('Passwords do not match!');
      } else {
        updatedHashedPassword = await bcrypt.hash(password, 8);
      }
    }

    const edition = await Users.findByIdAndUpdate(
      id,
      { name, age, username, updatedHashedPassword },
      { new: true }
    );

    res.status(202).send(`User successfully updated`);
  } catch (error) {
    res.status(404).send('Not able to update user');
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await Users.findByIdAndDelete(id);

    res.status(202).send(`User successfully deleted`);
  } catch (error) {
    res.status(404).send('Not able to delete user');
  }
}

async function signIn(req, res) {
  try {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      name: user.name,
      username: user.username,
      age: user.age,
      token: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function signOut(req, res) {
  try {
    req.session.token = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signOut,
};
