const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const verifyToken = require('../middleware/authJwt.js');

router.post('', userController.createUser);

router.get('', verifyToken, userController.getUsers);

router.get('/:id', verifyToken, userController.getUser);

router.patch('/:id', verifyToken, userController.updateUser);

router.delete('/:id', verifyToken, userController.deleteUser);

router.post('/signin', userController.signIn);

router.post('/signout', userController.signOut);

module.exports = router;
