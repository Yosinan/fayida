const express = require('express');
const router = express.Router();
const { listUsers, studentDetail, instructorDetail, getStreak, getBestStreak } = require('../controllers/user.controller');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.get('/', authMiddleware, listUsers); // query ?role=student/instructor/admin
router.get('/me/streak', authMiddleware, requireRole('student'), getStreak);
router.get('/me/streak/best', authMiddleware, requireRole('student'), getBestStreak);
router.get('/students/:id', authMiddleware, studentDetail);
router.get('/instructors/:id', authMiddleware, instructorDetail);

module.exports = router;
