const express = require('express');
const { router } = require('../app');
const authrouter = express.Router();
const authController = require('../controllers/auth.controller');

authrouter.post('/register', authController.register);
authrouter.post('/login', authController.login);

module.exports = authrouter;

