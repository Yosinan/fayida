const prisma = require('../prisma');

async function listUsers(req, res) {
    const role = req.query.role;
    const where = role ? { role } : {};
    const users = await prisma.user.findMany({ where, orderBy: { createdAt: 'desc' } });
    // map minimal public fields
    res.json(users.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt
    })));
}

// student detail: include courses count, total spent, progress stub
async function studentDetail(req, res) {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        include: { enrollments: { include: { course: true } }, orders: true }
    });
    if (!user) return res.status(404).json({ message: 'Not found' });
    // compute
    const courses = user.enrollments.map(e => e.course.title);
    const totalSpent = user.orders.reduce((s, o) => s + o.amount, 0);
    const progress = 0; // depends on lesson progress implementation
    res.json({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        contact: user.email,
        courses,
        progress,
        total_spent: totalSpent,
        status: user.isActive ? 'Active' : 'Inactive',
        join_date: user.createdAt
    });
}

// instructor detail: include courses count, rating avg, earnings
async function instructorDetail(req, res) {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            courses: true,
            reviews: true,
            orders: true
        }
    });
    if (!user) return res.status(404).json({ message: 'Not found' });
    const courses = user.courses.map(c => c.title);
    const rating = user.reviews.length ? (user.reviews.reduce((s, r) => s + r.rating, 0) / user.reviews.length) : null;
    const earnings = user.orders.reduce((s, o) => s + o.amount, 0); // naive
    res.json({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        contact: user.email,
        status: user.isActive ? 'Active' : 'Inactive',
        courses,
        rating,
        earnings,
        join_date: user.createdAt
    });
}

// get streak info
async function getStreak(req, res) {
    const streak = await prisma.streak.findUnique({ where: { userId: req.user.id } });
    if (!streak) return res.json({ count: 0, lastLoginAt: null });
    res.json({ count: streak.count, lastLoginAt: streak.lastLoginAt });
}

// get best streak info
async function getBestStreak(req, res) {
    const bestStreak = await prisma.bestStreak.findUnique({ where: { userId: req.user.id } });
    if (!bestStreak) return res.json({ count: 0, achievedAt: null });
    res.json({ count: bestStreak.count, achievedAt: bestStreak.achievedAt });
}

module.exports = { listUsers, studentDetail, instructorDetail, getStreak, getBestStreak };
