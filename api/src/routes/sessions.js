const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const { mySessions, revokeSession, adminRevoke } = require('../controllers/session.controller');

// User: list their sessions
router.get('/me', authMiddleware, mySessions);

// User: revoke one of their sessions
router.delete('/me/:id', authMiddleware, revokeSession);

// Admin: revoke any session
router.delete('/:id', authMiddleware, requireRole('admin'), adminRevoke);

module.exports = router;
