const express = require('express');
const router = express.Router();
const { signup, login, logout, refresh } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', authMiddleware, logout);

module.exports = router;
